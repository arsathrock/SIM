export interface StudentProfile {
  name: string;
  becoming: string; // Q1: Career Field
  fear: string;     // Q2: Legacy / Remember name
  stoppedBy: string; // Q3: Pride & Vision
  studentType: string; // Q4: Fear of Stagnation
  realizationTrigger: string; // Q5: Avoided Friction
  dream: string;      // Q6: Nightly Distractions
  quote: string;      // Q7: External Perspective
  firstVictory?: string; // Q8: First Victory Threshold
  coreDrive?: string;    // Q9: Core Drive
}

export interface AttendanceRecord {
  date: string; // YYYY-MM-DD
  status: "present" | "absent" | "excused";
  subject: string;
}

export interface CodingLog {
  date: string; // YYYY-MM-DD
  minutes: number;
  problemsSolved: number;
}

export interface Milestone {
  title: string;
  description: string;
  duration: string;
  actionableSteps: string[];
  status: "locked" | "active" | "completed";
  momentumGain: string;
}

export interface CareerRoadmap {
  title: string;
  overview: string;
  milestones: Milestone[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: "attendance" | "coding" | "career" | "interview" | "momentum";
  unlockedAt?: string;
  isUnlocked: boolean;
  momentumBonus: number;
}

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  changeType: "increase" | "decrease" | "neutral";
  changeValue: number;
}

export interface MockInterviewQuestion {
  id: string;
  category: string;
  question: string;
  sampleAnswer?: string;
}

export interface InterviewFeedback {
  rating: string;
  strengths: string;
  weaknesses: string;
  improvedAnswer: string;
  jarvisEncouragement: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "jarvis";
  text: string;
  timestamp: string;
}
