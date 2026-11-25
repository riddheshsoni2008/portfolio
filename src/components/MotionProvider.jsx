"use client";

import { MotionConfig } from "framer-motion";

// Turns off movement for visitors who ask their device for reduced motion.
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
