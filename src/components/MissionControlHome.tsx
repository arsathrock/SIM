import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Zap, Calendar, Code, GraduationCap, Award, HelpCircle, Send, Plus, X,
  AlertTriangle, CheckCircle2, Flame, Loader2, Sparkles, BookOpen, Clock, Activity, MessageSquare, Heart, TrendingUp, BarChart3, Layers, Lock
} from "lucide-react";
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { StudentProfile, AttendanceRecord, CodingLog, Achievement, TimelineEvent, ChatMessage, InterviewFeedback } from "../types";
import { INITIAL_ACHIEVEMENTS, INITIAL_TIMELINE_EVENTS, MOCK_INTERVIEW_QUESTIONS } from "../utils/defaults";
import StreakCodingApp from "./StreakCodingApp";

interface MissionControlHomeProps {
  profile: StudentProfile;
  onRestart: () => void;
}

export default function MissionControlHome({ profile, onRestart }: MissionControlHomeProps) {
  // Global State
  const [momentumScore, setMomentumScore] = useState<number>(45);
  const [timeline, setTimeline] = useState<TimelineEvent[]>(INITIAL_TIMELINE_EVENTS);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);

  // 1. Attendance Intelligence State
  const [attendance, setAttendance] = useState<number>(78);
  const [subjects, setSubjects] = useState([
    { name: "Design & Analysis of Algorithms", attended: 12, missed: 2, credit: 4 },
    { name: "Object Oriented Programming", attended: 14, missed: 3, credit: 3 },
    { name: "Database Management Systems", attended: 10, missed: 4, credit: 3 },
    { name: "Web Technologies Lab", attended: 8, missed: 1, credit: 2 },
  ]);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [showAttendanceForecast, setShowAttendanceForecast] = useState(false);
  const [showSkippedWarning, setShowSkippedWarning] = useState(false);

  // Glow Green Streak Coding App State
  const [showStreakApp, setShowStreakApp] = useState<boolean>(false);

  // 2. Coding Momentum State
  const [codingStreak, setCodingStreak] = useState<number>(3);
  const [codingMinutesToday, setCodingMinutesToday] = useState<number>(0);
  const [codingHistory, setCodingHistory] = useState<CodingLog[]>([
    { date: "2026-07-17", minutes: 30, problemsSolved: 1 },
    { date: "2026-07-18", minutes: 45, problemsSolved: 2 },
    { date: "2026-07-19", minutes: 60, problemsSolved: 3 },
  ]);
  const [minutesInput, setMinutesInput] = useState("");
  const [problemsInput, setProblemsInput] = useState("");

  // 3. Homepage Graph View State
  const [graphTab, setGraphTab] = useState<"dual" | "attendance" | "coding">("dual");

  // 4. Interview Coach State
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [interviewFeedback, setInterviewFeedback] = useState<InterviewFeedback | null>(null);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [feedbackHistory, setFeedbackHistory] = useState<InterviewFeedback[]>([]);

  // 5. J.A.R.V.I.S. Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      sender: "jarvis",
      text: `Greetings, ${profile.name}. J.A.R.V.I.S. online. I have registered your target alignment as Future ${profile.becoming}. Your starting momentum score is current ${momentumScore}/100. How shall we coordinate our efforts today?`,
      timestamp: "08:31 AM",
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [loadingChat, setLoadingChat] = useState(false);

  // 6. Timeline custom event states
  const [customEventTitle, setCustomEventTitle] = useState("");
  const [customEventValue, setCustomEventValue] = useState("5");
  const [customEventImpact, setCustomEventImpact] = useState<"increase" | "decrease">("increase");

  // Modal selector State
  const [activeModule, setActiveModule] = useState<string | null>(null);

  // Scroll to bottom of chat helper
  const chatBottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle Dynamic Achievements & Momentum recalculations
  useEffect(() => {
    let score = 45;
    // Calculate based on history logs
    const timelineSum = timeline.reduce((acc, ev) => {
      return ev.changeType === "increase" ? acc + ev.changeValue : acc - ev.changeValue;
    }, 45);
    setMomentumScore(Math.min(100, Math.max(0, timelineSum)));
  }, [timeline]);

  // Unlock achievements based on stats
  useEffect(() => {
    setAchievements((prev) =>
      prev.map((ach) => {
        if (ach.id === "att-75" && attendance >= 75 && !ach.isUnlocked) {
          addNotification("System Sync", "High Attendance Core badge unlocked!", 10);
          return { ...ach, isUnlocked: true, unlockedAt: "Today" };
        }
        if (ach.id === "first-log" && codingHistory.length > 3 && !ach.isUnlocked) {
          addNotification("System Sync", "Initiate Momentum badge unlocked!", 10);
          return { ...ach, isUnlocked: true, unlockedAt: "Today" };
        }
        if (ach.id === "code-streak-3" && codingStreak >= 3 && !ach.isUnlocked) {
          addNotification("System Sync", "Triple Spark badge unlocked!", 20);
          return { ...ach, isUnlocked: true, unlockedAt: "Today" };
        }
        if (ach.id === "first-coach" && feedbackHistory.length > 0 && !ach.isUnlocked) {
          addNotification("System Sync", "Voice Calibration badge unlocked!", 15);
          return { ...ach, isUnlocked: true, unlockedAt: "Today" };
        }
        if (ach.id === "momentum-50" && momentumScore >= 50 && !ach.isUnlocked) {
          addNotification("System Sync", "Half-Velocity badge unlocked!", 25);
          return { ...ach, isUnlocked: true, unlockedAt: "Today" };
        }
        if (ach.id === "momentum-80" && momentumScore >= 80 && !ach.isUnlocked) {
          addNotification("System Sync", "Terminal Velocity badge unlocked!", 40);
          return { ...ach, isUnlocked: true, unlockedAt: "Today" };
        }
        return ach;
      })
    );
  }, [attendance, codingHistory, codingStreak, feedbackHistory, momentumScore]);

  // Helper: Append timeline event
  const addTimelineEvent = (title: string, desc: string, value: number, type: "increase" | "decrease" | "neutral") => {
    const newEvent: TimelineEvent = {
      id: "ev-" + Math.random().toString(36).substr(2, 9),
      time: "Just now",
      title,
      description: desc,
      changeType: type,
      changeValue: value,
    };
    setTimeline((prev) => [newEvent, ...prev]);
  };

  const addNotification = (title: string, desc: string, momentumBonus: number) => {
    addTimelineEvent(title, `${desc} (+${momentumBonus} Momentum Bonus)`, momentumBonus, "increase");
  };

  // Recalculate Attendance overall %
  useEffect(() => {
    const totalClasses = subjects.reduce((acc, sub) => acc + sub.attended + sub.missed, 0);
    const totalAttended = subjects.reduce((acc, sub) => acc + sub.attended, 0);
    if (totalClasses > 0) {
      setAttendance(Math.round((totalAttended / totalClasses) * 100));
    }
  }, [subjects]);

  // Progress Graph Calculations & Data
  const totalProblemsSolved = codingHistory.reduce((acc, log) => acc + log.problemsSolved, 0) + 12;
  const totalCodingMinutes = codingHistory.reduce((acc, log) => acc + log.minutes, 0) + 180;
  const codingLevelNum = Math.min(5, Math.max(1, Math.floor(totalProblemsSolved / 10) + 1));
  const levelNames = ["Novice", "Apprentice", "Builder", "Developer", "Hacker", "Architect"];
  const currentLevelTitle = levelNames[codingLevelNum - 1] || "Architect";

  const progressGraphData = [
    { week: "Wk 1", attendance: 60, codingLevel: 1, problems: 2, levelScore: 20 },
    { week: "Wk 2", attendance: 66, codingLevel: 1, problems: 5, levelScore: 32 },
    { week: "Wk 3", attendance: 70, codingLevel: 2, problems: 9, levelScore: 48 },
    { week: "Wk 4", attendance: 74, codingLevel: 2, problems: 14, levelScore: 60 },
    { week: "Wk 5", attendance: 76, codingLevel: 3, problems: 20, levelScore: 72 },
    { week: "Wk 6", attendance: 80, codingLevel: 4, problems: 28, levelScore: 84 },
    { week: "Wk 7 (Current)", attendance: attendance, codingLevel: codingLevelNum, problems: totalProblemsSolved, levelScore: Math.min(100, codingLevelNum * 20) },
  ];

  // Submit Answer to Jarvis Coach
  const submitAnswerToCoach = async () => {
    if (!userAnswer.trim()) return;
    setLoadingFeedback(true);
    try {
      const response = await fetch("/api/jarvis/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: MOCK_INTERVIEW_QUESTIONS[selectedQuestionIndex].question,
          answer: userAnswer,
          profile,
        }),
      });
      if (!response.ok) throw new Error();
      const feedback: InterviewFeedback = await response.json();
      setInterviewFeedback(feedback);
      setFeedbackHistory((prev) => [feedback, ...prev]);
      addTimelineEvent("Interview Practice Completed", `J.A.R.V.I.S evaluated your answer as ${feedback.rating}`, 8, "increase");
    } catch (e) {
      // Offline local feedback helper
      setTimeout(() => {
        const localFeedback: InterviewFeedback = {
          rating: "4/5",
          strengths: "Excellent framing and structural division. You highlighted real problem-solving methods.",
          weaknesses: "You could have elaborated on specific technical metrics, like execution speed or bandwidth reduction.",
          improvedAnswer: `I systematically broke down our architecture into modules. To counter our biggest issue, I incorporated clean error logging and verified database queries. This approach neutralized our delays by 20% while saving our pipeline consistency.`,
          jarvisEncouragement: "A commendable formulation, Cadet. Consistent verbal calibration will eliminate any placement fear."
        };
        setInterviewFeedback(localFeedback);
        setFeedbackHistory((prev) => [localFeedback, ...prev]);
        addTimelineEvent("Interview Practice Completed", "J.A.R.V.I.S evaluated your answer locally.", 8, "increase");
      }, 1200);
    } finally {
      setLoadingFeedback(false);
    }
  };

  // J.A.R.V.I.S. Chat Submission
  const handleSendChatMessage = async () => {
    if (!chatInput.trim()) return;
    const userMsg: ChatMessage = {
      id: "msg-" + Date.now(),
      sender: "user",
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setLoadingChat(true);

    try {
      const response = await fetch("/api/jarvis/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: chatInput,
          profile,
          currentStats: {
            momentumScore,
            attendance,
            codingStreak,
            codingMinutesToday,
          }
        }),
      });
      if (!response.ok) throw new Error();
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          id: "msg-j-" + Date.now(),
          sender: "jarvis",
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    } catch (e) {
      // Smart offline fallback
      setTimeout(() => {
        let text = `Apologies, system gateway is offline, but my local cognitive cores are functional. Regarding your inquiry, I highly recommend staying aligned with your main dream of "${profile.dream}". Let us focus on maintaining your coding streak.`;
        if (chatInput.toLowerCase().includes("attendance") || chatInput.toLowerCase().includes("skip")) {
          text = `Analysis shows skipping lectures heavily compromises your terminal velocity. Your attendance is currently at ${attendance}%. I highly discourage further absences.`;
        } else if (chatInput.toLowerCase().includes("fear") || chatInput.toLowerCase().includes("scared")) {
          text = `Fear of ${profile.fear} is standard for high-potential cadets. We will dismantle this systematically. Let us practice a Mock Interview or Master a Skill.`;
        }
        setMessages((prev) => [
          ...prev,
          {
            id: "msg-j-" + Date.now(),
            sender: "jarvis",
            text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          }
        ]);
      }, 1000);
    } finally {
      setLoadingChat(false);
    }
  };

  // 1. Actions for Attendance
  const logAttendance = (index: number, present: boolean) => {
    setSubjects((prev) =>
      prev.map((sub, i) => {
        if (i === index) {
          if (present) {
            addTimelineEvent(`Attended ${sub.name}`, "Demonstrated outstanding discipline.", 3, "increase");
            return { ...sub, attended: sub.attended + 1 };
          } else {
            addTimelineEvent(`Missed ${sub.name}`, "Unexcused absence detected. Review forecasting tool.", 5, "decrease");
            setShowSkippedWarning(true);
            return { ...sub, missed: sub.missed + 1 };
          }
        }
        return sub;
      })
    );
  };

  const addSubject = () => {
    if (!newSubjectName.trim()) return;
    setSubjects((prev) => [
      ...prev,
      { name: newSubjectName.trim(), attended: 1, missed: 0, credit: 3 }
    ]);
    addTimelineEvent("Added subject core", `Calibrated pipeline to monitor ${newSubjectName}`, 2, "increase");
    setNewSubjectName("");
  };

  // 2. Actions for Coding
  const logCodingMinutes = () => {
    const mins = parseInt(minutesInput);
    const solved = parseInt(problemsInput) || 0;
    if (isNaN(mins) || mins <= 0) return;

    setCodingMinutesToday((prev) => prev + mins);
    const newLog: CodingLog = {
      date: new Date().toISOString().split("T")[0],
      minutes: mins,
      problemsSolved: solved,
    };
    setCodingHistory((prev) => [newLog, ...prev]);

    // Update streak logic
    if (codingMinutesToday === 0) {
      setCodingStreak((prev) => prev + 1);
    }

    addTimelineEvent(
      "Coded for " + mins + " minutes",
      `Solved ${solved} problems. Dynamic momentum core activated!`,
      Math.min(15, Math.ceil(mins / 5)),
      "increase"
    );

    setMinutesInput("");
    setProblemsInput("");
  };

  // 4. Custom Timeline Logging Actions
  const handleAddCustomTimelineEvent = () => {
    if (!customEventTitle.trim()) return;
    const valueNum = parseInt(customEventValue) || 5;
    addTimelineEvent(
      customEventTitle.trim(),
      "Student logged event manually.",
      valueNum,
      customEventImpact === "increase" ? "increase" : "decrease"
    );
    setCustomEventTitle("");
  };

  // Recharts chart helper: Convert timeline to coordinates
  const getChartData = () => {
    let current = 45;
    const items = [...timeline].reverse(); // oldest to newest
    const list = items.map((ev, idx) => {
      if (ev.changeType === "increase") current = Math.min(100, current + ev.changeValue);
      if (ev.changeType === "decrease") current = Math.max(0, current - ev.changeValue);
      return {
        name: `T-${items.length - idx}`,
        momentum: current,
        event: ev.title
      };
    });
    // Add start coordinate
    return [{ name: "Start", momentum: 45, event: "Initialization" }, ...list];
  };

  // Interactive Heatmap Days generator
  const getHeatmapDays = () => {
    // Generate simple 28 days block
    const days = [];
    for (let i = 27; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const match = codingHistory.find((log) => log.date === dateStr);
      days.push({
        date: dateStr,
        minutes: match ? match.minutes : 0,
        label: d.toLocaleDateString([], { month: "short", day: "numeric" })
      });
    }
    return days;
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white font-sans overflow-y-auto pb-16">
      {/* Dynamic tech-grid background */}
      <div className="absolute inset-0 grid-background opacity-20 pointer-events-none" />

      {/* Atmospheric Glowing Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-red-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[400px] h-[400px] rounded-full bg-red-950/15 blur-[120px] pointer-events-none" />

      {/* Top HUD Stats Panel */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-8 pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-900 pb-8">
          
          {/* Identity Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <img 
                src="/fav.png" 
                alt="Kalvium Logo" 
                className="w-8 h-8 rounded-lg border border-red-500/40 shadow-[0_0_12px_rgba(239,68,68,0.3)] object-contain bg-white p-0.5" 
              />
              <span className="font-mono text-xs text-red-400 tracking-widest uppercase bg-red-950/40 px-2.5 py-1 rounded-md border border-red-900/50">
                ACTIVE COGNITION MATCH
              </span>
              <span className="font-mono text-[10px] text-zinc-600">SYS_ONLINE</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-medium tracking-tight">
              Hey, <span className="text-white font-bold">{profile.name}</span>
            </h1>
            <p className="text-zinc-500 font-mono text-xs tracking-wider uppercase pt-1">
              Target Blueprint: <span className="text-red-400 font-semibold">{profile.becoming}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Top Section: "Your progress" Banner (Low height, full width) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 mt-6">
        <div className="glass-panel rounded-2xl border border-zinc-900 p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-mono text-xs text-red-400 tracking-widest uppercase font-bold flex items-center gap-2">
              <Activity className="w-4 h-4 text-red-400" />
              Your progress
            </h3>
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
              REAL-TIME ANALYTICS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-950/80 p-4 rounded-xl border border-zinc-900 flex items-center justify-between">
              <div>
                <span className="font-mono text-[9px] text-zinc-500 uppercase block">ATTENDANCE</span>
                <span className={`text-2xl font-display font-bold ${attendance >= 75 ? "text-emerald-400" : "text-amber-500"}`}>
                  {attendance}%
                </span>
              </div>
              <div className="text-right font-mono text-[10px] text-zinc-500">
                {attendance >= 75 ? "SAFE CLEARANCE" : "DEFICIT WARNING"}
              </div>
            </div>

            <div className="bg-zinc-950/80 p-4 rounded-xl border border-zinc-900 flex items-center justify-between">
              <div>
                <span className="font-mono text-[9px] text-zinc-500 uppercase block">CODING STREAK</span>
                <span className="text-2xl font-display font-bold text-red-400">
                  {codingStreak} Days
                </span>
              </div>
              <div className="text-right font-mono text-[10px] text-zinc-500">
                {codingMinutesToday} Mins Today
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section: Intelligence Modules Grid (Full Width) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 mt-8 space-y-6">
        
        {/* Section title */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-medium text-white tracking-tight flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-red-400" />
            INTELLIGENCE MODULES
          </h2>
          <button
            onClick={onRestart}
            className="font-mono text-[10px] text-zinc-600 hover:text-white uppercase tracking-widest transition-colors cursor-pointer"
          >
            RESET_JOURNEY
          </button>
        </div>

        {/* Vertical Stack of Banners in Order: Attendance Intelligence -> Coding Expedition -> Coming Soon -> Coming Soon */}
        <div className="space-y-6">

          {/* 1. Attendance Intelligence Hero Banner */}
          <div
            id="att-module-btn"
            onClick={() => setActiveModule("attendance")}
            className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-[#0D1117] border-2 border-red-500/80 shadow-[0_0_50px_rgba(239,68,68,0.3)] hover:shadow-[0_0_70px_rgba(239,68,68,0.5)] transition-all duration-300 cursor-pointer group font-mono"
          >
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-red-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-red-500/20 transition-all" />
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs text-red-400 font-extrabold tracking-widest uppercase bg-black px-3 py-1 rounded-full border border-red-500/60 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    LAUNCH CORE // ATTENDANCE INTELLIGENCE
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white font-sans uppercase tracking-tight flex items-center gap-3 flex-wrap">
                  <span>ATTENDANCE INTELLIGENCE</span>
                  <span className={`font-mono text-xs px-2.5 py-1 rounded-md bg-black border font-bold ${attendance >= 75 ? "text-emerald-400 border-emerald-500/60" : "text-amber-400 border-amber-500/60"}`}>
                    STATUS: {attendance >= 75 ? "SAFE CLEARANCE" : "DEFICIT WARNING"} ({attendance}% Total)
                  </span>
                </h3>

                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  Calculate custom buffer ratios, predict attendance deficits, and neutralize exam blocks early.
                </p>
              </div>

              <div className="shrink-0">
                <button
                  className="px-6 py-3.5 bg-red-600 hover:bg-red-500 text-white font-extrabold font-mono text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_30px_rgba(239,68,68,0.6)] cursor-pointer flex items-center gap-2 group-hover:scale-105"
                >
                  <span>LAUNCH MODULE</span>
                  <Sparkles className="w-4 h-4 fill-white" />
                </button>
              </div>
            </div>
          </div>

          {/* 2. Coding Expedition Hero Banner */}
          <div
            onClick={() => setShowStreakApp(true)}
            className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-[#0D1117] border-2 border-[#00FF88] shadow-[0_0_50px_rgba(0,255,136,0.3)] hover:shadow-[0_0_70px_rgba(0,255,136,0.5)] transition-all duration-300 cursor-pointer group font-mono"
          >
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#00FF88]/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#00FF88]/20 transition-all" />
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs text-[#00FF88] font-extrabold tracking-widest uppercase bg-black px-3 py-1 rounded-full border border-[#00FF88] flex items-center gap-2">
                    <Code className="w-3.5 h-3.5" />
                    FEATURED ARENA // CODING EXPEDITION
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white font-sans uppercase tracking-tight flex items-center gap-3 flex-wrap">
                  <span>CODING EXPEDITION</span>
                  <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-black text-[#00FF88] border border-[#00FF88] font-bold">
                    INTERACTIVE QUEST
                  </span>
                </h3>

                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  Choose your platform (LeetCode, HackerRank, Codeforces, CodingNinjas) and begin your customized coding roadmap.
                </p>
              </div>

              <div className="shrink-0">
                <button
                  className="px-6 py-3.5 bg-[#00FF88] hover:bg-[#00D47A] text-black font-extrabold font-mono text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_30px_#00FF88] cursor-pointer flex items-center gap-2 group-hover:scale-105"
                >
                  <span>START</span>
                  <Sparkles className="w-4 h-4 fill-black" />
                </button>
              </div>
            </div>
          </div>

          {/* 3. Coding Momentum - LOCKED COMING SOON Hero Banner */}
          <div
            className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-[#0D1117]/80 border-2 border-amber-500/30 shadow-[0_0_30px_rgba(251,191,36,0.1)] transition-all duration-300 font-mono select-none"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs text-amber-400 font-extrabold tracking-widest uppercase bg-black px-3 py-1 rounded-full border border-amber-500/50 flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5" />
                    FUTURE CORE // CODING MOMENTUM
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white/60 font-sans uppercase tracking-tight flex items-center gap-3 flex-wrap">
                  <span>CODING MOMENTUM</span>
                  <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-black text-amber-400 border border-amber-500/60 font-bold flex items-center gap-1.5">
                    <Lock className="w-3 h-3" /> COMING SOON
                  </span>
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                  Maintain coding consistency, track daily problem volumes, and log minutes on interactive grids.
                </p>
              </div>

              <div className="shrink-0">
                <button
                  disabled
                  className="px-6 py-3.5 bg-zinc-900 border border-amber-500/40 text-amber-400 font-extrabold font-mono text-xs uppercase tracking-wider rounded-xl cursor-not-allowed flex items-center gap-2 opacity-80"
                >
                  <Lock className="w-4 h-4" />
                  <span>COMING SOON</span>
                </button>
              </div>
            </div>
          </div>

          {/* 4. Achievements - LOCKED COMING SOON Hero Banner */}
          <div
            className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-[#0D1117]/80 border-2 border-amber-500/30 shadow-[0_0_30px_rgba(251,191,36,0.1)] transition-all duration-300 font-mono select-none"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs text-amber-400 font-extrabold tracking-widest uppercase bg-black px-3 py-1 rounded-full border border-amber-500/50 flex items-center gap-2">
                    <Award className="w-3.5 h-3.5" />
                    FUTURE ARENA // ACHIEVEMENTS
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white/60 font-sans uppercase tracking-tight flex items-center gap-3 flex-wrap">
                  <span>ACHIEVEMENTS</span>
                  <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-black text-amber-400 border border-amber-500/60 font-bold flex items-center gap-1.5">
                    <Lock className="w-3 h-3" /> COMING SOON
                  </span>
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                  Review your current hardware milestones and unlock glowing dynamic companion badges.
                </p>
              </div>

              <div className="shrink-0">
                <button
                  disabled
                  className="px-6 py-3.5 bg-zinc-900 border border-amber-500/40 text-amber-400 font-extrabold font-mono text-xs uppercase tracking-wider rounded-xl cursor-not-allowed flex items-center gap-2 opacity-80"
                >
                  <Lock className="w-4 h-4" />
                  <span>COMING SOON</span>
                </button>
              </div>
            </div>
          </div>

        </div>
        </div>

      {/* FULL SCREEN MODAL INTERFACES FOR ACTIVE MODULES */}
      <AnimatePresence>
        {activeModule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="glass-panel w-full max-w-4xl max-h-[90vh] rounded-3xl border border-zinc-800 overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            >
              {/* Modal Header */}
              <div className="p-6 bg-zinc-950/80 border-b border-zinc-900 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-red-400 tracking-wider uppercase">
                    SIM_MODULE_CORE // {activeModule}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setActiveModule(null);
                    setShowSkippedWarning(false);
                  }}
                  className="p-2 rounded-lg bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body Scroll */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                
                {/* A. ATTENDANCE MODULE */}
                {activeModule === "attendance" && (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-display font-bold">Attendance Intelligence</h2>
                        <p className="text-zinc-500 text-xs">Verify safe college thresholds and forecast semester eligibility.</p>
                      </div>

                      {/* Forecast Toggle */}
                      <button
                        onClick={() => setShowAttendanceForecast(!showAttendanceForecast)}
                        className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-red-400 hover:bg-red-950/20 transition-all cursor-pointer"
                      >
                        {showAttendanceForecast ? "CLOSE_FORECAST_TREE" : "SHOW_FORECAST_TREE"}
                      </button>
                    </div>

                    {/* Overall Progress Widget */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5 flex flex-col justify-between">
                        <span className="font-mono text-[9px] text-zinc-600 block">OVERALL SECTORS</span>
                        <div className="flex items-baseline gap-2 mt-2">
                          <span className={`text-4xl font-display font-extrabold ${attendance >= 75 ? "text-emerald-400" : "text-amber-500"}`}>{attendance}%</span>
                          <span className="text-xs text-zinc-500 font-mono">/ Target 75%</span>
                        </div>
                        <p className="text-[10px] text-zinc-500 mt-3 leading-snug">
                          {attendance >= 75
                            ? "Current attendance meets placement eligibility guidelines. No immediate danger."
                            : "DEFICIT TRIGGER. You must attend next 5 straight lectures to avoid attendance lockout!"}
                        </p>
                      </div>

                      <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5 col-span-2">
                        <span className="font-mono text-[9px] text-zinc-600 block mb-2 uppercase">Forecast Simulator</span>
                        <div className="space-y-3">
                          <div className="p-3 bg-red-950/10 border border-red-900/30 rounded-xl flex items-center justify-between text-xs">
                            <span className="text-red-400 font-mono">[PROJECTION] MISS 2 CLASSES</span>
                            <span className="font-bold text-red-500">{Math.max(50, attendance - 8)}% Deficit (Lockout Danger)</span>
                          </div>
                          <div className="p-3 bg-emerald-950/10 border border-emerald-900/30 rounded-xl flex items-center justify-between text-xs">
                            <span className="text-emerald-400 font-mono">[PROJECTION] ATTEND 3 CLASSES</span>
                            <span className="font-bold text-emerald-400">{Math.min(100, attendance + 4)}% Safe Clearance</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Warning overlay if they skipped */}
                    {showSkippedWarning && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-950/20 border border-red-900/50 rounded-2xl p-4 flex items-start gap-3"
                      >
                        <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5 animate-bounce" />
                        <div>
                          <h4 className="font-mono text-xs font-bold text-red-400">J.A.R.V.I.S. PREDICTION DEFICIT</h4>
                          <p className="text-xs text-zinc-300 mt-1 leading-normal">
                            "You skipped today's class. Nothing is ruined. But your current pattern suggests this could become a habit. Would you like to see what happens if this continues?"
                          </p>
                          <div className="flex gap-2 mt-3">
                            <button
                              onClick={() => {
                                setShowAttendanceForecast(true);
                                setShowSkippedWarning(false);
                              }}
                              className="px-3 py-1.5 rounded bg-red-900/30 border border-red-800/60 text-[10px] font-mono text-red-300 hover:bg-red-900/50 transition-all cursor-pointer"
                            >
                              Show Forecast Timeline
                            </button>
                            <button
                              onClick={() => setShowSkippedWarning(false)}
                              className="px-3 py-1.5 rounded bg-zinc-900 text-[10px] font-mono text-zinc-400 hover:text-white transition-all cursor-pointer"
                            >
                              Acknowledge
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Attendance Forecast Visual Tree */}
                    {showAttendanceForecast && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="bg-zinc-950 border border-red-900/30 rounded-2xl p-5 space-y-4"
                      >
                        <h4 className="font-mono text-[10px] text-red-400 uppercase tracking-widest font-semibold">
                          COMPANION FORECAST TREE PROTOCOL
                        </h4>
                        <div className="relative border-l border-red-900/30 pl-4 space-y-4 text-xs font-mono">
                          <div className="relative">
                            <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-red-500" />
                            <div className="text-zinc-300 font-bold">Skip Tomorrow's Lab (-5 Momentum)</div>
                            <div className="text-zinc-500 mt-1">Total Attendance drops below 73%. Academic lockout protocol triggered. Parents notification queue initialized.</div>
                          </div>
                          <div className="relative">
                            <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-amber-500" />
                            <div className="text-zinc-300 font-bold">Neutralize Absence with Excuse Submission</div>
                            <div className="text-zinc-500 mt-1">Submit official waiver files. Percentage stabilizes at 75%. No lockout.</div>
                          </div>
                          <div className="relative">
                            <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500" />
                            <div className="text-zinc-300 font-bold">Attend Full 4-Day Lecture Cycle (+12 Momentum)</div>
                            <div className="text-zinc-500 mt-1">Overall percentage increases to 82%. Complete clearance obtained. J.A.R.V.I.S approves.</div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Subject Core table */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">TRACKED SECTOR STREAMS</span>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Add core class (e.g. Maths)..."
                            value={newSubjectName}
                            onChange={(e) => setNewSubjectName(e.target.value)}
                            className="bg-zinc-900 border border-zinc-800 text-xs text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-red-500"
                          />
                          <button
                            onClick={addSubject}
                            className="p-1.5 bg-white text-black rounded-lg text-xs hover:bg-zinc-200 transition-colors cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {subjects.map((sub, idx) => {
                          const total = sub.attended + sub.missed;
                          const pct = total > 0 ? Math.round((sub.attended / total) * 100) : 100;
                          return (
                            <div
                              key={sub.name}
                              className="bg-zinc-950 border border-zinc-900 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-zinc-850"
                            >
                              <div className="space-y-1">
                                <h4 className="text-sm font-semibold text-zinc-100">{sub.name}</h4>
                                <span className="font-mono text-[10px] text-zinc-600">ATTENDED: {sub.attended} // MISSED: {sub.missed}</span>
                              </div>

                              <div className="flex items-center gap-6">
                                <div className="text-right">
                                  <span className={`text-base font-mono font-bold ${pct >= 75 ? "text-emerald-400" : "text-amber-500"}`}>{pct}%</span>
                                  <span className="text-[10px] text-zinc-600 block">STATUS</span>
                                </div>

                                <div className="flex gap-2">
                                  <button
                                    onClick={() => logAttendance(idx, true)}
                                    className="px-3 py-1.5 rounded-lg bg-emerald-950/20 hover:bg-emerald-900/30 border border-emerald-900/40 text-xs text-emerald-400 font-mono cursor-pointer"
                                  >
                                    ATTENDED
                                  </button>
                                  <button
                                    onClick={() => logAttendance(idx, false)}
                                    className="px-3 py-1.5 rounded-lg bg-red-950/20 hover:bg-red-900/30 border border-red-900/40 text-xs text-red-400 font-mono cursor-pointer"
                                  >
                                    SKIPPED
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* B. CODING MOMENTUM MODULE */}
                {activeModule === "coding" && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-display font-bold">Coding Momentum</h2>
                      <p className="text-zinc-500 text-xs">Verify algorithmic pacing and catalog consistent daily coding habits.</p>
                    </div>

                    {/* Streak Tracker HUD */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl flex items-center gap-4">
                        <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-400 animate-pulse">
                          <Flame className="w-8 h-8" />
                        </div>
                        <div>
                          <span className="font-mono text-[9px] text-zinc-600 block">CURRENT STREAK</span>
                          <span className="text-3xl font-display font-bold text-white">{codingStreak} Days</span>
                        </div>
                      </div>

                      <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl flex items-center gap-4">
                        <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20 text-red-400">
                          <Clock className="w-8 h-8" />
                        </div>
                        <div>
                          <span className="font-mono text-[9px] text-zinc-600 block">LOGGED TODAY</span>
                          <span className="text-3xl font-display font-bold text-white">{codingMinutesToday} Mins</span>
                        </div>
                      </div>

                      <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl flex items-center gap-4">
                        <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
                          <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <div>
                          <span className="font-mono text-[9px] text-zinc-600 block">LOG ACTION</span>
                          <span className="text-xs text-zinc-400 block font-mono mt-1 font-semibold">HEAT_CALIBRATION_OK</span>
                        </div>
                      </div>
                    </div>

                    {/* Heatmap Section */}
                    <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">30-Day Activity Heatmap Matrix</span>
                        <span className="font-mono text-[9px] text-zinc-600">SHADES INDICATE ACTIVE CODING MINUTES</span>
                      </div>

                      <div className="grid grid-cols-7 gap-2 max-w-sm mx-auto">
                        {getHeatmapDays().map((day, idx) => {
                          const level = day.minutes === 0 ? "bg-zinc-900" : day.minutes < 30 ? "bg-emerald-950 text-emerald-400" : day.minutes < 60 ? "bg-emerald-800 text-emerald-200" : "bg-emerald-400 text-black shadow-[0_0_8px_rgba(16,185,129,0.3)]";
                          return (
                            <div
                              key={idx}
                              title={`${day.label}: ${day.minutes} mins`}
                              className={`aspect-square rounded flex flex-col items-center justify-center text-[8px] font-mono font-bold transition-all hover:scale-115 ${level}`}
                            >
                              {day.minutes > 0 ? `${day.minutes}m` : ""}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Manual Logger inputs */}
                    <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl space-y-4">
                      <h3 className="font-mono text-xs text-zinc-300">LOG CURRENT CODING SESSION</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="font-mono text-[9px] text-zinc-500 uppercase">Minutes spent</label>
                          <input
                            id="minutes-input"
                            type="number"
                            placeholder="e.g. 45"
                            value={minutesInput}
                            onChange={(e) => setMinutesInput(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-purple-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-mono text-[9px] text-zinc-500 uppercase">Problems Solved</label>
                          <input
                            id="problems-input"
                            type="number"
                            placeholder="e.g. 2"
                            value={problemsInput}
                            onChange={(e) => setProblemsInput(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-purple-500"
                          />
                        </div>
                      </div>
                      <button
                        onClick={logCodingMinutes}
                        className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                      >
                        SUBMIT_LOG
                      </button>
                    </div>
                  </div>
                )}

                {/* C. ACHIEVEMENTS MODULE */}
                {activeModule === "achievements" && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-display font-bold">Hardware Achievements</h2>
                      <p className="text-zinc-500 text-xs">Catalyzed student landmarks that dynamically trigger higher core momentum rewards.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.map((ach) => (
                        <div
                          key={ach.id}
                          className={`border p-5 rounded-2xl flex gap-4 transition-all ${
                            ach.isUnlocked
                              ? "bg-zinc-950 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.05)]"
                              : "bg-zinc-950/40 border-zinc-900 opacity-50"
                          }`}
                        >
                          <div className={`p-3 rounded-xl border shrink-0 flex items-center justify-center w-12 h-12 ${
                            ach.isUnlocked
                              ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-400 animate-pulse"
                              : "bg-zinc-900 border-zinc-850 text-zinc-600"
                          }`}>
                            <Award className="w-6 h-6" />
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-zinc-100">{ach.title}</h4>
                              <span className="font-mono text-[8px] text-zinc-500">+{ach.momentumBonus} XP</span>
                            </div>
                            <p className="text-xs text-zinc-400 leading-snug">{ach.description}</p>
                            
                            <div className="font-mono text-[9px] mt-2">
                              {ach.isUnlocked ? (
                                <span className="text-emerald-400 uppercase font-bold">Verified // unlocked</span>
                              ) : (
                                <span className="text-zinc-600 uppercase">Offline // locked</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* FULL SCREEN STREAK CODING APP OVERLAY */}
      {showStreakApp && (
        <StreakCodingApp
          profile={profile}
          onClose={() => setShowStreakApp(false)}
          onUpdateStreak={(newStreak) => setCodingStreak(newStreak)}
        />
      )}
    </div>
  );
}
