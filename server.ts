import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import connectDB from "./config/db";
import StudentProfile from "./models/StudentProfile";

const app = express();
const DEFAULT_PORT = Number(process.env.PORT || 3000);

app.use(express.json());

// Lazy-loaded Gemini AI client to avoid crashes if GEMINI_API_KEY is not yet present
let genAIClient: GoogleGenAI | null = null;

app.get("/api/students/:id", async (req, res) => {
  try {
    const student = await StudentProfile.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json(student);
  } catch (error) {
    if (error instanceof Error && error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid student id",
      });
    }

    res.status(500).json({
      message: "Error fetching student",
    });
  }
});

app.post("/api/students", async (req, res) => {
  try {
    const student = await StudentProfile.create(req.body);

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({
      message: "Error saving student",
    });
  }
});

// PUT API - Update Student Profile

app.put("/api/students/:id", async (req, res) => {
  try {

    const updatedStudent = await StudentProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );


    if (!updatedStudent) {
      return res.status(404).json({
        message: "Student not found"
      });
    }


    res.json({
      message: "Student updated successfully",
      student: updatedStudent
    });


  } catch (error) {

    res.status(500).json({
      message: "Error updating student"
    });

  }
});

function getGeminiClient() {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required but missing. Please add it under Settings > Secrets.");
    }
    genAIClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

// 1. Jarvis Chat endpoint
app.post("/api/jarvis/chat", async (req, res) => {
  try {
    const { message, profile, currentStats } = req.body;
    const ai = getGeminiClient();

    const systemInstruction = `
You are J.A.R.V.I.S., the advanced Student Intelligence Momentum AI companion for the SIM operating system.
Your purpose is to observe, guide, predict, and encourage college students.
You never judge, shame, scare, or lecture.
Instead, you create awareness, clarity, and action.
You speak in a premium, minimalist, modern, highly sophisticated technical assistant tone (like JARVIS in Iron Man).
Do NOT use emojis under any circumstances. Keep the language humble, direct, and slightly futuristic.

The user's profile is:
- Target Role: ${profile?.becoming || "Software Developer"}
- Primary Fear/Obstacle: ${profile?.fear || "Unknown obstacle"}
- Struggle/Distraction: ${profile?.stoppedBy || "Procrastination"}
- Personality: ${profile?.studentType || "Trying to improve"}
- Realization Trigger: ${profile?.realizationTrigger || "Near internals"}
- Dream: ${profile?.dream || "To build something meaningful"}
- Dream Quote Selection: "${profile?.quote || "I built something meaningful"}"

Current Live Statistics of the student in SIM:
- Momentum Score: ${currentStats?.momentumScore ?? 0}/100
- Attendance: ${currentStats?.attendance ?? 75}% (Target: 75%+)
- Coding Streak: ${currentStats?.codingStreak ?? 0} days
- Coding Minutes (Today): ${currentStats?.codingMinutesToday ?? 0} minutes
- Active Mission: ${currentStats?.activeMission || "Identity Forge Complete"}

Provide structured, clean responses in Markdown. Keep your message under 3 paragraphs unless answering a detailed inquiry. Focus on guiding their momentum, offering predictive insights (e.g. "If you maintain this attendance level, you are projected to face a shortage before final exams. Let's adjust this tomorrow.") and suggesting next small actions.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Jarvis Chat error:", error);
    res.status(500).json({ error: error.message || "Something went wrong in the companion systems." });
  }
});

// 2. Career Path Roadmap endpoint
app.post("/api/jarvis/roadmap", async (req, res) => {
  try {
    const { profile } = req.body;
    const ai = getGeminiClient();

    const prompt = `
Generate a highly professional, interactive, futuristic college career roadmap for a student who wants to become a ${profile?.becoming || "Software Engineer"}.
Their primary fear is ${profile?.fear || "Placement"} and they struggle with ${profile?.stoppedBy || "Procrastination"}.
Their dream is: ${profile?.dream || "To build something meaningful"}.

Generate exactly 4 distinct and highly targeted Milestones for their remaining college time, formatted strictly as JSON.
Each milestone must have:
1. title (e.g., "Core Mastery & Hackathons")
2. description (a brief 1-2 sentence description)
3. duration (e.g., "Months 1 - 3")
4. actionableSteps (array of 3 highly actionable bullet points)
5. status ("locked" | "active" | "completed" - set the first one to "active" and others to "locked")
6. momentumGain (e.g., "+15 Momentum")

The response must be in valid JSON conforming to the following schema:
{
  "title": "Roadmap Title",
  "overview": "A futuristic brief summary of their upcoming trajectory",
  "milestones": [
    {
      "title": "Milestone 1",
      "description": "Description...",
      "duration": "Months 1-3",
      "actionableSteps": ["Step A", "Step B", "Step C"],
      "status": "active",
      "momentumGain": "+15 XP"
    },
    ... (exactly 4 milestones)
  ]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json(parsedData);
  } catch (error: any) {
    console.error("Roadmap generation error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI Roadmap" });
  }
});

// 3. Interview Coach endpoint
app.post("/api/jarvis/interview", async (req, res) => {
  try {
    const { question, answer, profile } = req.body;
    const ai = getGeminiClient();

    const prompt = `
You are the JARVIS Interview Coach for SIM.
The student (aiming to become a ${profile?.becoming || "Software Developer"}) has answered the following question:
Question: "${question}"
Student's Answer: "${answer}"

Provide a detailed, helpful feedback review as J.A.R.V.I.S. in JSON format.
Keep the JARVIS persona: highly professional, concise, encouraging, and focused on momentum.
The JSON response must conform strictly to this format:
{
  "rating": "Out of 5 Stars, e.g. 4/5",
  "strengths": "1-2 sentences highlighting what was good",
  "weaknesses": "1-2 sentences highlighting where they fell short or missed points",
  "improvedAnswer": "A highly premium, model answer rewritten in the first person for them",
  "jarvisEncouragement": "A short, personal JARVIS remark to boost their confidence"
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json(parsedData);
  } catch (error: any) {
    console.error("Interview Coach error:", error);
    res.status(500).json({ error: error.message || "Failed to evaluate interview response" });
  }
});

// Serve Vite middleware in development or static assets in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const listenOnPort = (port: number): Promise<number> => {
    return new Promise((resolve, reject) => {
      const server = app.listen(port, "0.0.0.0", () => {
        console.log(`SIM server running on http://localhost:${port}`);
        resolve(port);
      });

      server.on("error", (error: NodeJS.ErrnoException) => {
        if (error.code === "EADDRINUSE") {
          const nextPort = port + 1;
          console.warn(`Port ${port} is busy. Retrying on ${nextPort}...`);
          listenOnPort(nextPort)
            .then(resolve)
            .catch(reject);
          return;
        }

        reject(error);
      });
    });
  };

  await listenOnPort(DEFAULT_PORT);
}

async function initializeServer() {
  try {
    await connectDB();
    await startServer();
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

initializeServer();