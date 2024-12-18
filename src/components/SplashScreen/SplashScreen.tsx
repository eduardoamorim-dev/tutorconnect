// components/SplashScreen.tsx
import React from "react";
import { motion } from "framer-motion";

const SplashScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-violet-700">
      <motion.h1
        className="text-4xl font-bold text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Tutor Connect
      </motion.h1>
    </div>
  );
};

export default SplashScreen;
