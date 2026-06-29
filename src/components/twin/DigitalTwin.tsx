import React, { useState } from "react";
import { motion } from "motion/react";
import TwinFace from "./TwinFace";
import { determineMood, TwinMood, MoodInput } from "./TwinMoodEngine";
import { floatingAnimation, pulseAnimation, breathingAnimation } from "./TwinAnimations";

interface DigitalTwinProps {
  name: string;
  personality: "Mentor" | "Coach" | "Friend" | "Challenger";
  layoutId?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  isActive?: boolean;
  moodInput?: MoodInput;
}

const PERSONALITY_PALETTES = {
  Mentor:     { primary: "#6366f1", secondary: "#8b5cf6", glow: "#a5b4fc", accent: "#e0e7ff" },
  Coach:      { primary: "#0ea5e9", secondary: "#0284c7", glow: "#7dd3fc", accent: "#e0f2fe" },
  Friend:     { primary: "#10b981", secondary: "#059669", glow: "#6ee7b7", accent: "#d1fae5" },
  Challenger: { primary: "#ef4444", secondary: "#dc2626", glow: "#fca5a5", accent: "#fee2e2" },
};

const SIZE_MAP = {
  sm: 60,
  md: 100,
  lg: 160,
};

export default function DigitalTwin({
  name,
  personality,
  layoutId,
  size = "md",
  className = "",
  isActive = true,
  moodInput = {},
}: DigitalTwinProps) {
  const [isHovered, setIsHovered] = useState(false);
  const palette = PERSONALITY_PALETTES[personality];
  const pxSize = SIZE_MAP[size];

  // Determine current mood based on state
  const currentMood: TwinMood = determineMood({ ...moodInput, isHovered });

  return (
    <motion.div
      layoutId={layoutId}
      className={`relative flex items-center justify-center cursor-pointer ${className}`}
      style={{ width: pxSize, height: pxSize }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={floatingAnimation}
      initial="idle"
      animate={isHovered ? "hover" : "idle"}
    >
      {/* Outer ambient glow pulse */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl -z-10"
        style={{ backgroundColor: palette.glow }}
        variants={pulseAnimation}
        animate={currentMood === "thinking" ? "thinking" : "idle"}
      />
      
      {/* Core Breathing wrapper */}
      <motion.div variants={breathingAnimation} animate="idle" className="relative z-10 w-full h-full">
        <TwinFace
          mood={currentMood}
          palette={palette}
          isActive={isActive}
          size={pxSize}
        />
      </motion.div>
    </motion.div>
  );
}
