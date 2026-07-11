"use client";

import { useRef, memo } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeader from "./SectionHeader";

const skillCategories = [
  {
    title: "frontend.js",
    color: "#61DAFB", // React Cyan
    skills: ["javascript", "React", "Next.js", "Tailwind CSS", "Framer Motion", "HTML5", "CSS3"],
  },
  {
    title: "backend.js",
    color: "#339933", // Node Green
    skills: ["Node.js", "Express.js", "REST APIs", "nodemailer", "jwt", "bcrypt", "socket.io"],
  },
  {
    title: "database.db",
    color: "#47A248", // MongoDB Green
    skills: ["MongoDB", "SQL", "PostgreSQL", "MySQL", "Mongoose"],
  },
  {
    title: "devops.config",
    color: "#F05032", // Git Orange
    skills: ["Git", "Vercel", "Linux", "Windows", "Ubuntu", "render", "CI/CD"],
  },
  {
    title: "AI Tools.config",
    color: "#8e0d93", // Gemini/Gemini Purple
    skills: ["ChatGPT", "Gemini", "GitHub Copilot", "Claude", "Antigravity", "Stitch", "Kiro"],
  }
];

const SYMBOLS_CONFIG = [
  { text: "{}", size: "3rem", left: "10%", duration: 20 },
  { text: "</>", size: "2.5rem", left: "85%", duration: 25 },
  { text: "() =>", size: "2rem", left: "45%", duration: 22 },
  { text: "[]", size: "3.5rem", left: "65%", duration: 28 },
  { text: "!==", size: "2rem", left: "25%", duration: 18 },
  { text: "&&", size: "4rem", left: "75%", duration: 30 },
  { text: "||", size: "3rem", left: "5%", duration: 24 },
  { text: "===", size: "2.5rem", left: "90%", duration: 26 },
];

// Memoized background animation to prevent unnecessary renders when state changes
const FloatingProgrammingBg = memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {SYMBOLS_CONFIG.map((sym, i) => (
        <motion.div
          key={i}
          initial={{ y: "110vh", opacity: 0, rotate: 0 }}
          animate={{
            y: "-20vh",
            opacity: [0, 0.15, 0.15, 0],
            rotate: 360
          }}
          transition={{
            duration: sym.duration,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear"
          }}
          className="absolute font-mono font-bold text-[var(--color-primary)]"
          style={{ left: sym.left, fontSize: sym.size }}
        >
          {sym.text}
        </motion.div>
      ))}
    </div>
  );
});

FloatingProgrammingBg.displayName = "FloatingProgrammingBg";

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[var(--color-surface-container)] overflow-hidden"
    >
      {/* Animated Programming Operators Background */}
      <FloatingProgrammingBg />
      <div className="spotlight-bg" style={{ top: "60%", right: "20%", transform: "translate(50%, -50%)" }} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto px-[24px] md:px-[64px] relative z-10"
      >
        {/* Reusable Section Header */}
        <SectionHeader number="02." title="TechStack" />

        {/* Skills Grid - Coding Aesthetic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8" style={{ perspective: "1000px" }}>
          {skillCategories.map((category) => (
            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -8,
                rotateX: 4,
                rotateY: -4,
                boxShadow: `0px 20px 40px -10px ${category.color}35`,
                borderColor: category.color
              }}
              key={category.title}
              className="bg-[#0D1117] rounded-xl overflow-hidden border border-gray-800 transition-all duration-300 flex flex-col h-full"
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#161B22] border-b border-gray-800 shrink-0">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
                </div>
                <span
                  className="font-mono text-[10px] sm:text-xs opacity-80 font-semibold"
                  style={{ color: category.color }}
                >
                  {category.title}
                </span>
              </div>

              {/* Code Content */}
              <div className="p-5 font-mono text-[12px] sm:text-[13px] leading-loose flex-grow overflow-x-auto text-gray-300 select-none">
                <span className="text-[#FF7B72]">export const</span> <span className="text-[#79C0FF]">{category.title.split('.')[0]}</span> <span className="text-[#FF7B72]">=</span> {'['}

                <div className="pl-4 border-l border-gray-800/80 ml-1.5 my-2 space-y-1 flex flex-col">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      whileHover={{ x: 4, color: category.color }}
                      className="transition-all duration-200 cursor-default"
                    >
                      <span className="text-[#A5D6FF]">"{skill.trim()}"</span>
                      {index < category.skills.length - 1 && <span className="text-gray-500">,</span>}
                    </motion.div>
                  ))}
                </div>

                {'];'}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
