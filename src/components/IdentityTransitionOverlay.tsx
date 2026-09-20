import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Crosshair, Shield, Zap, Sparkles, Flame, UserCheck, Radio, Target, ChevronRight, Cloud, Wind, Cpu } from "lucide-react";
import { StudentProfile } from "../types";

interface IdentityTransitionOverlayProps {
  onFinish: () => void;
  profile?: StudentProfile;
}

export default function IdentityTransitionOverlay({ onFinish, profile }: IdentityTransitionOverlayProps) {
  const [stage, setStage] = useState<"clouds" | "tunnel" | "profile" | "countdown" | "ready">("clouds");
  const [countdown, setCountdown] = useState(3);
  const [progress, setProgress] = useState(0);

  const playerName = profile?.name && profile.name.trim() ? profile.name.toUpperCase() : "ARSATH";
  const playerClass = profile?.becoming ? profile.becoming.toUpperCase() : "MOBILE APP SPECIALIST";

  useEffect(() => {
    // 1. Cloud Passing Transition (800ms)
    const cloudTimer = setTimeout(() => {
      setStage("tunnel");

      // Progress bar fill 0 -> 100%
      const progInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progInterval);
            return 100;
          }
          return prev + 5;
        });
      }, 25);

      // 2. Load Profile Hologram (1.2s)
      const profileTimer = setTimeout(() => {
        setStage("profile");

        // 3. Countdown 3..2..1 (1.2s)
        const countTimer = setTimeout(() => {
          setStage("countdown");

          let count = 3;
          const countdownInterval = setInterval(() => {
            count--;
            if (count > 0) {
              setCountdown(count);
            } else {
              clearInterval(countdownInterval);
              setStage("ready");

              // Final deployment drop
              setTimeout(() => {
                onFinish();
              }, 1000);
            }
          }, 600);

        }, 1400);

      }, 1200);

    }, 850);

    return () => clearTimeout(cloudTimer);
  }, []);

  // Allow clicking or pressing key to skip directly to finish
  const handleQuickDeploy = () => {
    onFinish();
  };

  useEffect(() => {
    const handleKeyDown = () => {
      handleQuickDeploy();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      onClick={handleQuickDeploy}
      className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center pointer-events-auto bg-black font-sans select-none cursor-pointer"
      title="Click or press any key to skip deployment"
    >
      {/* ================= STAGE 1: CLOUD PASSING TRANSITION ================= */}
      <AnimatePresence>
        {stage === "clouds" && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Atmospheric Moving Clouds Layer Left to Right */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 0.85, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-800/80 to-transparent blur-3xl pointer-events-none"
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "-100%" }}
              transition={{ duration: 0.85, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-red-900/60 to-transparent blur-2xl pointer-events-none"
            />

            {/* Cloud Icon & Fog Effect */}
            <div className="relative z-10 flex flex-col items-center space-y-3">
              <motion.div
                animate={{ scale: [0.9, 1.2, 1], opacity: [0.4, 0.9, 0.4] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="p-4 rounded-full bg-red-500/10 border border-red-400/30 text-red-400 shadow-[0_0_50px_rgba(239,68,68,0.5)]"
              >
                <Cloud className="w-12 h-12 animate-pulse" />
              </motion.div>
              <div className="flex items-center gap-2 text-red-300 font-mono text-sm tracking-widest font-bold uppercase">
                <Wind className="w-4 h-4 text-red-400 animate-spin" />
                <span>ATMOSPHERIC CLOUD BREAKTHROUGH...</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= STAGE 2+: FREE FIRE CYBER TUNNEL ARENA ================= */}
      {stage !== "clouds" && (
        <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-black">
          
          {/* Deep Space / Sci-Fi Tunnel Background Backdrop with Speed Streaks */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black z-0" />

          {/* Perspective Sci-Fi Cyber Grid Lines & Light Speed Streaks */}
          <div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_right,#ef4444_1px,transparent_1px),linear-gradient(to_bottom,#ef4444_1px,transparent_1px)] bg-[size:48px_48px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom pointer-events-none" />

          {/* Dynamic Laser Light Speed Streaks Passing by (Free Fire Speed FX) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: "-100%", y: `${15 * i + 10}%`, opacity: 0 }}
                animate={{ x: "200%", opacity: [0, 1, 0] }}
                transition={{
                  duration: 0.8 + (i % 3) * 0.2,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "linear",
                }}
                className="absolute h-[2px] w-[300px] bg-gradient-to-r from-transparent via-red-500 to-red-400 shadow-[0_0_15px_#ef4444]"
              />
            ))}
          </div>

          {/* Electric Ground Sparks Flying Effect */}
          <div className="absolute bottom-10 inset-x-0 h-32 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`spark-${i}`}
                initial={{ y: 0, x: `${i * 8 + 5}%`, opacity: 1, scale: 1 }}
                animate={{ y: -80, opacity: 0, scale: 0 }}
                transition={{
                  duration: 0.6 + (i % 4) * 0.2,
                  repeat: Infinity,
                  delay: (i % 5) * 0.12,
                  ease: "easeOut",
                }}
                className="absolute w-1.5 h-1.5 rounded-full bg-red-400 shadow-[0_0_10px_#ef4444]"
              />
            ))}
          </div>

          {/* Futuristic Soldier Silhouette Standing on Sci-Fi Hangar Platform */}
          <div className="absolute bottom-6 right-6 md:right-16 z-10 pointer-events-none flex flex-col items-center opacity-85">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Character Backlight Lens Flare */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-red-600/30 rounded-full blur-2xl" />
              {/* Character SVG Silhouette with Cyber Weapon */}
              <svg width="120" height="200" viewBox="0 0 100 170" fill="none" className="drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                {/* Head / Helmet */}
                <path d="M50 15 C58 15, 62 22, 60 30 C58 35, 42 35, 40 30 C38 22, 42 15, 50 15 Z" fill="#09090b" stroke="#ef4444" strokeWidth="1.5" />
                {/* Visor Glow */}
                <ellipse cx="51" cy="24" rx="6" ry="2" fill="#ef4444" className="animate-pulse" />
                {/* Torso & Armor */}
                <path d="M35 38 L65 38 L72 85 L28 85 Z" fill="#09090b" stroke="#ef4444" strokeWidth="1.5" />
                {/* Armor Chest Core */}
                <polygon points="50,45 56,55 44,55" fill="#ef4444" />
                {/* Sci-Fi Combat Rifle Held in Hand */}
                <path d="M62 55 L95 50 L98 56 L65 62 Z" fill="#18181b" stroke="#ef4444" strokeWidth="1" />
                <line x1="90" y1="52" x2="100" y2="52" stroke="#ef4444" strokeWidth="2" className="animate-pulse" />
                {/* Legs Standing */}
                <path d="M30 85 L22 155 L34 155 L45 85 Z" fill="#09090b" stroke="#27272a" strokeWidth="1.5" />
                <path d="M55 85 L66 155 L78 155 L70 85 Z" fill="#09090b" stroke="#27272a" strokeWidth="1.5" />
              </svg>
            </motion.div>
          </div>

          {/* MAIN HOLOGRAPHIC CYBER HUD CONTAINER */}
          <div className="relative z-20 w-full max-w-3xl px-4 sm:px-6 flex flex-col items-center justify-center text-center">
            
            {/* Top Bar Navigation HUD */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex items-center justify-between font-mono text-[11px] text-red-400 font-bold mb-3 px-2 border-b border-red-500/30 pb-2"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                <span>MATCHMAKING COMPLETE // ROOM #01</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-zinc-400">SYS_ID: <span className="text-white">2026-SIM</span></span>
                <span className="text-red-400 flex items-center gap-1">
                  <Zap className="w-3 h-3" /> PING: 12ms
                </span>
              </div>
            </motion.div>

            {/* Glowing Holographic Glass Box Frame */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full bg-zinc-950/85 border-2 border-red-500/70 rounded-2xl p-6 sm:p-10 backdrop-blur-xl shadow-[0_0_60px_rgba(239,68,68,0.35)] relative overflow-hidden flex flex-col items-center justify-center space-y-4"
            >
              {/* Corner Sci-Fi Bracket Accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-red-400" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-red-400" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-red-400" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-red-400" />

              {/* Verified Player Badge */}
              <div className="inline-flex items-center gap-2 bg-red-950/90 border border-red-400/60 px-4 py-1 rounded-full font-mono text-xs font-bold text-red-300 uppercase tracking-wider shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                <UserCheck className="w-3.5 h-3.5 text-red-400" />
                <span>PLAYER: {playerName} // VERIFIED</span>
              </div>

              {/* Main Glowing Career Title */}
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white font-sans uppercase drop-shadow-[0_0_25px_rgba(239,68,68,0.8)]">
                  FUTURE {playerClass}
                </h1>
                <p className="text-xs sm:text-sm text-red-200 font-mono tracking-wide max-w-lg mx-auto pt-2">
                  Combat loadout locked for <span className="text-red-400 font-bold">{playerName}</span>. Deploying to Mission Control...
                </p>
              </div>

              {/* Dynamic Loading / Countdown / Ready State inside Card */}
              <AnimatePresence mode="wait">
                {(stage === "tunnel" || stage === "profile") && (
                  <motion.div
                    key="progress"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full max-w-md pt-2 space-y-2"
                  >
                    <div className="w-full bg-zinc-900 border border-red-500/40 h-3 rounded-full p-0.5 overflow-hidden shadow-[0_0_12px_rgba(239,68,68,0.3)]">
                      <div
                        className="h-full bg-gradient-to-r from-red-600 via-red-500 to-red-400 rounded-full transition-all duration-75 shadow-[0_0_15px_#ef4444]"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center font-mono text-[10px] text-red-400 font-bold uppercase">
                      <span>SYNCHRONIZING LOADOUT...</span>
                      <span>{progress}%</span>
                    </div>
                  </motion.div>
                )}

                {stage === "countdown" && (
                  <motion.div
                    key="countdown"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    className="pt-2 flex flex-col items-center space-y-1"
                  >
                    <div className="font-mono text-[11px] text-red-400 tracking-widest font-bold uppercase">
                      DEPLOYMENT STARTING IN
                    </div>
                    <motion.div
                      key={countdown}
                      initial={{ scale: 0.3, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 350, damping: 15 }}
                      className="text-5xl font-black text-red-400 drop-shadow-[0_0_35px_rgba(239,68,68,0.9)] font-sans"
                    >
                      {countdown}
                    </motion.div>
                  </motion.div>
                )}

                {stage === "ready" && (
                  <motion.div
                    key="ready"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="pt-2"
                  >
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-red-600 text-white font-extrabold font-mono text-xs sm:text-sm tracking-widest shadow-[0_0_35px_rgba(239,68,68,0.9)] uppercase animate-pulse">
                      <Flame className="w-4 h-4 fill-white" />
                      <span>LAUNCH INITIATED // GO!</span>
                      <Sparkles className="w-4 h-4 fill-white" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Bottom Footer HUD Text */}
            <div className="w-full flex items-center justify-between font-mono text-[10px] text-red-400/80 tracking-widest uppercase mt-4 px-2">
              <span className="flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-red-400 animate-ping" />
                PRESS ANYKEY OR WAIT FOR AUTO DEPLOYMENT
              </span>
              <span className="bg-red-950/80 border border-red-500/40 px-2 py-0.5 rounded text-red-300 font-bold">
                LAUNCH INITIATED
              </span>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
