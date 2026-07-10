"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

const FloatingProjectBg = () => {
  const elements = [
    { text: "git commit -m 'deploy'", left: "10%", top: "15%", duration: 25 },
    { text: "npm run build", left: "75%", top: "85%", duration: 20 },
    { text: "await fetch('/api/data')", left: "80%", top: "25%", duration: 28 },
    { text: "<Component />", left: "5%", top: "75%", duration: 22 },
    { text: "{ status: 200 }", left: "60%", top: "10%", duration: 26 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {elements.map((el, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -40, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: el.duration, repeat: Infinity, ease: "easeInOut" }}
          className="absolute font-mono text-xl md:text-2xl font-bold text-[var(--color-primary-light)] opacity-20"
          style={{ left: el.left, top: el.top }}
        >
          {el.text}
        </motion.div>
      ))}
    </div>
  );
};

const projects = [
  {
    title: "LearnStack",
    description: "A comprehensive e-learning platform with real-time collaboration, hackathon management, and interactive dashboards.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    link: "https://learnstack-two.vercel.app",
    github: "https://github.com/riddheshsoni2008/LearnStack",
    color: "bg-gradient-to-br from-[#0f172a] to-[#1e3a8a]",
    shortName: "LS"
  },
  {
    title: "Returno",
    description: "A digital wallet and rewards platform for collecting stamps and unlocking milestones at partner shops.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    link: "https://returno-eight.vercel.app",
    github: "https://github.com/riddheshsoni2008/Returno",
    color: "bg-gradient-to-br from-[#1e3a8a] to-[#172554]",
    shortName: "RT"
  },
  {
    title: "Portfolio Website",
    description: "High-end developer portfolio with smooth animations, dynamic scroll effects, and modern GenZ aesthetic.",
    tech: ["Next.js", "React", "CSS", "JavaScript"],
    link: "#",
    github: "https://github.com/riddheshsoni2008/portfolio",
    color: "bg-gradient-to-br from-[#2e1065] to-[#4c1d95]",
    shortName: "PW"
  },
  {
    title: "Cricket Fantasy Game",
    description: "A fantasy sports web application where users can create custom cricket teams, manage players, and compete in virtual leagues.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    link: "https://github.com/riddheshsoni2008/cricket-fantasy-game",
    github: "https://github.com/riddheshsoni2008/cricket-fantasy-game",
    color: "bg-gradient-to-br from-[#064e3b] to-[#047857]",
    shortName: "CF"
  }
];

export default function Projects() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 4 projects -> 0 to 0.25 (idx 0), 0.25 to 0.5 (idx 1), etc.
    const rawIndex = Math.floor(latest * projects.length);
    // Clamp between 0 and projects.length - 1
    const clampedIndex = Math.max(0, Math.min(projects.length - 1, rawIndex));
    if (clampedIndex !== activeIndex) {
      setActiveIndex(clampedIndex);
    }
  });

  return (
    <section id="projects" className="relative bg-[var(--color-surface)]">
      {/* 400vh container gives us enough scroll room to transition 4 projects */}
      <div ref={containerRef} className="h-[400vh] relative">
        {/* Sticky container that stays on screen while scrolling */}
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
          <FloatingProjectBg />

          {/* Header */}
          <div className="w-full max-w-[1280px] mx-auto px-[24px] md:px-[64px] absolute top-16 md:top-24 left-0 right-0 z-20 pointer-events-none">
            <div className="flex items-center gap-2 md:gap-4 mb-2">
              <span className="label-mono text-[var(--color-tech-blue)]">03.</span>
              <h2 className="headline-lg text-[var(--color-primary)] font-mono flex items-center whitespace-nowrap">
                &lt;Projects&nbsp;/&gt;
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="ml-2 w-3 h-8 md:h-10 bg-[var(--color-tech-blue)] inline-block"
                />
              </h2>
            </div>
            <p className="body-lg text-[var(--color-on-surface-variant)] max-w-2xl font-mono text-xs sm:text-sm md:text-base mt-4">
              <span className="text-[#3b82f6]">const</span> <span className="text-[#eab308]">scrollDown</span> = <span className="text-[#a855f7]">() =&gt;</span> viewWork();
            </p>
          </div>

          {/* Cards Container */}
          <div className="relative w-full max-w-[1000px] h-[600px] sm:h-[550px] md:h-[500px] mt-32 md:mt-20 px-4 md:px-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <div className="flex flex-col h-full bg-[#0D1117] border border-gray-800 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative">
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                  {/* IDE Header */}
                  <div className="flex items-center px-4 py-3 bg-[#161B22] border-b border-gray-800 shrink-0 z-10">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                    </div>
                    <div className="mx-auto font-mono text-[10px] md:text-xs text-gray-500 hidden sm:block">
                      {projects[activeIndex].title.toLowerCase().replace(/\s+/g, '-')}.jsx
                    </div>
                  </div>

                  {/* Content Split */}
                  <div className="flex flex-col md:flex-row flex-1 overflow-hidden z-10">
                    {/* Left side: Abstract Aesthetic Visualization */}
                    <div className={`w-full md:w-5/12 h-48 md:h-full ${projects[activeIndex].color} flex flex-col items-center justify-center relative overflow-hidden group border-b md:border-b-0 md:border-r border-gray-800`}>
                      {/* Animated Background Mesh */}
                      <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

                      {/* Big Background Number */}
                      <motion.div
                        key={`num-${activeIndex}`}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 0.05 }}
                        transition={{ duration: 0.5 }}
                        className="absolute font-mono text-[150px] md:text-[250px] font-black text-white pointer-events-none select-none z-0 tracking-tighter mix-blend-overlay"
                      >
                        0{activeIndex + 1}
                      </motion.div>

                      {/* Floating Core Element */}
                      <motion.div
                        key={`core-${activeIndex}`}
                        initial={{ scale: 0.5, rotate: -45, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className="relative z-10 flex items-center justify-center"
                      >
                        {/* Glowing rings */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                          className="absolute w-28 h-28 md:w-40 md:h-40 border border-white/20 rounded-full border-t-white/80"
                        />
                        <motion.div
                          animate={{ rotate: -360 }}
                          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                          className="absolute w-36 h-36 md:w-52 md:h-52 border border-white/10 rounded-full border-b-white/50"
                        />

                        {/* Project Initial Glass Box */}
                        <div className="w-16 h-16 md:w-24 md:h-24 bg-black/30 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-all duration-500 group-hover:scale-110">
                          <span className="text-2xl md:text-4xl font-black font-mono text-white/90 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                            {projects[activeIndex].shortName}
                          </span>
                        </div>
                      </motion.div>

                      {/* Zero-Gravity Floating Tech Names */}
                      {projects[activeIndex].tech.map((tech, i) => {
                        const floatConfig = [
                          { x: [0, 6, -4, 0], y: [0, -12, -6, 0], top: '12%', left: '8%', dur: 6, delay: 0 },
                          { x: [0, -5, 8, 0], y: [0, 8, -4, 0], top: '15%', right: '8%', dur: 7, delay: 0.5 },
                          { x: [0, 8, -3, 0], y: [0, -5, 10, 0], bottom: '15%', left: '10%', dur: 5.5, delay: 1 },
                          { x: [0, -6, 4, 0], y: [0, 6, -8, 0], bottom: '12%', right: '10%', dur: 6.5, delay: 1.5 },
                        ];
                        const cfg = floatConfig[i];
                        const posStyle = {};
                        if (cfg.top) posStyle.top = cfg.top;
                        if (cfg.bottom) posStyle.bottom = cfg.bottom;
                        if (cfg.left) posStyle.left = cfg.left;
                        if (cfg.right) posStyle.right = cfg.right;

                        return (
                          <motion.div
                            key={`tech-${activeIndex}-${i}`}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{
                              opacity: [0, 0.9, 0.7, 0.9],
                              scale: 1,
                              x: cfg.x,
                              y: cfg.y
                            }}
                            transition={{
                              opacity: { duration: 2, delay: cfg.delay },
                              scale: { duration: 0.6, delay: cfg.delay, type: "spring" },
                              x: { duration: cfg.dur, repeat: Infinity, ease: "easeInOut", delay: cfg.delay },
                              y: { duration: cfg.dur, repeat: Infinity, ease: "easeInOut", delay: cfg.delay }
                            }}
                            style={posStyle}
                            className="absolute bg-black/60 backdrop-blur-lg px-3 py-1.5 rounded-lg border border-white/15 font-mono text-[10px] md:text-xs z-20 whitespace-nowrap shadow-[0_0_15px_rgba(0,0,0,0.3)]"
                          >
                            <span className="text-[#C678DD]">{'{'}  </span>
                            <span className="text-[#61DAFB] font-semibold">{tech}</span>
                            <span className="text-[#C678DD]">  {'}'}</span>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Right side: Content */}
                    <div className="w-full md:w-7/12 p-6 sm:p-8 md:p-10 flex flex-col justify-center bg-[#0D1117] text-gray-300 relative">
                      <div className="font-mono text-[#79C0FF] text-xs md:text-sm mb-3 opacity-80">
                        // Project 0{activeIndex + 1}
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-sans tracking-tight">
                        {projects[activeIndex].title}
                      </h3>

                      <div className="text-sm md:text-base text-gray-400 mb-8 font-mono leading-relaxed bg-[#161B22] p-4 rounded-xl border border-gray-800">
                        <span className="text-[#FF7B72]">const</span> <span className="text-[#79C0FF]">description</span> <span className="text-[#FF7B72]">=</span> <span className="text-[#A5D6FF]">"{projects[activeIndex].description}"</span>;
                      </div>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {projects[activeIndex].tech.map((t) => (
                          <span key={t} className="px-3 py-1.5 rounded-md bg-blue-500/10 text-[#79C0FF] border border-blue-500/20 font-mono text-[11px] md:text-xs">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 mt-auto font-mono">
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={projects[activeIndex].github}
                          target="_blank" rel="noopener noreferrer"
                          className="btn-secondary text-sm !border-gray-700 !text-gray-300 hover:!bg-gray-800 hover:!text-white transition-colors duration-300 relative group overflow-hidden"
                        >
                          <span className="relative z-10">&lt;Code /&gt;</span>
                          <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
                        </motion.a>
                        <motion.a
                          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(29,78,216,0.8)" }}
                          whileTap={{ scale: 0.95 }}
                          href={projects[activeIndex].link}
                          target="_blank" rel="noopener noreferrer"
                          className="btn-primary text-sm shadow-[0_0_20px_rgba(29,78,216,0.4)] transition-all duration-300 relative group overflow-hidden"
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            Run()
                            <motion.span
                              animate={{ x: [0, 4, 0], y: [0, -4, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                              className="inline-block"
                            >
                              🚀
                            </motion.span>
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-12 z-0"></div>
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}