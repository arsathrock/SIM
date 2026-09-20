import { Achievement, TimelineEvent, MockInterviewQuestion } from "../types";

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: "att-75",
    title: "High Attendance Core",
    description: "Maintain your attendance above 75% across all subjects.",
    category: "attendance",
    isUnlocked: true,
    momentumBonus: 15,
  },
  {
    id: "first-log",
    title: "Initiate Momentum",
    description: "Log your first daily coding session on SIM.",
    category: "coding",
    isUnlocked: false,
    momentumBonus: 10,
  },
  {
    id: "code-streak-3",
    title: "Triple Spark",
    description: "Maintain a 3-day active coding streak.",
    category: "coding",
    isUnlocked: false,
    momentumBonus: 20,
  },
  {
    id: "first-coach",
    title: "Voice Calibration",
    description: "Submit your first answer to the J.A.R.V.I.S. Interview Coach.",
    category: "interview",
    isUnlocked: false,
    momentumBonus: 15,
  },
  {
    id: "momentum-50",
    title: "Half-Velocity",
    description: "Reach a Momentum Score of 50.",
    category: "momentum",
    isUnlocked: false,
    momentumBonus: 25,
  },
  {
    id: "momentum-80",
    title: "Terminal Velocity",
    description: "Achieve the elite Momentum Score of 80 or above.",
    category: "momentum",
    isUnlocked: false,
    momentumBonus: 40,
  }
];

export const INITIAL_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "ev-1",
    time: "Today, 08:30 AM",
    title: "Identity Calibration Complete",
    description: "Successfully forged your student profile and initialized J.A.R.V.I.S. core.",
    changeType: "increase",
    changeValue: 30,
  },
  {
    id: "ev-2",
    time: "Yesterday, 02:15 PM",
    title: "Skipped Morning Laboratory",
    description: "Class skipped without formal excuse. Projected attendance impacted.",
    changeType: "decrease",
    changeValue: 10,
  },
  {
    id: "ev-3",
    time: "Yesterday, 07:00 PM",
    title: "Completed DSA LinkedLists",
    description: "Logged 45 minutes of persistent coding practice.",
    changeType: "increase",
    changeValue: 15,
  }
];

export const MOCK_INTERVIEW_QUESTIONS: MockInterviewQuestion[] = [
  {
    id: "q-1",
    category: "Behavioral & Motivation",
    question: "Why did you choose this target role, and how are you preparing for it?",
    sampleAnswer: "I chose this role because of its direct real-world impact. I prepare daily by building hands-on projects, practicing algorithms, and tracking my consistency through tracking mechanisms."
  },
  {
    id: "q-2",
    category: "Technical Hurdle",
    question: "Describe a complex technical bug or challenge you faced, and your systematic debugging process.",
    sampleAnswer: "I encountered a major memory leak in a React app. By isolating rendering lifecycles, using the Chrome Performance tab, and memoizing handlers, I reduced load times by 40%."
  },
  {
    id: "q-3",
    category: "Pressure & Prioritization",
    question: "How do you manage strict project deadlines when your team is lagging behind?",
    sampleAnswer: "I map the critical path immediately, assign specific deliverables, establish open transparency, and run rapid syncs to unblock developers early."
  }
];
