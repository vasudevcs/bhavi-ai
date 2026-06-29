import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { TwinMood, MOUTH_PATHS, EYE_SCALE_Y } from "./TwinMoodEngine";
import { haloRotation } from "./TwinAnimations";

interface TwinFaceProps {
  mood: TwinMood;
  palette: { primary: string; secondary: string; glow: string; accent: string };
  isActive: boolean;
  size: number;
}

export default function TwinFace({ mood, palette, isActive, size }: TwinFaceProps) {
  const [blink, setBlink] = useState(false);

  // Random blink logic
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const scheduleBlink = () => {
      const delay = 3000 + Math.random() * 4000;
      timeout = setTimeout(() => {
        setBlink(true);
        setTimeout(() => {
          setBlink(false);
          scheduleBlink();
        }, 150);
      }, delay);
    };
    scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  const eyeScaleY = blink ? 0.05 : EYE_SCALE_Y[mood];
  const eyeColor = isActive ? palette.primary : "#475569";
  const haloOpacity = isActive ? 0.7 : 0.4;
  
  // Head movement based on mood (looking up when thinking)
  const lookOffset = mood === "thinking" ? -4 : mood === "concerned" ? 2 : 0;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible drop-shadow-xl"
    >
      <defs>
        <radialGradient id="faceGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={palette.accent} />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Rotating Halos */}
      <motion.g
        variants={haloRotation}
        animate="animate"
        style={{ originX: "50px", originY: "50px" }}
      >
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <line
            key={i}
            x1="50"
            y1="10"
            x2="50"
            y2="5"
            stroke={palette.primary}
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity={haloOpacity}
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
      </motion.g>

      {/* Main Face Container (Moves slightly based on mood) */}
      <motion.g animate={{ y: lookOffset }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
        {/* Background face circle */}
        <circle cx="50" cy="50" r="35" fill="url(#faceGlow)" stroke={palette.primary} strokeWidth="2" />
        
        {/* Decorative Circuit Lines */}
        <line x1="15" y1="45" x2="25" y2="45" stroke={palette.primary} strokeWidth="1" opacity="0.4" strokeDasharray="2 2" />
        <line x1="75" y1="45" x2="85" y2="45" stroke={palette.primary} strokeWidth="1" opacity="0.4" strokeDasharray="2 2" />

        {/* Left Eye */}
        <motion.ellipse
          cx="38"
          cy="42"
          rx="4.5"
          animate={{ ry: 4.5 * eyeScaleY }}
          transition={{ duration: blink ? 0.05 : 0.3 }}
          fill={eyeColor}
        />
        {!blink && <circle cx="39.5" cy="40.5" r="1.5" fill="white" opacity="0.8" />}

        {/* Right Eye */}
        <motion.ellipse
          cx="62"
          cy="42"
          rx="4.5"
          animate={{ ry: 4.5 * eyeScaleY }}
          transition={{ duration: blink ? 0.05 : 0.3 }}
          fill={eyeColor}
        />
        {!blink && <circle cx="63.5" cy="40.5" r="1.5" fill="white" opacity="0.8" />}

        {/* Morphing Mouth */}
        <motion.path
          animate={{ d: MOUTH_PATHS[mood] }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          stroke={eyeColor}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Thinking / Generating Hand Gesture */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: mood === "thinking" ? 1 : 0,
            y: mood === "thinking" ? 0 : 10,
            rotate: mood === "thinking" ? [0, -10, 0] : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <path d="M 60 70 Q 65 65 70 70" stroke={palette.primary} strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="70" cy="70" r="2" fill={palette.primary} />
        </motion.g>
      </motion.g>
    </svg>
  );
}
