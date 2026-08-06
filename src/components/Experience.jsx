"use client";

import { useRef, useState, memo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SectionHeader from "./SectionHeader";

const CODE_SNIPPETS_CONFIG = [
  { text: "git commit -m 'shipped'", x: "8%", y: "12%", dur: 7, delay: 0 },
  { text: "const career = [];", x: "78%", y: "8%", dur: 8, delay: 1 },
  { text: "career.push(exp);", x: "85%", y: "55%", dur: 6, delay: 2 },
  { text: "// 1yr+ experience", x: "5%", y: "70%", dur: 9, delay: 0.5 },
  { text: "export default dev;", x: "70%", y: "85%", dur: 7, delay: 1.5 },
  { text: "npm run build", x: "15%", y: "45%", dur: 8, delay: 3 },
];

// Floating code background for the experience section (Memoized for performance)
const FloatingExpBg = memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {CODE_SNIPPETS_CONFIG.map((snippet, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.12, 0.08, 0.12],
            y: [0, -15, 5, 0],
            x: [0, 5, -5, 0],
          }}
          transition={{
            duration: snippet.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: snippet.delay,
          }}
          className="absolute font-mono text-[11px] md:text-sm text-[#79C0FF] whitespace-nowrap select-none"
          style={{ left: snippet.x, top: snippet.y }}
        >
          {snippet.text}
        </motion.span>
      ))}
    </div>
  );
});

FloatingExpBg.displayName = "FloatingExpBg";

const experiences = [
  {
    role: "Full-Stack Developer Intern",
    company: "Avetsa HQ",
    period: "2025 — 2026",
    duration: "1 Year",
    status: "completed",
    description:
      "Worked as a full-stack developer handling both frontend and backend development. Built and maintained production-level web applications, collaborated with the team on feature development, and gained hands-on experience with real-world codebases.",
    highlights: [
      "Built and maintained frontend interfaces using React and Next.js",
      "Developed RESTful APIs with Node.js and Express",
      "Worked with MongoDB for database design and queries",
      "Collaborated with team members using Git and agile workflows",
      "Gained real-world production development experience",
    ],
    techUsed: ["React", "Next.js", "Node.js", "Express", "MongoDB", "Git"],
  },
  {
    role: "Full-Stack Developer",
    company: "Personal Projects",
    period: "2026 — Present",
    duration: "Ongoing",
    status: "active",
    description:
      "Building full-stack web applications independently using the MERN stack. Focused on creating scalable, performant solutions with modern UI/UX and deploying them to production.",
    highlights: [
      "Built 4+ production-ready full-stack applications",
      "Developed LearnStack — an e-learning platform with hackathon features",
      "Created Returno — a digital wallet and rewards platform",
      "Implemented real-time features and interactive dashboards",
    ],
    techUsed: ["React", "Node.js", "MongoDB", "Express", "Next.js", "Tailwind CSS"],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeExp, setActiveExp] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="experience" className="relative py-24 md:py-32 overflow-hidden">
      <FloatingExpBg />
      <div className="spotlight-bg" style={{ top: "50%", right: "0", transform: "translate(20%, -50%)" }} />

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto px-[24px] md:px-[64px] relative z-10"
      >
        {/* Section Header */}
        <SectionHeader number="04." title="Experience" />

        {/* Subtitle */}
        <motion.div variants={itemVariants} className="mb-12 md:mb-16">
          <p className="font-mono text-xs sm:text-sm md:text-base text-gray-500">
            <span className="text-[#C678DD]">const</span>{" "}
            <span className="text-[#61DAFB]">myJourney</span>{" "}
            <span className="text-white">=</span>{" "}
            <span className="text-[#98C379]">experience</span>
            <span className="text-[#E06C75]">.filter</span>
            <span className="text-gray-400">(</span>
            <span className="text-[#E5C07B]">e</span>{" "}
            <span className="text-[#C678DD]">={'>'}</span>{" "}
            <span className="text-[#E5C07B]">e</span>
            <span className="text-[#E06C75]">.real</span>{" "}
            <span className="text-[#56B6C2]">===</span>{" "}
            <span className="text-[#D19A66]">true</span>
            <span className="text-gray-400">);</span>
          </p>
        </motion.div>

        {/* Main Experience Layout */}
        <motion.div variants={itemVariants} className="flex flex-col lg:flex-row gap-6">

          {/* Left: Tab Selector (IDE file tabs) */}
          <div className="lg:w-64 shrink-0">
            <div className="bg-[#0D1117] border border-gray-800 rounded-xl overflow-hidden">
              {/* Tab header */}
              <div className="px-4 py-3 border-b border-gray-800 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
                <div className="w-2 h-2 rounded-full bg-[#28C840]" />
                <span className="ml-2 font-mono text-[10px] text-gray-500">EXPLORER</span>
              </div>

              {/* File tree / tabs */}
              <div className="p-2">
                {experiences.map((exp, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setActiveExp(idx)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left px-3 py-3 rounded-lg font-mono text-xs md:text-sm transition-all duration-300 flex items-center gap-3 mb-1 ${activeExp === idx
                      ? "bg-[#1d2433] text-[#61DAFB] border border-[#61DAFB]/30 shadow-[0_0_15px_rgba(97,218,251,0.1)]"
                      : "text-gray-400 hover:text-gray-300 hover:bg-[#161B22] border border-transparent"
                      }`}
                  >
                    <span className={`text-[10px] ${activeExp === idx ? "text-[#28C840]" : "text-gray-600"}`}>
                      {activeExp === idx ? "▶" : "▷"}
                    </span>
                    <div className="flex flex-col">
                      <span className="truncate">{exp.company.toLowerCase().replace(/\s+/g, "_")}.js</span>
                      {activeExp === idx && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-[10px] text-gray-400 mt-0.5"
                        >
                          {exp.duration} • {exp.status === "active" ? "🟢 active" : "✅ completed"}
                        </motion.span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Experience Detail (IDE code view) */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExp}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-[#0D1117] border border-gray-800 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.3)]"
              >
                {/* IDE top bar */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800 bg-[#161B22]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                  </div>
                  <div className="flex-1 text-center font-mono text-[10px] md:text-xs text-gray-400">
                    {experiences[activeExp].company.toLowerCase().replace(/\s+/g, "_")}.js — Experience
                  </div>
                  <div className="font-mono text-[10px] text-gray-600">
                    {experiences[activeExp].status === "active" ? (
                      <motion.span
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-[#28C840]"
                      >
                        ● RUNNING
                      </motion.span>
                    ) : (
                      <span className="text-[#FEBC2E]">✓ DONE</span>
                    )}
                  </div>
                </div>

                {/* Code content */}
                <div className="p-3 sm:p-5 md:p-8 space-y-1 overflow-x-hidden">
                  <div className="space-y-3">
                    {/* Role */}
                   <div className="flex items-start gap-1.5 sm:gap-3 font-mono text-[10px] sm:text-xs md:text-[13px]">
                      <span className="text-gray-700 shrink-0">01 |</span>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <div className="flex items-start gap-1.5 sm:gap-3 font-mono text-[10px] sm:text-xs md:text-[13px]">
                        <span className="text-gray-700 shrink-0">02 |</span>
                        <div>
                          <span className="text-[#C678DD]">class </span>
                          <span className="text-[#E5C07B] text-xs sm:text-base md:text-xl font-bold break-words whitespace-normal">
                            {experiences[activeExp].role}
                          </span>
                          <span className="text-white"> {'{'}</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Company & Period */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className="flex items-start gap-1.5 sm:gap-3 font-mono text-[10px] sm:text-xs md:text-[13px]">
                        <span className="text-gray-700 shrink-0">03 |</span>
                        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 overflow-hidden pl-3 sm:pl-4 md:pl-6">
                          <span className="text-gray-500">{'// '}</span>
                          <span className="text-[#79C0FF] font-semibold whitespace-nowrap">@ {experiences[activeExp].company}</span>
                          <span className="text-gray-400">|</span>
                          <span className="text-[#98C379] whitespace-nowrap">{experiences[activeExp].period}</span>
                          <span className="text-gray-400">|</span>
                          <motion.span
                            animate={
                              experiences[activeExp].status === "active"
                                ? { opacity: [1, 0.5, 1] }
                                : {}
                            }
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className={`px-1.5 py-0.5 rounded text-[8px] sm:text-[10px] whitespace-nowrap ${experiences[activeExp].status === "active"
                              ? "bg-[#28C840]/20 text-[#28C840] border border-[#28C840]/30"
                              : "bg-[#FEBC2E]/20 text-[#FEBC2E] border border-[#FEBC2E]/30"
                              }`}
                          >
                            {experiences[activeExp].duration}
                          </motion.span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Separator */}
                    <div className="flex items-start gap-1.5 sm:gap-3 font-mono text-[10px] sm:text-xs md:text-[13px]">
                      <span className="text-gray-700 shrink-0">04 |</span>
                    </div>

                    {/* Description */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <div className="flex items-start gap-1.5 sm:gap-3 font-mono text-[10px] sm:text-xs md:text-[13px]">
                        <span className="text-gray-700 shrink-0">05 |</span>
                        <div className="break-words whitespace-normal overflow-hidden max-w-full pl-3 sm:pl-4 md:pl-6">
                          <span className="text-[#C678DD]">this</span>
                          <span className="text-white">.description</span>
                          <span className="text-[#56B6C2]"> = </span>
                          <span className="text-[#98C379] break-words whitespace-normal">
                            &quot;{experiences[activeExp].description}&quot;
                          </span>
                          <span className="text-gray-400">;</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Separator */}
                    <div className="flex items-start gap-1.5 sm:gap-3 font-mono text-[10px] sm:text-xs md:text-[13px]">
                      <span className="text-gray-700 shrink-0">06 |</span>
                    </div>

                    {/* Highlights header */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <div className="flex items-start gap-1.5 sm:gap-3 font-mono text-[10px] sm:text-xs md:text-[13px]">
                        <span className="text-gray-700 shrink-0">07 |</span>
                        <div className="pl-3 sm:pl-4 md:pl-6">
                          <span className="text-[#C678DD]">this</span>
                          <span className="text-white">.achievements</span>
                          <span className="text-[#56B6C2]"> = </span>
                          <span className="text-[#E5C07B]">[</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Highlights list */}
                    {experiences[activeExp].highlights.map((h, i) => (
                      <motion.div
                        key={`${activeExp}-${i}`}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                      >
                        <div className="flex items-start gap-1.5 sm:gap-3 font-mono text-[10px] sm:text-xs md:text-[13px] group/item">
                          <span className="text-gray-700 shrink-0">
                            {String(8 + i).padStart(2, "0")} |
                          </span>
                          <div className="flex items-start gap-1.5 break-words whitespace-normal overflow-hidden max-w-full pl-6 sm:pl-8 md:pl-12">
                            <motion.span
                              animate={{ rotate: [0, 10, 0] }}
                              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                              className="text-[#E06C75] shrink-0 mt-0.5"
                            >
                              ▹
                            </motion.span>
                            <span className="text-[#98C379] group-hover/item:text-[#61DAFB] transition-colors duration-300 break-words whitespace-normal">
                              &quot;{h}&quot;
                              {i < experiences[activeExp].highlights.length - 1 && (
                                <span className="text-gray-600">,</span>
                              )}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Close array */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.9 }}
                    >
                      <div className="flex items-start gap-1.5 sm:gap-3 font-mono text-[10px] sm:text-xs md:text-[13px]">
                        <span className="text-gray-700 shrink-0">
                          {String(8 + experiences[activeExp].highlights.length).padStart(2, "0")} |
                        </span>
                        <span className="text-[#E5C07B] pl-3 sm:pl-4 md:pl-6">];</span>
                      </div>
                    </motion.div>

                    {/* Close class */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 1 }}
                    >
                      <div className="flex items-start gap-1.5 sm:gap-3 font-mono text-[10px] sm:text-xs md:text-[13px]">
                        <span className="text-gray-700 shrink-0">
                          {String(9 + experiences[activeExp].highlights.length).padStart(2, "0")} |
                        </span>
                        <span className="text-white">{'}'}</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Tech Used — animated bottom bar */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    className="mt-8 pt-6 border-t border-gray-800"
                  >
                    <div className="font-mono text-[10px] md:text-xs text-gray-600 mb-3">
                      // tech_stack.config
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {experiences[activeExp].techUsed.map((tech, i) => (
                        <motion.span
                          key={`${activeExp}-tech-${i}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: 1.2 + i * 0.08,
                            type: "spring",
                            stiffness: 200,
                          }}
                          whileHover={{
                            scale: 1.1,
                            boxShadow: "0 0 20px rgba(97,218,251,0.3)",
                          }}
                          className="px-3 py-1.5 bg-[#161B22] border border-gray-800 rounded-lg font-mono text-[10px] md:text-xs text-[#61DAFB] hover:border-[#61DAFB]/40 transition-colors duration-300 cursor-default"
                        >
                          {'{ '}{tech}{' }'}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
 
        {/* Bottom Terminal Output */}
        <motion.div
          variants={itemVariants}
          className="mt-12 bg-[#0D1117] border border-gray-800 rounded-xl p-4 md:p-6 max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[10px] text-gray-600">TERMINAL</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>
          <div className="space-y-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.5 }}
              className="font-mono text-[11px] md:text-xs"
            >
              <span className="text-[#28C840]">riddhesh@dev</span>
              <span className="text-gray-500">:</span>
              <span className="text-[#79C0FF]">~/career</span>
              <span className="text-gray-500">$ </span>
              <span className="text-gray-300">git log --oneline</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.8 }}
              className="font-mono text-[11px] md:text-xs text-gray-500 space-y-1"
            >
              <div>
                <span className="text-[#E5C07B]">a1b2c3d</span> feat: completed 1yr internship at Avetsa HQ
              </div>
              <div>
                <span className="text-[#E5C07B]">e4f5g6h</span> build: shipped 4+ production projects
              </div>
              <div>
                <span className="text-[#E5C07B]">i7j8k9l</span> init: started MERN stack journey
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
