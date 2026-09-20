import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Flame, Check, Lock, Trophy, Upload, Shield, Zap, ChevronLeft,
  RefreshCw, X, Target, Code, Cpu, BookOpen, Star, Crown,
  Sparkles, Terminal, Award, HelpCircle, CheckCircle2, ArrowRight,
  Sprout, Puzzle, Swords, Brain, Briefcase, Layers, Rocket, Key, Bot, Compass, Code2, ShieldAlert
} from "lucide-react";
import { StudentProfile } from "../types";

interface StreakCodingAppProps {
  profile: StudentProfile;
  onClose: () => void;
  onUpdateStreak?: (streak: number) => void;
}

// 10 Badge Evolution Ranks
export interface BadgeRank {
  id: number;
  title: string;
  minLevels: number;
  iconType: string;
  color: string;
  glow: string;
  description: string;
  borderClass: string;
  badgeBg: string;
}

export const BADGE_RANKS: BadgeRank[] = [
  {
    id: 1,
    title: "Explorer",
    minLevels: 0,
    iconType: "sprout",
    color: "text-[#00FF88]",
    glow: "shadow-[0_0_20px_rgba(0,255,136,0.3)]",
    description: "Initiated the DSA journey. Stepping into algorithmic logic.",
    borderClass: "border-[#00FF88]/40",
    badgeBg: "bg-[#0D1117]",
  },
  {
    id: 2,
    title: "Problem Solver",
    minLevels: 3,
    iconType: "puzzle",
    color: "text-[#00FF88]",
    glow: "shadow-[0_0_25px_rgba(0,255,136,0.4)]",
    description: "Conquered basic arrays & string manipulation patterns.",
    borderClass: "border-[#00FF88]/60",
    badgeBg: "bg-[#0D1117]",
  },
  {
    id: 3,
    title: "Code Warrior",
    minLevels: 6,
    iconType: "swords",
    color: "text-[#00FF88]",
    glow: "shadow-[0_0_30px_rgba(0,255,136,0.5)]",
    description: "Mastered two-pointer techniques, sliding windows & hash maps.",
    borderClass: "border-[#00FF88]/80",
    badgeBg: "bg-[#0D1117]",
  },
  {
    id: 4,
    title: "Algorithm Hunter",
    minLevels: 9,
    iconType: "target",
    color: "text-[#00D47A]",
    glow: "shadow-[0_0_35px_rgba(0,212,122,0.6)]",
    description: "Hunting down binary search trees, stacks & queues with speed.",
    borderClass: "border-[#00D47A]",
    badgeBg: "bg-[#0D1117]",
  },
  {
    id: 5,
    title: "Logic Master",
    minLevels: 12,
    iconType: "brain",
    color: "text-[#00FF88]",
    glow: "shadow-[0_0_40px_rgba(0,255,136,0.7)]",
    description: "Recursion & backtracking mapped directly into memory core.",
    borderClass: "border-[#00FF88]",
    badgeBg: "bg-[#0D1117]",
  },
  {
    id: 6,
    title: "Interview Challenger",
    minLevels: 15,
    iconType: "briefcase",
    color: "text-emerald-300",
    glow: "shadow-[0_0_45px_rgba(0,255,136,0.8)]",
    description: "Cracking graphs, BFS/DFS traversals & dynamic programming base.",
    borderClass: "border-emerald-400 font-bold",
    badgeBg: "bg-[#0D1117]",
  },
  {
    id: 7,
    title: "Placement Ready",
    minLevels: 18,
    iconType: "award",
    color: "text-[#00FF88]",
    glow: "shadow-[0_0_50px_rgba(0,255,136,0.9)]",
    description: "Sub-optimal solutions eliminated. Operating at O(N log N) mastery.",
    borderClass: "border-[#00FF88] font-bold",
    badgeBg: "bg-[#0D1117]",
  },
  {
    id: 8,
    title: "Elite Engineer",
    minLevels: 22,
    iconType: "zap",
    color: "text-emerald-200",
    glow: "shadow-[0_0_55px_rgba(0,255,136,1)]",
    description: "Segment trees, trie structures & advanced DP algorithms unlocked.",
    borderClass: "border-[#00FF88] font-extrabold",
    badgeBg: "bg-[#0D1117]",
  },
  {
    id: 9,
    title: "Future Architect",
    minLevels: 26,
    iconType: "layers",
    color: "text-[#00FF88]",
    glow: "shadow-[0_0_60px_rgba(0,255,136,1)]",
    description: "Designing hyper-scalable data structures & system architectures.",
    borderClass: "border-[#00FF88] font-extrabold",
    badgeBg: "bg-[#0D1117]",
  },
  {
    id: 10,
    title: "Legendary Coder",
    minLevels: 30,
    iconType: "crown",
    color: "text-amber-300",
    glow: "shadow-[0_0_70px_rgba(255,215,0,1)]",
    description: "Supreme Grandmaster. Flawless competitive execution and FAANG level mastery.",
    borderClass: "border-amber-400 font-black",
    badgeBg: "bg-gradient-to-r from-emerald-950 via-zinc-900 to-amber-950",
  },
];

// Helper component to render badge icons
function renderBadgeIcon(iconType: string, className = "w-6 h-6") {
  switch (iconType) {
    case "sprout": return <Sprout className={className} />;
    case "puzzle": return <Puzzle className={className} />;
    case "swords": return <Swords className={className} />;
    case "target": return <Target className={className} />;
    case "brain": return <Brain className={className} />;
    case "briefcase": return <Briefcase className={className} />;
    case "award": return <Award className={className} />;
    case "zap": return <Zap className={className} />;
    case "layers": return <Layers className={className} />;
    case "crown": return <Crown className={className} />;
    default: return <Code className={className} />;
  }
}

// Platform Definitions
export interface PlatformOption {
  id: string;
  name: string;
  tagline: string;
  iconType: string;
  code: string;
}

export const PLATFORMS_LIST: PlatformOption[] = [
  { id: "leetcode", name: "LeetCode", tagline: "FAANG & Silicon Valley Interview Standard", iconType: "code", code: "LC" },
  { id: "hackerrank", name: "HackerRank", tagline: "6-Star Badges & Core Problem Solving", iconType: "target", code: "HR" },
  { id: "codeforces", name: "Codeforces", tagline: "Competitive Contest Rating & Math", iconType: "swords", code: "CF" },
  { id: "codingninjas", name: "CodingNinjas", tagline: "SDE Placement Sheets & POTD", iconType: "cpu", code: "CN" },
];

function renderPlatformIcon(iconType: string, className = "w-6 h-6") {
  switch (iconType) {
    case "code": return <Code2 className={className} />;
    case "target": return <Target className={className} />;
    case "swords": return <Swords className={className} />;
    case "cpu": return <Cpu className={className} />;
    default: return <Terminal className={className} />;
  }
}

// Mission Types
export interface MissionOption {
  id: string;
  title: string;
  questions: number;
  days: number;
  totalBoxes: number;
  mainLevels: number;
  checkpoints: number;
  estimatedDaysText: string;
}

export const MISSIONS_LIST: MissionOption[] = [
  {
    id: "15_15",
    title: "15 Questions",
    questions: 15,
    days: 15,
    totalBoxes: 21,
    mainLevels: 15,
    checkpoints: 6,
    estimatedDaysText: "Estimated 15 Days",
  },
  {
    id: "60_30",
    title: "60 Questions",
    questions: 60,
    days: 30,
    totalBoxes: 40,
    mainLevels: 30,
    checkpoints: 10,
    estimatedDaysText: "Estimated 30 Days",
  },
  {
    id: "100_75",
    title: "100 Questions",
    questions: 100,
    days: 75,
    totalBoxes: 66,
    mainLevels: 50,
    checkpoints: 16,
    estimatedDaysText: "Estimated 75 Days",
  },
  {
    id: "custom",
    title: "Custom Mission",
    questions: 45,
    days: 45,
    totalBoxes: 40,
    mainLevels: 30,
    checkpoints: 10,
    estimatedDaysText: "Custom Target",
  },
];

// Node Structure
export interface NodeItem {
  id: number;
  type: "level" | "mystery";
  levelNum?: number;
  mysteryNum?: number;
  label: string;
}

export function generateNodes(totalBoxes: number, mainCount: number, mysteryCount: number): NodeItem[] {
  const items: NodeItem[] = [];
  
  const mysteryIndices = new Set<number>();
  if (mysteryCount > 0 && totalBoxes > mysteryCount) {
    const interval = totalBoxes / (mysteryCount + 1);
    for (let m = 1; m <= mysteryCount; m++) {
      const pos = Math.min(totalBoxes - 1, Math.max(2, Math.round(m * interval)));
      mysteryIndices.add(pos);
    }
  }

  let lCount = 1;
  let mCount = 1;

  for (let i = 1; i <= totalBoxes; i++) {
    if (mysteryIndices.has(i) && mCount <= mysteryCount) {
      items.push({
        id: i,
        type: "mystery",
        mysteryNum: mCount,
        label: "Check",
      });
      mCount++;
    } else if (lCount <= mainCount) {
      items.push({
        id: i,
        type: "level",
        levelNum: lCount,
        label: `Node ${lCount < 10 ? '0' : ''}${lCount}`,
      });
      lCount++;
    } else {
      items.push({
        id: i,
        type: "mystery",
        mysteryNum: mCount,
        label: "Check",
      });
      mCount++;
    }
  }
  return items;
}

export default function StreakCodingApp({ profile, onClose, onUpdateStreak }: StreakCodingAppProps) {
  // State variables
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformOption>(PLATFORMS_LIST[0]);
  const [selectedMission, setSelectedMission] = useState<MissionOption | null>(null);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [momentum, setMomentum] = useState<number>(0);

  // Completed Nodes
  const [completedNodes, setCompletedNodes] = useState<Record<number, boolean>>({});

  // Modal Inspection State
  const [activeModalNode, setActiveModalNode] = useState<NodeItem | null>(null);
  const [uploadProofText, setUploadProofText] = useState<string>("");
  const [uploadLink, setUploadLink] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [justClearedNode, setJustClearedNode] = useState<NodeItem | null>(null);

  // Mystery Reward Popup State
  const [mysteryReward, setMysteryReward] = useState<{
    type: string;
    title: string;
    detail: string;
    iconType: string;
  } | null>(null);

  // View state: "selector" | "preparing" | "board" | "ranks"
  const [viewState, setViewState] = useState<"selector" | "preparing" | "board" | "ranks">("selector");
  const [prepCountdown, setPrepCountdown] = useState<number>(10);

  // Auto-countdown timer for preparing state
  useEffect(() => {
    let timer: any;
    if (viewState === "preparing") {
      if (prepCountdown > 0) {
        timer = setTimeout(() => {
          setPrepCountdown((prev) => prev - 1);
        }, 1000);
      } else {
        setViewState("board");
      }
    }
    return () => clearTimeout(timer);
  }, [viewState, prepCountdown]);

  // Calculate current badge rank
  const completedCount = Object.keys(completedNodes).filter((k) => completedNodes[parseInt(k)]).length;

  const getCurrentBadge = (): BadgeRank => {
    let curr = BADGE_RANKS[0];
    for (const r of BADGE_RANKS) {
      if (completedCount >= r.minLevels) {
        curr = r;
      }
    }
    return curr;
  };

  const currentBadge = getCurrentBadge();

  // Generate nodes for board
  const activeMissionConfig = selectedMission || MISSIONS_LIST[1];
  const nodesPath = generateNodes(activeMissionConfig.totalBoxes, activeMissionConfig.mainLevels, activeMissionConfig.checkpoints);

  // Get next active node to solve
  const getNextNode = (): NodeItem | undefined => {
    return nodesPath.find((n) => !completedNodes[n.id]);
  };

  const nextNodeToSolve = getNextNode();

  // Personalized content
  const getPersonalizedWhyDsa = () => {
    const field = (profile.becoming || profile.studentType || "").toLowerCase();

    if (field.includes("ai") || field.includes("machine learning") || field.includes("data scientist")) {
      return {
        roleLabel: "AI & ML Engineer",
        points: [
          "Logical Thinking & Algorithmic Complexity",
          "High-Performance AI Model & Tensor Optimization",
          "Technical Interview Confidence at Top AI Labs",
          "Placement Readiness for High-Tier ML Engineering Roles",
        ],
      };
    } else if (field.includes("web") || field.includes("full stack") || field.includes("frontend") || field.includes("backend")) {
      return {
        roleLabel: "Full Stack Web Architect",
        points: [
          "DOM Tree Manipulation & Memory Efficiency",
          "System Architecture & API Payload Optimization",
          "Technical Whiteboarding Interview Confidence",
          "Top Product-Based Company Placement Readiness",
        ],
      };
    } else if (field.includes("cyber") || field.includes("security")) {
      return {
        roleLabel: "Cyber Security Specialist",
        points: [
          "Cryptographic Algorithms & Binary Logic",
          "Buffer Overflow & Code Vulnerability Auditing",
          "Technical Interview & Security Challenge Confidence",
          "Enterprise Cyber Defense Placement Readiness",
        ],
      };
    } else if (field.includes("mobile") || field.includes("android") || field.includes("ios")) {
      return {
        roleLabel: "Mobile App Specialist",
        points: [
          "Efficient Data Caching & Battery Life Preservation",
          "Smooth Thread Handling & Offline Storage Logic",
          "Technical Coding Round Confidence",
          "Tier-1 Mobile Tech Placement Readiness",
        ],
      };
    } else {
      return {
        roleLabel: "Software Engineering Student",
        points: [
          "Logical Thinking & Problem Decomposition",
          "Core Computer Science Fundamentals & Memory Logic",
          "Technical Coding Interview Confidence",
          "Dream FAANG Tech Company Placement Readiness",
        ],
      };
    }
  };

  const personalizedWhyDsa = getPersonalizedWhyDsa();

  // Mystery rewards pool
  const triggerMysteryReward = (node: NodeItem) => {
    const mysteryPool = [
      {
        type: "Bronze Badge",
        title: "Bronze Algorithm Shield",
        detail: "Unlocked a rare green aura shield for your student profile!",
        iconType: "shield",
      },
      {
        type: "Momentum Boost",
        title: "Momentum Surge (+100)",
        detail: "Energy core charged! +100 Momentum added to your profile stats.",
        iconType: "zap",
      },
      {
        type: "Double XP",
        title: "Double XP Multiplier (24 hrs)",
        detail: "All problem submissions for the next 24 hours grant 2x Momentum!",
        iconType: "flame",
      },
      {
        type: "Interview Question",
        title: "FAANG Secret Interview Question Unlocked",
        detail: "Revealed: High-Frequency Dynamic Programming problem breakdown.",
        iconType: "key",
      },
      {
        type: "Hidden Jarvis Message",
        title: "Hidden Jarvis AI Message",
        detail: "\"You've already solved more problems than 73% of students. Keep pushing!\"",
        iconType: "bot",
      },
      {
        type: "Profile Border",
        title: "Razer Neon Green Glow Border",
        detail: "Your student HUD avatar now radiates an intense Razer Neon Green aura!",
        iconType: "sparkles",
      },
    ];

    const chosen = mysteryPool[Math.floor(Math.random() * mysteryPool.length)];

    if (chosen.type === "Momentum Boost") {
      setMomentum((m) => m + 100);
    }

    setMysteryReward(chosen);
  };

  // Handle proof upload submission
  const handleUploadProofSubmit = () => {
    if (!activeModalNode) return;
    setIsVerifying(true);

    setTimeout(() => {
      setCompletedNodes((prev) => ({ ...prev, [activeModalNode.id]: true }));
      setMomentum((prev) => prev + 20);

      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (onUpdateStreak) onUpdateStreak(newStreak);

      setIsVerifying(false);
      const curr = activeModalNode;
      setActiveModalNode(null);
      setUploadProofText("");
      setUploadLink("");

      setJustClearedNode(curr);
      setTimeout(() => setJustClearedNode(null), 3000);

      if (curr.type === "mystery") {
        setTimeout(() => triggerMysteryReward(curr), 500);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0D1117] text-[#00FF88] font-mono overflow-y-auto flex flex-col select-none border-4 border-[#00FF88]/30 shadow-[0_0_100px_rgba(0,255,136,0.2)]">
      
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00FF88]/10 via-[#0D1117] to-black pointer-events-none z-0" />
      <div className="fixed inset-0 opacity-15 bg-[linear-gradient(to_right,#00FF88_1px,transparent_1px),linear-gradient(to_bottom,#00FF88_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      {/* TOP NAVIGATION & HEADER */}
      <header className="relative z-20 w-full bg-[#0D1117]/95 border-b-2 border-[#00FF88]/40 backdrop-blur-md px-4 sm:px-8 py-4 flex items-center justify-between gap-4 shadow-[0_0_30px_rgba(0,255,136,0.2)]">
        
        {/* Left Title & Exit Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-black border-2 border-[#00FF88]/50 hover:bg-[#00FF88]/20 text-[#00FF88] transition-all cursor-pointer flex items-center gap-2 font-black text-xs shadow-[0_0_15px_rgba(0,255,136,0.3)]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>EXIT</span>
          </button>

          <div className="flex items-center gap-3">
            <img 
              src="/fav.png" 
              alt="Kalvium Logo" 
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-[#00FF88]/40 shadow-[0_0_12px_rgba(0,255,136,0.3)] object-contain bg-white p-0.5" 
            />
            <Zap className="w-5 h-5 text-[#00FF88]" />
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wider uppercase font-sans">
              CODING EXPEDITION
            </h1>
          </div>
        </div>

      </header>

      {/* TOP NAVIGATION SUB-BAR */}
      <div className="relative z-20 w-full bg-[#0D1117]/80 border-b border-[#00FF88]/30 px-6 py-2.5 flex items-center justify-between text-xs font-bold">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setViewState("selector")}
            className={`px-4 py-1.5 rounded-lg border font-mono transition-all cursor-pointer ${
              viewState === "selector"
                ? "bg-[#00FF88]/20 border-[#00FF88] text-[#00FF88] shadow-[0_0_15px_#00FF88]"
                : "border-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            1. CHOOSE PLATFORM & MISSION
          </button>

          <button
            onClick={() => setViewState(selectedMission ? "board" : "selector")}
            className={`px-4 py-1.5 rounded-lg border font-mono transition-all cursor-pointer ${
              viewState === "board" || viewState === "preparing"
                ? "bg-[#00FF88]/20 border-[#00FF88] text-[#00FF88] shadow-[0_0_15px_#00FF88]"
                : "border-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            2. QUEST GAME BOARD ({nodesPath.length} BOXES)
          </button>

          <button
            onClick={() => setViewState("ranks")}
            className={`px-4 py-1.5 rounded-lg border font-mono transition-all cursor-pointer ${
              viewState === "ranks"
                ? "bg-[#00FF88]/20 border-[#00FF88] text-[#00FF88] shadow-[0_0_15px_#00FF88]"
                : "border-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            3. BADGE EVOLUTION (10 RANKS)
          </button>
        </div>

        <div className="hidden md:flex items-center gap-2 text-zinc-400 text-[11px]">
          <Terminal className="w-3.5 h-3.5 text-[#00FF88]" />
          <span>ACTIVE PLATFORM: <strong className="text-[#00FF88]">{selectedPlatform.name}</strong></span>
        </div>
      </div>

      {/* MAIN CONTENT CANVAS */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">

        {/* JUST CLEARED NOTIFICATION BANNER */}
        <AnimatePresence>
          {justClearedNode && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 rounded-2xl bg-black border-2 border-[#00FF88] text-center shadow-[0_0_40px_rgba(0,255,136,0.6)] font-mono text-sm font-extrabold text-[#00FF88] flex items-center justify-center gap-3 animate-pulse"
            >
              <CheckCircle2 className="w-6 h-6 text-[#00FF88]" />
              <span>NODE CLEARED! +20 MOMENTUM ADDED TO CORE ENGINE!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= VIEW 1: PLATFORM & MISSION SELECTOR + PERSONALIZED WHY DSA ================= */}
        {viewState === "selector" && (
          <div className="space-y-10">
            
            {/* 1. PLATFORM SELECTOR */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#00FF88]/30 pb-3">
                <h2 className="text-xl font-extrabold text-white font-sans uppercase tracking-tight flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-[#00FF88]" />
                  <span>1. CHOOSE PLATFORM</span>
                </h2>
                <span className="text-xs text-[#00FF88]">4 PLATFORMS AVAILABLE</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {PLATFORMS_LIST.map((plat) => {
                  const isSelected = selectedPlatform.id === plat.id;

                  return (
                    <button
                      key={plat.id}
                      onClick={() => {
                        setSelectedPlatform(plat);
                        if (!selectedMission) setSelectedMission(MISSIONS_LIST[1]);
                      }}
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 relative group text-center ${
                        isSelected
                          ? "bg-black border-[#00FF88] text-[#00FF88] shadow-[0_0_30px_rgba(0,255,136,0.5)] scale-105 font-bold"
                          : "bg-black/60 border-zinc-800 text-zinc-400 hover:border-[#00FF88]/50 hover:text-white"
                      }`}
                    >
                      <div className="p-3 rounded-xl bg-zinc-950 border border-[#00FF88]/30 text-[#00FF88] group-hover:scale-110 transition-transform">
                        {renderPlatformIcon(plat.iconType, "w-6 h-6")}
                      </div>

                      <div>
                        <span className="font-mono text-sm font-extrabold block text-white">{plat.name}</span>
                        <span className="text-[10px] text-zinc-400 line-clamp-1 mt-0.5">{plat.tagline}</span>
                      </div>

                      {isSelected && (
                        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#00FF88] shadow-[0_0_10px_#00FF88] animate-ping" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. CHOOSE YOUR MISSION */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#00FF88]/30 pb-3">
                <h2 className="text-xl font-extrabold text-white font-sans uppercase tracking-tight flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#00FF88]" />
                  <span>2. CHOOSE YOUR MISSION ({selectedPlatform.name.toUpperCase()})</span>
                </h2>
                <span className="text-xs text-[#00FF88]">SELECT TARGET DURATION</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {MISSIONS_LIST.map((mission) => {
                  const isMissionSelected = selectedMission?.id === mission.id;

                  return (
                    <button
                      key={mission.id}
                      onClick={() => {
                        setSelectedMission(mission);
                        setPrepCountdown(10);
                        setViewState("preparing");
                      }}
                      className={`p-6 rounded-3xl border-2 text-left transition-all cursor-pointer relative overflow-hidden group space-y-3 ${
                        isMissionSelected
                          ? "bg-black border-[#00FF88] text-white shadow-[0_0_35px_rgba(0,255,136,0.4)] scale-102"
                          : "bg-black/70 border-zinc-800 text-zinc-300 hover:border-[#00FF88]/60 hover:bg-black"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isMissionSelected ? "border-[#00FF88] bg-[#00FF88]" : "border-zinc-600"
                        }`}>
                          {isMissionSelected && <div className="w-2 h-2 rounded-full bg-black" />}
                        </div>
                        <span className="font-mono text-[10px] text-[#00FF88] font-bold uppercase">
                          {mission.estimatedDaysText}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-sans font-black text-lg text-white group-hover:text-[#00FF88] transition-colors">
                          {mission.title}
                        </h3>
                        <p className="font-mono text-xs text-zinc-400 mt-1">
                          {mission.totalBoxes} Boxes ({mission.mainLevels} Levels + {mission.checkpoints} Mystery Checkpoints)
                        </p>
                      </div>

                      <div className="pt-2 border-t border-zinc-900 flex items-center justify-between font-mono text-xs text-[#00FF88]">
                        <span>START MISSION</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. PERSONALIZED "WHY DSA MATTERS" SECTION */}
            <div className="bg-black/80 border-2 border-[#00FF88]/60 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,136,0.15)] space-y-4 font-mono relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-[#00FF88]/10 rounded-full blur-[70px] pointer-events-none" />

              <div className="flex items-center justify-between border-b border-[#00FF88]/30 pb-3">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-[#00FF88]/20 border border-[#00FF88] text-[#00FF88]">
                    <BookOpen className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-extrabold text-white uppercase font-sans">3. WHY DSA MATTERS</h3>
                    <p className="text-xs text-[#00FF88]">
                      PERSONALIZED FOR: <span className="font-black text-white">{personalizedWhyDsa.roleLabel.toUpperCase()}</span>
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-black border border-[#00FF88] text-[10px] font-bold text-[#00FF88]">
                  SIM PERSONALIZATION ENGINE
                </span>
              </div>

              <div className="space-y-3 text-xs text-zinc-300 leading-relaxed font-sans">
                <p className="text-sm font-medium text-white">
                  The companies you dream of joining don't hire based on marks. They hire people who can solve problems.
                </p>

                <div className="p-4 rounded-xl bg-[#0D1117] border border-[#00FF88]/30 space-y-2 font-mono">
                  <span className="text-[#00FF88] font-bold text-xs uppercase block">
                    EVERY CODING PROBLEM YOU SOLVE IMPROVES:
                  </span>
                  <ul className="space-y-1.5 text-zinc-300 text-xs">
                    {personalizedWhyDsa.points.map((pt, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-[#00FF88] font-bold">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-xs font-mono font-bold text-[#00FF88] pt-1">
                  Today's one problem becomes tomorrow's offer letter.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* ================= VIEW: PREPARATION & 9 PROFILE UNDERSTANDING QUESTIONS ================= */}
        {viewState === "preparing" && (
          <div className="space-y-8 font-mono">
            {/* Header banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-black/90 border-2 border-[#00FF88] shadow-[0_0_60px_rgba(0,255,136,0.3)] relative overflow-hidden space-y-4">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#00FF88]/10 rounded-full blur-[90px] pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#00FF88]/30 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00FF88] animate-ping" />
                    <span className="text-xs text-[#00FF88] font-black uppercase tracking-widest">
                      SIM PROFILE ANALYSIS COMPLETE
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white font-sans uppercase tracking-tight mt-1">
                    MISSION READY & PROFILE SYNCHRONIZATION
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1 font-sans">
                    Here is what SIM understands about your goals before launching your personalized <strong className="text-[#00FF88]">{selectedPlatform.name}</strong> expedition.
                  </p>
                </div>

                <button
                  onClick={() => setViewState("board")}
                  className="px-6 py-3 bg-[#00FF88] hover:bg-[#00D47A] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_25px_#00FF88] flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <span>LAUNCH ROADMAP NOW ({prepCountdown}s)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* 10-Second Countdown Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#00FF88] font-bold">AUTOMATIC ROADMAP LAUNCH</span>
                  <span className="text-white font-black bg-[#00FF88]/20 px-3 py-0.5 rounded border border-[#00FF88]">
                    00:0{prepCountdown}s
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-zinc-900 border border-[#00FF88]/40 overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-[#00FF88]/60 to-[#00FF88] rounded-full transition-all duration-1000 shadow-[0_0_15px_#00FF88]"
                    style={{ width: `${((10 - prepCountdown) / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Motivating Purpose & Capability Synthesis Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-black border-2 border-[#00FF88] shadow-[0_0_50px_rgba(0,255,136,0.25)] space-y-6 font-sans relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#00FF88]/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="flex items-center justify-between border-b border-[#00FF88]/30 pb-4 font-mono">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-xl bg-[#00FF88]/20 border border-[#00FF88] text-[#00FF88]">
                    <Sparkles className="w-6 h-6" />
                  </span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white uppercase font-sans">
                      SIM PROFILE SYNTHESIS & UNSTOPPABLE PURPOSE
                    </h3>
                    <p className="text-xs text-[#00FF88]">
                      EVALUATED FOR: <span className="font-black text-white">{profile.becoming ? profile.becoming.toUpperCase() : "SOFTWARE ENGINEER"}</span>
                    </p>
                  </div>
                </div>

                <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-black border border-[#00FF88] text-[10px] font-bold text-[#00FF88] font-mono">
                  100% PROFILE SYNCHRONIZED
                </span>
              </div>

              {/* Main Inspiring Synthesis Paragraph */}
              <div className="p-6 rounded-2xl bg-[#0D1117] border border-[#00FF88]/40 space-y-4">
                <p className="text-base sm:text-lg text-white leading-relaxed font-medium">
                  SIM has deeply evaluated your responses and synthesized your ultimate goal: becoming a top-tier <strong className="text-[#00FF88] font-bold">{profile.becoming || "Software Development Engineer"}</strong>. Your choice to embark on the <strong className="text-[#00FF88] font-bold">{selectedPlatform.name}</strong> arena via this <strong className="text-[#00FF88] font-bold">{activeMissionConfig.title}</strong> expedition directly serves your core drive—<strong className="text-white">{profile.coreDrive || "Continuous Skill Mastery & Placement Victory"}</strong>—and your long-term dream of <strong className="text-white">{profile.dream || "Cracking High-Impact Tech Offers"}</strong>.
                </p>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  Through your profile traits, SIM recognizes your execution archetype as a <strong className="text-[#00FF88] font-bold">{profile.studentType || "Disciplined High-Focus Code Explorer"}</strong> who powers through obstacles with <strong className="text-white">{profile.firstVictory || "Consistent Daily Logic"}</strong>. You don't run away from difficult problems—you break them down step by step until they submit to your logic.
                </p>

                <div className="p-4 rounded-xl bg-black border-2 border-[#00FF88]/60 text-center space-y-2 shadow-[0_0_20px_rgba(0,255,136,0.15)]">
                  <h4 className="font-mono text-xs text-[#00FF88] font-extrabold uppercase tracking-widest">
                    SIM VERDICT & BELIEF
                  </h4>
                  <p className="text-base sm:text-lg font-bold text-white font-sans leading-snug">
                    You have all the talent, mental resilience, and analytical focus required to master this entire roadmap. Every node you unlock is a direct stepping stone toward your offer letter. <span className="text-[#00FF88] font-black underline underline-offset-4">YOU CAN DEFINITELY ACCOMPLISH THIS MISSION!</span>
                  </p>
                </div>
              </div>

              {/* 4 Core Purpose Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-[#0D1117] border border-[#00FF88]/30 space-y-1">
                  <span className="text-[10px] text-zinc-500 font-bold block uppercase">TARGET ROLE</span>
                  <span className="text-white font-extrabold block truncate">{profile.becoming || "Software Engineer"}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0D1117] border border-[#00FF88]/30 space-y-1">
                  <span className="text-[10px] text-zinc-500 font-bold block uppercase">CHOSEN ARENA</span>
                  <span className="text-[#00FF88] font-extrabold block truncate">{selectedPlatform.name} ({activeMissionConfig.days}D)</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0D1117] border border-[#00FF88]/30 space-y-1">
                  <span className="text-[10px] text-zinc-500 font-bold block uppercase">EXECUTION STYLE</span>
                  <span className="text-white font-extrabold block truncate">{profile.studentType || "High-Focus Coder"}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0D1117] border border-[#00FF88]/30 space-y-1">
                  <span className="text-[10px] text-zinc-500 font-bold block uppercase">CAPABILITY STATUS</span>
                  <span className="text-[#00FF88] font-extrabold block truncate">100% READY TO WIN</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= VIEW 2: QUEST GAME BOARD ================= */}
        {viewState === "board" && (
          <div className="space-y-6">
            
            {/* Board Banner */}
            <div className="p-6 rounded-3xl bg-black border-2 border-[#00FF88]/80 shadow-[0_0_50px_rgba(0,255,136,0.2)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-[#00FF88]/20 border border-[#00FF88] text-[#00FF88] text-xs font-bold uppercase">
                    {selectedPlatform.name}
                  </span>
                  <span className="text-xs text-zinc-400">
                    MISSION: <strong className="text-white">{activeMissionConfig.title}</strong>
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white font-sans uppercase tracking-tight mt-1">
                  QUEST GAME BOARD ({nodesPath.length} BOXES)
                </h2>
                <p className="text-xs text-zinc-400">
                  {activeMissionConfig.mainLevels} Main Levels + {activeMissionConfig.checkpoints} Mystery Checkpoints. Complete one problem per node to advance!
                </p>
              </div>

              {nextNodeToSolve && (
                <button
                  onClick={() => setActiveModalNode(nextNodeToSolve)}
                  className="px-6 py-3 bg-[#00FF88] hover:bg-[#00D47A] text-black font-extrabold font-mono text-xs uppercase tracking-wider rounded-2xl transition-all shadow-[0_0_30px_#00FF88] cursor-pointer flex items-center gap-2 animate-bounce shrink-0"
                >
                  <Flame className="w-4 h-4 fill-black" />
                  <span>UNLOCK {nextNodeToSolve.label} NOW</span>
                </button>
              )}
            </div>

            {/* QUEST SERPENTINE WINDING PATHWAY */}
            <div className="p-8 rounded-3xl bg-black/90 border-2 border-[#00FF88]/40 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,255,136,0.15)] relative overflow-hidden">
              
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-y-10 gap-x-4 justify-items-center relative z-10 py-4">
                {nodesPath.map((node) => {
                  const isCompleted = completedNodes[node.id];
                  const isNext = nextNodeToSolve?.id === node.id;
                  const isMystery = node.type === "mystery";

                  return (
                    <div key={node.id} className="relative flex flex-col items-center group">
                      
                      {/* Node Box */}
                      <motion.button
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveModalNode(node)}
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex flex-col items-center justify-center font-mono font-black text-xs relative transition-all cursor-pointer ${
                          isCompleted
                            ? "bg-[#00FF88] text-black border-2 border-[#00FF88] shadow-[0_0_25px_#00FF88]"
                            : isNext
                            ? "bg-black border-2 border-[#00FF88] text-[#00FF88] shadow-[0_0_30px_#00FF88] animate-pulse"
                            : isMystery
                            ? "bg-amber-950/90 border-2 border-amber-400 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.6)]"
                            : "bg-[#0D1117] border border-zinc-800 text-zinc-600 hover:border-[#00FF88]/60 hover:text-white"
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-7 h-7 text-black stroke-[3.5]" />
                        ) : isMystery ? (
                          <div className="flex flex-col items-center">
                            <Star className="w-5 h-5 text-amber-300 fill-amber-300 mb-0.5" />
                            <span className="text-[9px] font-extrabold text-amber-300 uppercase">MYSTERY</span>
                          </div>
                        ) : isNext ? (
                          <div className="flex flex-col items-center">
                            <Flame className="w-5 h-5 fill-[#00FF88] text-[#00FF88] animate-bounce" />
                            <span className="text-[9px] font-extrabold text-[#00FF88]">N-{node.levelNum}</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <Lock className="w-4 h-4 text-zinc-600 mb-0.5" />
                            <span className="text-[10px] text-zinc-500">N-{node.levelNum}</span>
                          </div>
                        )}

                        <span className="absolute -bottom-2 px-1.5 py-0.5 rounded-full bg-black border border-[#00FF88]/50 text-[9px] font-mono font-bold text-[#00FF88]">
                          #{node.id}
                        </span>
                      </motion.button>

                      {/* Tooltip */}
                      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 bg-black border border-[#00FF88] px-3 py-1 rounded-lg text-[10px] font-mono text-[#00FF88] whitespace-nowrap shadow-xl">
                        {isCompleted
                          ? `${node.label} Cleared`
                          : isMystery
                          ? `Mystery Checkpoint #${node.mysteryNum}`
                          : `${node.label} Locked`}
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        )}

        {/* ================= VIEW 3: BADGE EVOLUTION (10 RANKS) ================= */}
        {viewState === "ranks" && (
          <div className="space-y-6">
            
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="px-3 py-1 rounded-full bg-black border border-[#00FF88] font-mono text-xs text-[#00FF88] font-bold uppercase">
                10-TIER RANKING SYSTEM
              </span>
              <h2 className="text-3xl font-black text-white font-sans uppercase tracking-tight">
                BADGE EVOLUTION RANKS
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                Instead of earning points only, evolve through 10 recognized coder ranks with green aura profile effects!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BADGE_RANKS.map((rank) => {
                const isUnlocked = completedCount >= rank.minLevels;
                const isCurrent = currentBadge.id === rank.id;

                return (
                  <div
                    key={rank.id}
                    className={`p-5 rounded-2xl border-2 transition-all flex items-start gap-4 relative overflow-hidden ${
                      isCurrent
                        ? "bg-black border-[#00FF88] shadow-[0_0_40px_rgba(0,255,136,0.5)] scale-102"
                        : isUnlocked
                        ? "bg-black/80 border-[#00FF88]/50 text-white"
                        : "bg-[#0D1117] border-zinc-900 opacity-40 text-zinc-500"
                    }`}
                  >
                    <div className="p-3.5 rounded-2xl bg-black border border-[#00FF88]/40 shrink-0 text-[#00FF88]">
                      {renderBadgeIcon(rank.iconType, "w-8 h-8")}
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between font-mono">
                        <h4 className={`text-base font-extrabold ${rank.color}`}>
                          {rank.id}. {rank.title}
                        </h4>
                        <span className="text-[10px] text-zinc-400">
                          {rank.minLevels} LEVELS REQ
                        </span>
                      </div>

                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        {rank.description}
                      </p>

                      <div className="pt-2 border-t border-zinc-900 flex items-center justify-between font-mono text-[10px]">
                        <span className={isUnlocked ? "text-[#00FF88] font-bold flex items-center gap-1" : "text-zinc-600 flex items-center gap-1"}>
                          {isUnlocked ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF88]" />
                              <span>RANK UNLOCKED</span>
                            </>
                          ) : (
                            <>
                              <Lock className="w-3.5 h-3.5 text-zinc-600" />
                              <span>LOCKED RANK</span>
                            </>
                          )}
                        </span>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded bg-[#00FF88] text-black font-extrabold uppercase">
                            CURRENT RANK
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </main>

      {/* ================= MODAL 1: LEVEL / NODE PROOF SUBMISSION ================= */}
      <AnimatePresence>
        {activeModalNode && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-mono">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-lg bg-[#0D1117] border-2 border-[#00FF88] rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_0_60px_rgba(0,255,136,0.4)] relative"
            >
              <button
                onClick={() => setActiveModalNode(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-black border border-zinc-800 text-zinc-400 hover:text-white hover:border-[#00FF88] transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="px-3 py-1 rounded bg-black border border-[#00FF88] text-[#00FF88] text-[10px] font-bold uppercase">
                  {selectedPlatform.name} // {activeModalNode.label}
                </span>
                <h3 className="text-2xl font-black text-white uppercase font-sans mt-2">
                  {activeModalNode.type === "mystery" ? "MYSTERY NODE UNLOCK" : `NODE ${activeModalNode.levelNum}: CODING CHALLENGE`}
                </h3>
                <p className="text-xs text-zinc-400 font-sans">
                  Complete ONE {selectedPlatform.name} problem and submit proof below to verify and clear this node!
                </p>
              </div>

              {/* Form Upload */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#00FF88] uppercase block mb-1">
                    PROBLEM TITLE / DESCRIPTION
                  </label>
                  <input
                    type="text"
                    value={uploadProofText}
                    onChange={(e) => setUploadProofText(e.target.value)}
                    placeholder="e.g. Solved Two Sum using HashMap in O(N)..."
                    className="w-full px-4 py-3 rounded-xl bg-black border border-[#00FF88]/50 text-white font-sans text-xs focus:outline-none focus:border-[#00FF88] shadow-inner"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#00FF88] uppercase block mb-1">
                    SCREENSHOT OR SUBMISSION URL LINK
                  </label>
                  <input
                    type="text"
                    value={uploadLink}
                    onChange={(e) => setUploadLink(e.target.value)}
                    placeholder="https://leetcode.com/submissions/detail/..."
                    className="w-full px-4 py-3 rounded-xl bg-black border border-[#00FF88]/50 text-white font-sans text-xs focus:outline-none focus:border-[#00FF88] shadow-inner"
                  />
                </div>

                {/* Upload Button */}
                <button
                  onClick={handleUploadProofSubmit}
                  disabled={isVerifying}
                  className={`w-full py-3.5 rounded-xl font-mono text-xs font-extrabold uppercase transition-all shadow-[0_0_25px_#00FF88] flex items-center justify-center gap-2 cursor-pointer ${
                    isVerifying
                      ? "bg-[#00FF88]/50 text-black cursor-wait animate-pulse"
                      : "bg-[#00FF88] hover:bg-[#00D47A] text-black"
                  }`}
                >
                  {isVerifying ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>AI VERIFYING PROOF...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>[ UPLOAD & CLEAR NODE ]</span>
                    </>
                  )}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= MODAL 2: MYSTERY CHECKPOINT REWARD REVEAL ================= */}
      <AnimatePresence>
        {mysteryReward && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 font-mono">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-full max-w-md bg-black border-2 border-amber-400 rounded-3xl p-8 space-y-6 text-center shadow-[0_0_80px_rgba(245,158,11,0.6)] relative"
            >
              <div className="p-4 rounded-3xl bg-[#0D1117] border border-amber-400/50 w-20 h-20 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.5)] text-amber-400">
                {mysteryReward.iconType === "shield" && <Shield className="w-10 h-10" />}
                {mysteryReward.iconType === "zap" && <Zap className="w-10 h-10" />}
                {mysteryReward.iconType === "flame" && <Flame className="w-10 h-10" />}
                {mysteryReward.iconType === "key" && <Key className="w-10 h-10" />}
                {mysteryReward.iconType === "bot" && <Bot className="w-10 h-10" />}
                {mysteryReward.iconType === "sparkles" && <Sparkles className="w-10 h-10" />}
              </div>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded bg-amber-950 border border-amber-400 text-amber-300 text-[10px] font-extrabold uppercase">
                  MYSTERY NODE REWARD UNLOCKED
                </span>
                <h3 className="text-2xl font-black text-white font-sans uppercase mt-2">
                  {mysteryReward.title}
                </h3>
                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  {mysteryReward.detail}
                </p>
              </div>

              <button
                onClick={() => setMysteryReward(null)}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-black font-extrabold font-mono text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_25px_rgba(245,158,11,0.8)] cursor-pointer"
              >
                CLAIM REWARD & CONTINUE
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
