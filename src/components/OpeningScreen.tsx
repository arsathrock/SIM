import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap, Calendar, BarChart3, BookOpen, FileText, ArrowRight, X, Mail, Lock, ShieldCheck } from "lucide-react";

interface OpeningScreenProps {
  onBegin: () => void;
}

// Helper component to render 3D character image with true alpha transparency (stripping black backdrop)
function TransparentStudentAvatars({ src, alt }: { src: string; alt: string }) {
  const [processedSrc, setProcessedSrc] = React.useState<string | null>(null);

  React.useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Remove dark black/gray background pixels with smooth edge antialiasing
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = (r + g + b) / 3;

        if (brightness < 42) {
          if (brightness < 22) {
            data[i + 3] = 0;
          } else {
            data[i + 3] = Math.floor(((brightness - 22) / 20) * 255);
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      setProcessedSrc(canvas.toDataURL("image/png"));
    };
  }, [src]);

  return (
    <img
      src={processedSrc || src}
      alt={alt}
      referrerPolicy="no-referrer"
      className="w-full h-auto object-contain max-h-[720px] scale-135 sm:scale-150 lg:scale-165 filter drop-shadow-[0_25px_50px_rgba(239,68,68,0.5)] hover:scale-170 transition-transform duration-500 ease-out"
    />
  );
}

export default function OpeningScreen({ onBegin }: OpeningScreenProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Simple floating particle generator
  const particles = Array.from({ length: 18 });

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAuthModal(false);
    onBegin();
  };

  const handleGoogleAuth = () => {
    setShowAuthModal(false);
    onBegin();
  };

  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col overflow-hidden text-white font-sans selection:bg-red-500 selection:text-white">
      {/* Dynamic Red Tech-Grid Background */}
      <div className="absolute inset-0 grid-background opacity-20 pointer-events-none z-0" />

      {/* Atmospheric Glowing Red Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-red-600/15 blur-[120px] pointer-events-none animate-pulse duration-[6000ms]" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-red-900/20 blur-[130px] pointer-events-none animate-pulse duration-[8000ms]" />

      {/* Floating Red Particles */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-red-500 rounded-full"
          initial={{
            x: Math.random() * 1200 - 600,
            y: Math.random() * 800 - 400,
            opacity: Math.random() * 0.4 + 0.1,
            scale: Math.random() * 2 + 0.5,
          }}
          animate={{
            y: ["-400px", "400px"],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: Math.random() * 15 + 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Top Header Navigation Bar */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <img 
            src="/fav.png" 
            alt="Kalvium Logo" 
            className="w-9 h-9 rounded-lg border border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.5)] object-contain bg-white p-0.5" 
          />
          <span className="text-xl font-bold tracking-tight text-white font-display">
            Kalvium
          </span>
        </div>

        {/* Right CTA Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setAuthMode("login");
              setShowAuthModal(true);
            }}
            className="px-5 py-2 rounded-xl border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 text-sm font-medium transition-all cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => {
              setAuthMode("signup");
              setShowAuthModal(true);
            }}
            className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-semibold shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>Signup</span>
          </button>
        </div>
      </header>

      {/* Main Hero Container */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-6 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
        {/* Left Column: Text & CTAs */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Main Display Headline with SIM Icon */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-3"
          >


            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-[1.08] text-white">
              Welcome to <br />
              <span className="text-red-1000 drop-shadow-[0_0_35px_rgba(239,68,68,0.6)] flex items-center gap-3">
                SIM
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-base sm:text-xl text-zinc-400 max-w-xl font-normal leading-relaxed"
          >
            <strong className="text-red-500 font-semibold">Student Intelligence Momentum</strong>,{" "}
           in your learning journey.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <button
              id="begin-btn"
              onClick={() => {
                setAuthMode("login");
                setShowAuthModal(true);
              }}
              className="px-8 py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-base tracking-wide shadow-[0_0_35px_rgba(239,68,68,0.5)] hover:shadow-[0_0_50px_rgba(239,68,68,0.7)] transition-all cursor-pointer flex items-center gap-3 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Login & Begin</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                setAuthMode("signup");
                setShowAuthModal(true);
              }}
              className="px-7 py-4 rounded-xl border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-900 text-zinc-300 hover:text-white font-semibold text-base tracking-wide transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Sign Up</span>
              <span className="text-red-500">→</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column: Large 3D Cartoon Avatars Display (No Box/Border/Background) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="lg:col-span-5 relative flex items-center justify-center min-h-[420px] lg:min-h-[520px]"
        >
          {/* Ambient Red Floor Glow beneath characters */}
          <div className="absolute bottom-0 w-full h-36 bg-red-600/40 blur-[80px] rounded-full pointer-events-none" />

          {/* Avatar Container: Pure Transparent 3D Characters Without Any Black Background Box */}
          <div className="relative z-10 w-full max-w-xl md:max-w-2xl flex items-center justify-center p-0 m-0">
            <TransparentStudentAvatars
              src="src/assets/images/kalvium_tshirt_students_1784969737227.jpg"
              alt="Kalvium Stylish Student 3D Characters wearing Red T-shirts with Kalvium Logo"
            />
          </div>

          {/* Floating Red UI Icon 1: Top Left Calendar */}
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 z-20 p-3 rounded-2xl bg-red-950/20 border border-red-500/30 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.25)] backdrop-blur-sm"
          >
            <Calendar className="w-5 h-5" />
          </motion.div>

          {/* Floating Red UI Icon 2: Middle Right Book/Notes */}
          <motion.div
            animate={{ y: [6, -6, 6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-6 -right-2 z-20 p-3 rounded-2xl bg-red-950/20 border border-red-500/30 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.25)] backdrop-blur-sm"
          >
            <BookOpen className="w-5 h-5" />
          </motion.div>

          {/* Floating Red UI Icon 3: Middle Left Chart */}
          <motion.div
            animate={{ y: [5, -5, 5] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-12 -left-4 z-20 p-3 rounded-2xl bg-red-950/20 border border-red-500/30 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.25)] backdrop-blur-sm"
          >
            <BarChart3 className="w-5 h-5" />
          </motion.div>

          {/* Floating Red UI Icon 4: Bottom Right Document */}
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-4 right-0 z-20 p-3 rounded-2xl bg-red-950/20 border border-red-500/30 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.25)] backdrop-blur-sm"
          >
            <FileText className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </main>

      {/* Footer minimal tag */}
      <footer className="relative z-20 w-full py-4 text-center border-t border-zinc-900/60 font-mono text-[11px] text-zinc-600 uppercase tracking-widest">
        KALVIUM ACADEMIC INTELLIGENCE 
      </footer>

      {/* Interactive Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-zinc-950 border border-red-600/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(239,68,68,0.3)] text-left overflow-hidden"
            >
              {/* Top ambient glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-red-600/20 blur-[60px] pointer-events-none rounded-full" />

              {/* Close Button */}
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center font-bold text-white text-sm">
                    K
                  </div>
                  <span className="font-mono text-xs text-red-400 uppercase tracking-widest font-bold">
                    SIM AUTHENTICATION
                  </span>
                </div>
                <h2 className="text-2xl font-display font-bold text-white">
                  {authMode === "login" ? "Welcome Back to SIM" : "Create SIM Account"}
                </h2>
                <p className="text-xs text-zinc-400">
                  {authMode === "login"
                    ? "Log in to access your student intelligence dashboard."
                    : "Sign up to track your academic progress and coding expedition."}
                </p>
              </div>

              {/* Google OAuth Button */}
              <button
                type="button"
                onClick={handleGoogleAuth}
                className="w-full py-3 px-4 rounded-xl border border-zinc-800 bg-zinc-900/90 hover:bg-zinc-850 text-white font-medium text-sm transition-all flex items-center justify-center gap-3 cursor-pointer shadow-sm hover:border-zinc-700"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9c-.3-.8-.5-1.6-.5-2.5z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Divider */}
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-800" />
                </div>
                <span className="relative px-3 bg-zinc-950 font-mono text-[10px] text-zinc-500 uppercase">
                  OR WITH EMAIL
                </span>
              </div>

              {/* Email / Password Form */}
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-zinc-400">EMAIL ADDRESS</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      placeholder="student@kalvium.community"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-500 transition-colors font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-zinc-400">PASSWORD</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-500 transition-colors font-sans"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all cursor-pointer mt-2"
                >
                  {authMode === "login" ? "Login to SIM" : "Create Account & Start"}
                </button>
              </form>

              {/* Mode Toggle Footer */}
              <div className="mt-6 pt-4 border-t border-zinc-900 text-center text-xs text-zinc-400">
                {authMode === "login" ? (
                  <span>
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setAuthMode("signup")}
                      className="text-red-400 hover:underline font-semibold cursor-pointer"
                    >
                      Sign Up
                    </button>
                  </span>
                ) : (
                  <span>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setAuthMode("login")}
                      className="text-red-400 hover:underline font-semibold cursor-pointer"
                    >
                      Log In
                    </button>
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


