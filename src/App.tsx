import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import OpeningScreen from "./components/OpeningScreen";
import IdentityInitialization from "./components/IdentityInitialization";
import ForgeAnimation from "./components/ForgeAnimation";
import TransformationScreen from "./components/TransformationScreen";
import MissionControlHome from "./components/MissionControlHome";
import { StudentProfile } from "./types";

type JourneyStage = "opening" | "identity" | "forge" | "transformation" | "home";

export default function App() {
  const [stage, setStage] = useState<JourneyStage>("opening");
  const [profile, setProfile] = useState<StudentProfile | null>(null);

  const handleBeginJourney = () => {
    setStage("identity");
  };

  const handleIdentityComplete = (completedProfile: StudentProfile) => {
    setProfile(completedProfile);
    setStage("transformation");
  };

  const handleForgeComplete = () => {
    setStage("transformation");
  };

  const handleTransformationComplete = () => {
    setStage("home");
  };

  const handleResetJourney = () => {
    setProfile(null);
    setStage("opening");
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      <AnimatePresence mode="wait">
        {stage === "opening" && (
          <motion.div
            key="opening"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <OpeningScreen onBegin={handleBeginJourney} />
          </motion.div>
        )}

        {stage === "identity" && (
          <motion.div
            key="identity"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <IdentityInitialization onComplete={handleIdentityComplete} />
          </motion.div>
        )}

        {stage === "forge" && (
          <motion.div
            key="forge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ForgeAnimation onComplete={handleForgeComplete} />
          </motion.div>
        )}

        {stage === "transformation" && profile && (
          <motion.div
            key="transformation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TransformationScreen profile={profile} onEnter={handleTransformationComplete} />
          </motion.div>
        )}

        {stage === "home" && profile && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <MissionControlHome profile={profile} onRestart={handleResetJourney} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
