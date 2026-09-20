import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Flame, Hammer, Activity } from "lucide-react";

interface ForgeAnimationProps {
  onComplete: () => void;
}

export default function ForgeAnimation({ onComplete }: ForgeAnimationProps) {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  const texts = [
    "Analyzing your decisions...",
    "Understanding your habits...",
    "Measuring your momentum...",
    "Building your AI companion...",
    "Forging your mission...",
    "Creating your future..."
  ];

  useEffect(() => {
    // Progress increment over 7 seconds (7000ms)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 70);

    // Text rotation
    const textInterval = setInterval(() => {
      setTextIndex((prev) => {
        if (prev < texts.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1100);

    // Completion timeout at 7.5 seconds
    const timeout = setTimeout(() => {
      onComplete();
    }, 7500);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col justify-center items-center overflow-hidden px-4">
      {/* Dynamic scanlines and grid */}
      <div className="absolute inset-0 grid-background opacity-20 z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />

      {/* Cybernetic crack paths (SVGs with animated dashoffsets) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70">
        <motion.path
          d="M 0,0 L 400,300 L 500,500 L 800,900"
          stroke="rgba(239, 68, 68, 0.4)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress / 100 }}
          transition={{ duration: 7, ease: "linear" }}
        />
        <motion.path
          d="M 1920,0 L 1500,400 L 1200,600 L 900,1080"
          stroke="rgba(220, 38, 38, 0.4)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress / 100 }}
          transition={{ duration: 7, ease: "linear" }}
        />
        <motion.path
          d="M 0,1080 L 300,800 L 700,500 L 1920,500"
          stroke="rgba(239, 68, 68, 0.3)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress / 100 }}
          transition={{ duration: 7, ease: "linear" }}
        />
      </svg>

      {/* Hot central forge glow */}
      <motion.div
        className="absolute w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full filter blur-[80px]"
        animate={{
          backgroundColor: progress < 50 ? "rgba(239, 68, 68, 0.2)" : progress < 85 ? "rgba(220, 38, 38, 0.25)" : "rgba(185, 28, 28, 0.3)",
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main forge animation content */}
      <div className="relative z-10 flex flex-col items-center max-w-lg text-center space-y-12">
        {/* Animated icon indicator */}
        <div className="relative">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 15, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
            className="flex items-center justify-center w-20 h-20 rounded-full border border-red-900/80 bg-zinc-950 text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.25)]"
          >
            {progress < 40 ? (
              <Cpu className="w-8 h-8 animate-pulse text-red-500" />
            ) : progress < 75 ? (
              <Hammer className="w-8 h-8 text-red-400" />
            ) : (
              <Flame className="w-8 h-8 text-red-500" />
            )}
          </motion.div>

          {/* Spark Particles */}
          {progress > 10 && progress < 90 && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>
            </div>
          )}
        </div>

        {/* Forge loading progress status */}
        <div className="space-y-4 w-full px-6">
          <div className="flex items-center justify-between font-mono text-xs tracking-wider text-zinc-500">
            <span>FORGE_CORE_ENGAGED</span>
            <span className="text-white font-medium">{progress}%</span>
          </div>

          {/* Futuristic track progress bar */}
          <div className="h-[2px] w-full bg-zinc-900 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-red-600 via-red-500 to-red-400 shadow-[0_0_15px_#ef4444]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Dynamic loading text */}
        <div className="h-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={textIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center gap-2 font-mono text-sm font-semibold tracking-widest uppercase text-zinc-400"
            >
              <Activity className="w-4 h-4 text-red-500 animate-pulse" />
              {texts[textIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Minimalist debug specs */}
      <div className="absolute bottom-6 left-6 font-mono text-[9px] text-zinc-700 space-y-1 select-none hidden md:block">
        <div>SYS_MATRIX: OK</div>
        <div>MOMENTUM_VECTOR: CALIBRATING...</div>
        <div>JARVIS_COGNITIVE: INGESTING...</div>
      </div>
    </div>
  );
}
