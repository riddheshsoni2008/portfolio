"use client";

import { motion } from "framer-motion";

export default function SectionHeader({ number, title, className = "" }) {
  return (
    <div className={`flex items-center gap-2 md:gap-4 mb-12 md:mb-16 ${className}`}>
      <span className="label-mono text-[var(--color-tech-blue)] shrink-0">{number}</span>
      <h2 className="headline-lg text-[28px] sm:text-[36px] md:text-5xl text-[var(--color-primary)] font-sans flex items-center shrink-0 whitespace-nowrap">
        &lt;{title}&nbsp;/&gt;
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="ml-2 w-2.5 h-7 md:w-3 md:h-10 bg-[var(--color-tech-blue)] inline-block shrink-0"
        />
      </h2>
      <div className="hidden sm:block flex-1 h-px bg-[var(--color-outline-variant)] ml-4" />
    </div>
  );
}
