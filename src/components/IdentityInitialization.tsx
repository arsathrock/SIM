import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, ShieldAlert, Cpu, Award, Zap, Compass, Flame, Bot, Clock, Sparkles, RefreshCw, Crosshair, Target, Swords, Trophy, Shield, Radio, Crown } from "lucide-react";
import { StudentProfile } from "../types";
import IdentityTransitionOverlay from "./IdentityTransitionOverlay";

interface IdentityInitializationProps {
  onComplete: (profile: StudentProfile) => void;
}

export default function IdentityInitialization({ onComplete }: IdentityInitializationProps) {
  const [step, setStep] = useState<number>(0); // Step 0 is Name, Steps 1-9 are the 9 questions
  const [name, setName] = useState<string>("");
  const [becoming, setBecoming] = useState<string>("");
  const [fear, setFear] = useState<string>("");
  const [stoppedBy, setStoppedBy] = useState<string>("");
  const [studentType, setStudentType] = useState<string>("");
  const [realizationTrigger, setRealizationTrigger] = useState<string>("");
  const [dream, setDream] = useState<string>("");
  const [quote, setQuote] = useState<string>("");
  const [firstVictory, setFirstVictory] = useState<string>("");
  const [coreDrive, setCoreDrive] = useState<string>("");
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isAdvancing, setIsAdvancing] = useState<boolean>(false);

  // 10-Second Mindful Timer State & Robot Check-in
  const [timerProgress, setTimerProgress] = useState<number>(0);
  const [showRobotBubble, setShowRobotBubble] = useState<boolean>(false);
  const [langIndex, setLangIndex] = useState<number>(0);

  const LANGUAGE_PHRASES = [
    { lang: "Tamil", text: "ENNA ACHU PAA?" },
    { lang: "English", text: "WHAT HAPPENED?" },
    { lang: "Hindi", text: "KYA HUA?" },
    { lang: "Malayalam", text: "ENTHU PATTI?" },
    { lang: "Telugu", text: "EMI AINDHI?" },
  ];

  useEffect(() => {
    const langInterval = setInterval(() => {
      setLangIndex((prev) => (prev + 1) % LANGUAGE_PHRASES.length);
    }, 1600);
    return () => clearInterval(langInterval);
  }, [LANGUAGE_PHRASES.length]);

  const dismissBubbleIfActive = () => {
    if (showRobotBubble) {
      setShowRobotBubble(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && isStepValid() && !isAdvancing) {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step, isAdvancing, name, becoming, fear, stoppedBy, studentType, realizationTrigger, dream, quote, firstVictory, coreDrive]);

  useEffect(() => {
    setTimerProgress(0);
    setShowRobotBubble(false);
    setIsAdvancing(false);

    const startTime = Date.now();
    const duration = 10000; // 10 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, (elapsed / duration) * 100);
      setTimerProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setShowRobotBubble(true);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [step]);

  const getProfile = (): StudentProfile => ({
    name: name.trim() || "Arsath",
    becoming: becoming || "Full Stack Developer",
    fear: fear || "He changed technology.",
    stoppedBy: stoppedBy || "He's finally financially free.",
    studentType: studentType || "The one who never tried.",
    realizationTrigger: realizationTrigger || "Failure.",
    dream: dream || "Overthinking",
    quote: quote || "He is trying.",
    firstVictory: firstVictory || "Build my first project.",
    coreDrive: coreDrive || "I want purpose.",
  });

  const handleNext = () => {
    if (isAdvancing) return;
    if (step === 0 && !name.trim()) return;
    if (!isStepValid()) return;

    setIsAdvancing(true);
    dismissBubbleIfActive();

    setTimeout(() => {
      if (step < 9) {
        setStep((prev) => prev + 1);
      } else {
        setIsTransitioning(true);
      }
    }, 550); // Slow & smooth deliberate transition delay for Enter trigger
  };

  const handleOptionSelect = (setter: (val: string) => void, val: string) => {
    if (isAdvancing) return;
    setter(val);
    dismissBubbleIfActive();
    setIsAdvancing(true);

    setTimeout(() => {
      if (step < 9) {
        setStep((prev) => prev + 1);
      } else {
        setIsTransitioning(true);
      }
    }, 500); // Smooth relaxed pace after choosing an option
  };

  const handleFinishTransition = () => {
    onComplete(getProfile());
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  // 1. Expanded Career Field Options
  const becomingOptions = [
    { label: "AI Engineer", icon: Cpu, desc: "Building the intelligence of tomorrow" },
    { label: "Software Engineer", icon: Zap, desc: "Developing bulletproof complex systems" },
    { label: "Full Stack Developer", icon: Flame, desc: "Crafting end-to-end user experiences" },
    { label: "Cybersecurity Engineer", icon: ShieldAlert, desc: "Securing systems from cyber threats" },
    { label: "Cloud & DevOps Architect", icon: Radio, desc: "Scaling cloud infrastructure globally" },
    { label: "Data Scientist & Analytics", icon: Target, desc: "Extracting deep intelligence from big data" },
    { label: "Mobile App Specialist", icon: Crosshair, desc: "Crafting iOS & Android applications" },
    { label: "Entrepreneur & Founder", icon: Compass, desc: "Creating novel products & startups" },
    { label: "Scientific Researcher", icon: Award, desc: "Advancing global scientific frontiers" },
    { label: "Game Systems Engineer", icon: Swords, desc: "Engineering interactive graphics engines" },
    { label: "Product Lead & Designer", icon: Crown, desc: "Designing human-centric digital tools" },
    { label: "Still Exploring", icon: Compass, desc: "Searching for my true alignment" },
  ];

  // 2. Remember Name Options
  const rememberNameOptions = [
    "He changed technology.",
    "He changed his family's life.",
    "He built something impossible.",
    "He inspired people.",
    "I don't know yet.",
  ];

  // 3. Mother's Smile (Pride & Vision) Options
  const motherSmileOptions = [
    "He's finally financially free.",
    "He built his own company.",
    "He works at my dream company.",
    "He's doing what he loves.",
    "I never thought about this.",
  ];

  // 4. Fear of Stagnation Options
  const fearVersionOptions = [
    "The one who never tried.",
    "The one who gave up.",
    "The one who wasted time.",
    "The one who blamed everyone.",
    "The one who stayed average.",
  ];

  // 5. Avoided Friction Options
  const avoidingOptions = [
    "Failure.",
    "Judgement.",
    "Hard work.",
    "Responsibility.",
    "I honestly don't know.",
  ];

  // 6. Nightly Distractions Options
  const nightlyDistractionsOptions = [
    "Instagram",
    "YouTube",
    "Gaming",
    "Sleep",
    "Overthinking",
    "Friends",
    "Laziness",
    "Fear",
  ];

  // 7. External Perspective Options
  const externalPerspectiveOptions = [
    "He is trying.",
    "He keeps delaying.",
    "He has potential.",
    "He is completely lost.",
    "He needs direction.",
  ];

  // 8. First Victory Threshold Options
  const firstVictoryOptions = [
    "Attend every class.",
    "Finish one coding problem.",
    "Stop wasting time.",
    "Wake up before 7.",
    "Build my first project.",
  ];

  // 9. Core Drive Options
  const coreDriveOptions = [
    "I want a comeback.",
    "I want discipline.",
    "I want confidence.",
    "I want purpose.",
    "I want to prove everyone wrong.",
    "I want to prove myself wrong.",
  ];

  const isStepValid = () => {
    if (step === 0) return name.trim().length > 0;
    if (step === 1) return becoming !== "";
    if (step === 2) return fear !== "";
    if (step === 3) return stoppedBy !== "";
    if (step === 4) return studentType !== "";
    if (step === 5) return realizationTrigger !== "";
    if (step === 6) return dream !== "";
    if (step === 7) return quote !== "";
    if (step === 8) return firstVictory !== "";
    if (step === 9) return coreDrive !== "";
    return false;
  };

  return (
    <div className="relative min-h-screen bg-black flex flex-col justify-between items-center py-8 px-4 overflow-hidden font-sans">
      {/* Background Grids */}
      <div className="absolute inset-0 grid-background z-0" />
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] rounded-full bg-purple-600/5 blur-[80px]" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-red-600/10 blur-[80px]" />

      {/* Header section with telemetry bar */}
      <div className="relative z-10 w-full max-w-4xl flex items-center justify-between border-b border-zinc-900 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <span className="font-mono text-xs tracking-widest text-zinc-400 uppercase flex items-center gap-2 flex-wrap">
            <span>SIM // MISSION INITIALIZATION</span>
            {becoming && (
              <span className="bg-red-950/90 text-red-300 border border-red-500/50 px-2.5 py-0.5 rounded text-[10px] font-bold shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                CLASS: {becoming.toUpperCase()}
              </span>
            )}
          </span>
        </div>
        {step > 0 && (
          <div className="font-mono text-xs text-red-400 font-bold bg-zinc-900/90 border border-red-500/30 px-3 py-1 rounded-full flex items-center gap-2 shadow-[0_0_12px_rgba(239,68,68,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
            <span>ACTION ZONE 0{step} / 09</span>
          </div>
        )}
      </div>

      {/* Main interactive form card in Glass Frame with 10s Filling Border */}
      <div className="relative z-10 w-full max-w-2xl my-auto py-6 flex flex-col items-center">
        {/* White Cloud Box Speech Bubble */}
        <AnimatePresence>
          {showRobotBubble && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.85 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              onClick={() => {
                setShowRobotBubble(false);
                setTimerProgress(0);
              }}
              className="mb-3 relative bg-white border-2 border-black text-black rounded-3xl px-5 py-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.6)] text-left z-30 cursor-pointer hover:scale-105 transition-all inline-flex items-center gap-2.5 max-w-fit"
              title="Click to reset timer"
            >
              <div className="absolute -bottom-2.5 left-8 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-black" />
              <div className="absolute -bottom-[7px] left-[33px] w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[9px] border-t-white" />

              <div className="p-1 rounded-xl bg-black text-white shrink-0 animate-bounce">
                <Bot className="w-4 h-4" />
              </div>

              <div className="flex items-center gap-2 overflow-hidden min-w-[170px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={langIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.35 }}
                    className="text-sm sm:text-base font-extrabold font-sans text-black tracking-wide"
                  >
                    {LANGUAGE_PHRASES[langIndex].text}
                  </motion.span>
                </AnimatePresence>
                <span className="text-[9px] font-mono font-bold text-zinc-500 bg-zinc-100 border border-zinc-300 px-1.5 py-0.5 rounded-full uppercase ml-auto">
                  {LANGUAGE_PHRASES[langIndex].lang}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative w-full p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-2xl shadow-[0_0_60px_rgba(239,68,68,0.15)] transition-all duration-500 overflow-hidden">
          {/* Animated Glowing SVG Border stroke filling over 10s */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl z-10">
            <rect
              x="2"
              y="2"
              width="calc(100% - 4px)"
              height="calc(100% - 4px)"
              rx="22"
              fill="none"
              stroke="url(#timer-glow-gradient)"
              strokeWidth="3"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset={100 - timerProgress}
              className="transition-all duration-100 ease-linear"
            />
            <defs>
              <linearGradient id="timer-glow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>
            </defs>
          </svg>

          {/* Top Status Header inside Glass Frame */}
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/5 relative z-20">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "6s" }} />
              </div>
              <span className="font-mono text-xs text-zinc-300 font-medium tracking-wide">
                10s Mindful Timer
              </span>
            </div>
            <div className="font-mono text-xs text-red-300 font-bold bg-red-950/70 border border-red-500/40 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.25)]">
              {Math.max(0, (10 - timerProgress / 10)).toFixed(1)}s
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* STEP 0: NAME ENTRY */}
            {step === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, y: -45, scale: 0.93 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 45, scale: 0.93 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 bg-red-950/80 border border-red-500/40 px-3 py-1 rounded-full text-red-400 font-mono text-[10px] font-bold tracking-widest uppercase shadow-[0_0_12px_rgba(239,68,68,0.25)]">
                  <Crosshair className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "8s" }} />
                  <span>CALLSIGN IDENTITY</span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-3xl md:text-4xl font-display font-medium text-white">
                    Establish Credentials
                  </h2>
                  <p className="text-zinc-400 font-light leading-relaxed">
                    Enter your callsign to unlock security clearance and initiate squad deployment.
                  </p>
                </div>

                <div className="relative">
                  <input
                    id="name-input"
                    type="text"
                    maxLength={25}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      dismissBubbleIfActive();
                    }}
                    placeholder="Enter your name..."
                    className="w-full px-6 py-5 rounded-xl bg-zinc-950 border border-zinc-800 text-white font-display text-2xl focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all font-medium placeholder-zinc-700 tracking-wide"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && name.trim()) handleNext();
                    }}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[10px] text-red-400 font-bold">
                    CALLSIGN_REQ
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 1: CAREER FIELD QUESTION */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 bg-purple-950/80 border border-purple-500/40 px-3 py-1 rounded-full text-purple-300 font-mono text-[10px] font-bold tracking-widest uppercase shadow-[0_0_12px_rgba(168,85,247,0.25)]">
                  <Swords className="w-3.5 h-3.5 text-purple-400" />
                  <span>ACTION ZONE 01 // CAREER CLASS ALIGNMENT</span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-3xl font-display font-medium text-white flex items-center gap-3">
                    Who are you becoming?
                  </h2>
                  <p className="text-zinc-400 font-light text-sm">
                    Select your primary battle class. All future roadmap nodes will adapt to this choice.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
                  {becomingOptions.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = becoming === opt.label;
                    return (
                      <button
                        key={opt.label}
                        onClick={() => handleOptionSelect(setBecoming, opt.label)}
                        className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all duration-300 relative cursor-pointer group ${
                          isSelected
                            ? "bg-red-500/10 border-red-500/60 text-white shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                            : "bg-zinc-950 border-zinc-900 text-zinc-400 hover:border-zinc-800 hover:bg-zinc-900/50 hover:text-zinc-200"
                        }`}
                      >
                        <div className={`p-2 rounded-lg border transition-colors shrink-0 mt-0.5 ${
                          isSelected
                            ? "bg-red-500/20 border-red-400/30 text-red-400"
                            : "bg-zinc-900 border-zinc-800 text-zinc-500 group-hover:text-zinc-300"
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-medium text-sm text-zinc-100 flex items-center gap-2">
                            {opt.label}
                            {isSelected && <span className="text-[8px] font-mono font-bold bg-red-500 text-black px-1.5 py-0.2 rounded uppercase">SELECTED</span>}
                          </div>
                          <div className="text-[11px] text-zinc-500 mt-0.5 leading-snug">{opt.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 2: REMEMBER YOUR NAME */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 bg-red-950/80 border border-red-500/40 px-3 py-1 rounded-full text-red-300 font-mono text-[10px] font-bold tracking-widest uppercase">
                  <Trophy className="w-3.5 h-3.5 text-red-400" />
                  <span>ACTION ZONE 02 // LEGACY VECTOR</span>
                </div>

                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-display font-medium text-white">
                    When people remember your name... what do you want them to remember?
                  </h2>
                  <p className="text-zinc-400 font-light text-xs">
                    Define the core mark you intend to leave on the world.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {rememberNameOptions.map((opt) => {
                    const isSelected = fear === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleOptionSelect(setFear, opt)}
                        className={`p-4 rounded-xl border font-medium text-left transition-all duration-300 cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-purple-500/15 border-purple-500/60 text-white shadow-[0_0_20px_rgba(168,85,247,0.25)]"
                            : "bg-zinc-950 border-zinc-900 text-zinc-400 hover:border-zinc-800 hover:bg-zinc-900/50 hover:text-zinc-200"
                        }`}
                      >
                        <span className="text-sm font-medium">{opt}</span>
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,1)]" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 3: MOTHER'S SMILE (PRIDE & VISION) */}
            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full text-emerald-300 font-mono text-[10px] font-bold tracking-widest uppercase">
                  <Crown className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ACTION ZONE 03 // PRIDE & VISION</span>
                </div>

                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-display font-medium text-white">
                    Imagine it's 10 years later. Your mother introduces you to someone. What makes her smile the most?
                  </h2>
                  <p className="text-zinc-400 font-light text-xs">
                    Visualizing the moment of deep family pride.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {motherSmileOptions.map((opt) => {
                    const isSelected = stoppedBy === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleOptionSelect(setStoppedBy, opt)}
                        className={`p-4 rounded-xl border font-medium text-left transition-all duration-300 cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-emerald-500/15 border-emerald-500/60 text-white shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                            : "bg-zinc-950 border-zinc-900 text-zinc-400 hover:border-zinc-800 hover:bg-zinc-900/50 hover:text-zinc-200"
                        }`}
                      >
                        <span className="text-sm font-medium">{opt}</span>
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,1)]" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 4: FEAR OF STAGNATION */}
            {step === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 bg-red-950/80 border border-red-500/40 px-3 py-1 rounded-full text-red-300 font-mono text-[10px] font-bold tracking-widest uppercase">
                  <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                  <span>ACTION ZONE 04 // FEAR OF STAGNATION</span>
                </div>

                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-display font-medium text-white">
                    Which version of yourself scares you the most?
                  </h2>
                  <p className="text-zinc-400 font-light text-xs">
                    Identifying the timeline you are actively fighting against.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {fearVersionOptions.map((opt) => {
                    const isSelected = studentType === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleOptionSelect(setStudentType, opt)}
                        className={`p-4 rounded-xl border font-medium text-left transition-all duration-300 cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-red-500/15 border-red-500/60 text-white shadow-[0_0_20px_rgba(239,68,68,0.25)]"
                            : "bg-zinc-950 border-zinc-900 text-zinc-400 hover:border-zinc-800 hover:bg-zinc-900/50 hover:text-zinc-200"
                        }`}
                      >
                        <span className="text-sm font-medium">{opt}</span>
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-red-400 shadow-[0_0_10px_rgba(239,68,68,1)]" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 5: AVOIDED FRICTION */}
            {step === 5 && (
              <motion.div
                key="step-5"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 bg-amber-950/80 border border-amber-500/40 px-3 py-1 rounded-full text-amber-300 font-mono text-[10px] font-bold tracking-widest uppercase">
                  <Target className="w-3.5 h-3.5 text-amber-400" />
                  <span>ACTION ZONE 05 // AVOIDED FRICTION</span>
                </div>

                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-display font-medium text-white">
                    When you skip something... what are you really avoiding?
                  </h2>
                  <p className="text-zinc-400 font-light text-xs">
                    Pinpointing the psychological friction point.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {avoidingOptions.map((opt) => {
                    const isSelected = realizationTrigger === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleOptionSelect(setRealizationTrigger, opt)}
                        className={`p-4 rounded-xl border font-medium text-left transition-all duration-300 cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-amber-500/15 border-amber-500/60 text-white shadow-[0_0_20px_rgba(245,158,11,0.25)]"
                            : "bg-zinc-950 border-zinc-900 text-zinc-400 hover:border-zinc-800 hover:bg-zinc-900/50 hover:text-zinc-200"
                        }`}
                      >
                        <span className="text-sm font-medium">{opt}</span>
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,1)]" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 6: NIGHTLY DISTRACTIONS */}
            {step === 6 && (
              <motion.div
                key="step-6"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 bg-purple-950/80 border border-purple-500/40 px-3 py-1 rounded-full text-purple-300 font-mono text-[10px] font-bold tracking-widest uppercase">
                  <Radio className="w-3.5 h-3.5 text-purple-400" />
                  <span>ACTION ZONE 06 // NIGHTLY DISTRACTIONS</span>
                </div>

                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-display font-medium text-white">
                    Be honest. Who wins most nights?
                  </h2>
                  <p className="text-zinc-400 font-light text-xs">
                    Mapping the primary consumer of your evening potential.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {nightlyDistractionsOptions.map((opt) => {
                    const isSelected = dream === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleOptionSelect(setDream, opt)}
                        className={`p-3.5 rounded-xl border font-medium text-center transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? "bg-red-500/15 border-red-500/60 text-white shadow-[0_0_20px_rgba(239,68,68,0.25)]"
                            : "bg-zinc-950 border-zinc-900 text-zinc-400 hover:border-zinc-800 hover:bg-zinc-900/50 hover:text-zinc-200"
                        }`}
                      >
                        <span className="text-sm font-medium">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 7: EXTERNAL PERSPECTIVE */}
            {step === 7 && (
              <motion.div
                key="step-7"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 bg-red-950/80 border border-red-500/40 px-3 py-1 rounded-full text-red-300 font-mono text-[10px] font-bold tracking-widest uppercase">
                  <Crosshair className="w-3.5 h-3.5 text-red-400" />
                  <span>ACTION ZONE 07 // EXTERNAL PERSPECTIVE</span>
                </div>

                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-display font-medium text-white">
                    If someone secretly watched your last 30 days... what would they say?
                  </h2>
                  <p className="text-zinc-400 font-light text-xs">
                    Objective diagnostic evaluation of recent momentum.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {externalPerspectiveOptions.map((opt) => {
                    const isSelected = quote === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleOptionSelect(setQuote, opt)}
                        className={`p-4 rounded-xl border font-medium text-left transition-all duration-300 cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-red-500/15 border-red-500/60 text-white shadow-[0_0_20px_rgba(239,68,68,0.25)]"
                            : "bg-zinc-950 border-zinc-900 text-zinc-400 hover:border-zinc-800 hover:bg-zinc-900/50 hover:text-zinc-200"
                        }`}
                      >
                        <span className="text-sm font-medium">{opt}</span>
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,1)]" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 8: FIRST VICTORY THRESHOLD */}
            {step === 8 && (
              <motion.div
                key="step-8"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full text-emerald-300 font-mono text-[10px] font-bold tracking-widest uppercase">
                  <Trophy className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ACTION ZONE 08 // FIRST VICTORY THRESHOLD</span>
                </div>

                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-display font-medium text-white">
                    If tomorrow you completely changed... what would your first victory be?
                  </h2>
                  <p className="text-zinc-400 font-light text-xs">
                    Locking in your immediate high-leverage objective.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {firstVictoryOptions.map((opt) => {
                    const isSelected = firstVictory === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleOptionSelect(setFirstVictory, opt)}
                        className={`p-4 rounded-xl border font-medium text-left transition-all duration-300 cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-emerald-500/15 border-emerald-500/60 text-white shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                            : "bg-zinc-950 border-zinc-900 text-zinc-400 hover:border-zinc-800 hover:bg-zinc-900/50 hover:text-zinc-200"
                        }`}
                      >
                        <span className="text-sm font-medium">{opt}</span>
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,1)]" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 9: CORE DRIVE */}
            {step === 9 && (
              <motion.div
                key="step-9"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 bg-purple-950/80 border border-purple-500/40 px-3 py-1 rounded-full text-purple-300 font-mono text-[10px] font-bold tracking-widest uppercase">
                  <Flame className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                  <span>ACTION ZONE 09 // CORE DRIVE & MOTTO</span>
                </div>

                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-display font-medium text-white">
                    Which sentence feels true?
                  </h2>
                  <p className="text-zinc-400 font-light text-xs">
                    Sealing your intrinsic fuel source.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {coreDriveOptions.map((opt) => {
                    const isSelected = coreDrive === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleOptionSelect(setCoreDrive, opt)}
                        className={`p-4 rounded-xl border font-medium text-left transition-all duration-300 cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-purple-500/15 border-purple-500/60 text-white shadow-[0_0_20px_rgba(168,85,247,0.25)]"
                            : "bg-zinc-950 border-zinc-900 text-zinc-400 hover:border-zinc-800 hover:bg-zinc-900/50 hover:text-zinc-200"
                        }`}
                      >
                        <span className="text-sm font-medium italic">"{opt}"</span>
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,1)]" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation action buttons at the bottom */}
      <div className="relative z-10 w-full max-w-4xl flex items-center justify-between border-t border-zinc-900 pt-6">
        <button
          onClick={handleBack}
          disabled={step === 0}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-800 text-xs text-zinc-400 font-mono transition-all duration-300 ${
            step === 0
              ? "opacity-30 cursor-not-allowed"
              : "hover:bg-zinc-950 hover:text-white cursor-pointer"
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          GO_BACK
        </button>

        <button
          onClick={handleNext}
          disabled={!isStepValid() || isAdvancing}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-all duration-300 ${
            isAdvancing
              ? "bg-red-500 text-white font-bold animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.6)] cursor-wait"
              : isStepValid()
              ? "bg-red-600 text-white hover:bg-red-500 hover:scale-105 active:scale-98 cursor-pointer font-bold shadow-[0_0_20px_rgba(239,68,68,0.4)]"
              : "bg-zinc-900 text-zinc-600 border border-zinc-800/50 cursor-not-allowed"
          }`}
        >
          {isAdvancing ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>CONFIRMING [ENTER]...</span>
            </>
          ) : (
            <>
              <span>{step === 9 ? "FORGE IDENTITY" : "CONTINUE [ENTER]"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

      {/* Retro Shutter & Terminal Line-By-Line Transition Overlay */}
      {isTransitioning && (
        <IdentityTransitionOverlay profile={getProfile()} onFinish={handleFinishTransition} />
      )}
    </div>
  );
}
