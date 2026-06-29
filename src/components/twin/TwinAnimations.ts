import { Variants } from "motion/react";

export const floatingAnimation: Variants = {
  idle: {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
  hover: {
    y: -12,
    scale: 1.05,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export const breathingAnimation: Variants = {
  idle: {
    scale: [1, 1.03, 1],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export const haloRotation: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

export const pulseAnimation: Variants = {
  thinking: {
    scale: [1, 1.1, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
  idle: {
    scale: 1,
    opacity: 0.5,
  }
};
