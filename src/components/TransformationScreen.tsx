import { motion } from "motion/react";
import { ArrowRight, Sparkles, CheckCircle2, Flame, Heart, Target, Compass, Zap, ShieldCheck } from "lucide-react";
import { StudentProfile } from "../types";

interface TransformationScreenProps {
  profile: StudentProfile;
  onEnter: () => void;
}

export default function TransformationScreen({ profile, onEnter }: TransformationScreenProps) {
  const nameToDisplay = profile.name && profile.name.trim() !== "" ? profile.name : "Student";
  const roleToDisplay = profile.becoming && profile.becoming.trim() !== "" ? profile.becoming : "Software Developer";

  // Synthesize emotional & purposeful values from profile
  const coreDriveText = profile.coreDrive || "Unstoppable Skill Mastery & Career Freedom";
  const dreamText = profile.dream || "Cracking Top SDE Roles & Building Exceptional Tech";
  const legacyText = profile.fear || "Leaving an Undeniable Legacy of Growth";
  const mindsetText = profile.firstVictory || "Consistent Daily Progress";
  const prideText = profile.stoppedBy || "Proving What You Are Capable Of";

  return (
    <div className="relative min-h-screen w-full bg-black text-white flex flex-col justify-between items-center overflow-x-hidden px-4 sm:px-6 py-8 font-sans select-none">
      {/* Background Matrix & Subtle Glow */}
      <div className="absolute inset-0 grid-background opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-red-600/15 rounded-full blur-[180px] pointer-events-none" />

      {/* MAIN CENTER CONTENT AREA */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center my-auto py-2 space-y-6">
        
        {/* Text Header */}
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 font-mono text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.3)]">
            <Sparkles className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span>100% PROFILE SYNCHRONIZED</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-sans pt-1">
            Mission Ready.
          </h1>

          <p className="text-zinc-300 font-medium text-base sm:text-lg">
            Callsign <span className="text-white font-bold">{nameToDisplay}</span> //{" "}
            <span className="text-red-500 font-bold tracking-wide drop-shadow-[0_0_12px_rgba(239,68,68,0.6)]">
              Future {roleToDisplay}
            </span>
          </p>
        </div>

        {/* EMOTIONAL & MOTIVATIONAL PROFILE SYNTHESIS CARD */}
        <div className="relative w-full bg-zinc-950/90 border-2 border-red-500/40 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_60px_rgba(239,68,68,0.2)] text-left space-y-6 overflow-hidden">
          
          {/* Subtle Grid background inside card */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:28px_28px] opacity-30 pointer-events-none" />

          {/* Header Tag */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-red-950/80 border border-red-500/50 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                <Heart className="w-5 h-5" />
              </span>
              <div>
                <h2 className="font-mono text-sm sm:text-base text-red-500 font-extrabold uppercase tracking-wider">
                  SIM COGNITIVE SYNTHESIS & PURPOSE
                </h2>
                <p className="text-zinc-400 text-xs font-sans">
                  Deeply understood from your 9 core reflection answers.
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-zinc-900 border border-red-500/30 font-mono text-[11px] text-red-400 font-bold flex items-center gap-1.5 self-start sm:self-auto">
              <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
              <span>ALIGNMENT COMPLETE</span>
            </span>
          </div>

          {/* Emotional & Purposeful Paragraph */}
          <div className="relative z-10 space-y-4 font-sans leading-relaxed text-zinc-200">
            <p className="text-base sm:text-lg font-medium text-white">
              SIM has deeply analyzed your mind, your motivations, and your honest reflections. You are not here to pass time—you are driven to become an exceptional <strong className="text-red-400 font-bold">{roleToDisplay}</strong>. You have recognized what held you back in the past, and you have made a decisive choice to never accept stagnation again.
            </p>

            <p className="text-sm sm:text-base text-zinc-300">
              Your core drive—<strong className="text-white font-semibold">{coreDriveText}</strong>—is anchored by your desire for <strong className="text-white font-semibold">{dreamText}</strong> and your refusal to leave your potential unfulfilled (<strong className="text-white font-semibold">{prideText}</strong>). You understand that real growth happens when you show up every day with <strong className="text-red-400 font-semibold">{mindsetText}</strong>.
            </p>

            {/* Glowing SIM Purpose Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-red-950/60 via-zinc-900/90 to-red-950/60 border-2 border-red-500/60 shadow-[0_0_30px_rgba(239,68,68,0.25)] space-y-2 text-center my-2">
              <div className="flex items-center justify-center gap-2 text-red-400 font-mono text-xs font-extrabold uppercase tracking-widest">
                <Flame className="w-4 h-4 fill-red-500 text-red-500 animate-bounce" />
                <span>SIM BELIEF & UNSTOPPABLE PURPOSE</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-white leading-snug">
                You possess all the passion, cognitive capability, and mental strength required to transform your vision into reality. Every single milestone you complete on SIM is built around your unique strengths. <span className="text-red-400 underline underline-offset-4 font-black">YOU CAN DEFINITELY ACCOMPLISH THIS MISSION!</span>
              </p>
            </div>
          </div>

          {/* 4 Synthesis Key Pillar Cards */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs pt-2">
            <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-red-500/30 space-y-1">
              <span className="text-[10px] text-zinc-500 font-bold block uppercase flex items-center gap-1">
                <Target className="w-3 h-3 text-red-400" />
                TARGET ROLE
              </span>
              <span className="text-white font-extrabold block truncate">{roleToDisplay}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-red-500/30 space-y-1">
              <span className="text-[10px] text-zinc-500 font-bold block uppercase flex items-center gap-1">
                <Zap className="w-3 h-3 text-red-400" />
                CORE DRIVE
              </span>
              <span className="text-red-400 font-extrabold block truncate">{coreDriveText}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-red-500/30 space-y-1">
              <span className="text-[10px] text-zinc-500 font-bold block uppercase flex items-center gap-1">
                <Compass className="w-3 h-3 text-red-400" />
                DREAM VISION
              </span>
              <span className="text-white font-extrabold block truncate">{dreamText}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-red-500/30 space-y-1">
              <span className="text-[10px] text-zinc-500 font-bold block uppercase flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-red-400" />
                CAPABILITY
              </span>
              <span className="text-red-400 font-extrabold block truncate">100% READY TO WIN</span>
            </div>
          </div>

        </div>

        {/* LETS GO CALL TO ACTION BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-2 flex flex-col items-center justify-center relative"
        >
          <button
            onClick={onEnter}
            className="group relative inline-flex items-center justify-center gap-3 px-16 py-4 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white font-extrabold text-base tracking-wider uppercase shadow-[0_0_40px_rgba(239,68,68,0.7)] hover:shadow-[0_0_60px_rgba(239,68,68,0.95)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span>LETS GO</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>

          {/* Sparkle graphic */}
          <Sparkles className="absolute -right-10 bottom-1 w-6 h-6 text-red-500 animate-pulse pointer-events-none" />
        </motion.div>
      </div>

      {/* BOTTOM QUOTE FOOTER */}
      <div className="relative z-10 font-mono text-[11px] text-zinc-500 italic text-center pb-2 tracking-wide">
        "I sent my future self to say: I never gave up."
      </div>
    </div>
  );
}
