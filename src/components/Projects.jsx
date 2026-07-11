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
    shortName: "LS",
    image: "/learnstack.png",
    video: "/api/video?project=learnstack&t=1"
  },
  {
    title: "Returno",
    description: "A digital wallet and rewards platform for collecting stamps and unlocking milestones at partner shops.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    link: "https://returno-eight.vercel.app",
    github: "https://github.com/riddheshsoni2008/Returno",
    color: "bg-gradient-to-br from-[#1e3a8a] to-[#172554]",
    shortName: "RT",
    image: "/returno.png",
    video: "/api/video?project=returno&t=1"
  },
  {
    title: "Portfolio Website",
    description: "High-end developer portfolio with smooth animations, dynamic scroll effects, and modern GenZ aesthetic.",
    tech: ["Next.js", "React", "CSS", "JavaScript"],
    link: "#",
    github: "https://github.com/riddheshsoni2008/portfolio",
    color: "bg-gradient-to-br from-[#2e1065] to-[#4c1d95]",
    shortName: "PW",
    image: "/portfolio_site.png",
    video: "/api/video?project=portfolio&t=1"
  },
  {
    title: "Cricket Fantasy Game",
    description: "A fantasy sports web application where users can create custom cricket teams, manage players, and compete in virtual leagues.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    link: "http://127.0.0.1:5500/index.html",
    github: "https://github.com/riddheshsoni2008/cricket-fantasy-game",
    color: "bg-gradient-to-br from-[#064e3b] to-[#047857]",
    shortName: "CF",
    image: "/cricket.png",
    video: "/api/video?project=cricket_demo_local&t=1"
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
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-4">
          <FloatingProjectBg />

          {/* Header */}
          <div className="w-full max-w-[1280px] mx-auto px-[24px] md:px-[64px] z-20 mb-6 md:mb-10 mt-8 md:mt-0">
            <div className="flex items-center gap-2 md:gap-4 mb-2">
              <span className="label-mono text-[var(--color-tech-blue)]">03.</span>
              <h2 className="headline-lg text-[var(--color-primary)] font-sans flex items-center whitespace-nowrap">
                &lt;Projects&nbsp;/&gt;
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="ml-2 w-3 h-8 md:h-10 bg-[var(--color-tech-blue)] inline-block"
                />
              </h2>
            </div>
            <p className="body-lg text-[var(--color-on-surface-variant)] max-w-2xl font-mono text-xs sm:text-sm md:text-base mt-2 md:mt-4">
              <span className="text-[#3b82f6]">const</span> <span className="text-[#eab308]">scrollDown</span> = <span className="text-[#a855f7]">() =&gt;</span> viewWork();
            </p>
          </div>

          {/* Cards Container */}
          <div className="relative w-full max-w-[1000px] h-[460px] sm:h-[430px] md:h-[500px] px-4 md:px-0">
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
                    {/* Left side: Sleek Glassmorphic Browser Mockup */}
                    <div className={`hidden md:flex md:w-5/12 h-full ${projects[activeIndex].color} flex-col items-center justify-center relative overflow-hidden group border-r border-gray-800 p-6`}>
                      {/* Animated Background Mesh */}
                      <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity duration-700" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

                      {/* Glowing backlights */}
                      <div className="absolute w-[200px] h-[200px] bg-blue-500/20 rounded-full blur-3xl -top-10 -left-10 pointer-events-none group-hover:bg-blue-500/30 transition-all duration-700" />
                      <div className="absolute w-[200px] h-[200px] bg-purple-500/10 rounded-full blur-3xl -bottom-10 -right-10 pointer-events-none group-hover:bg-purple-500/25 transition-all duration-700" />

                      {/* Browser Frame */}
                      <motion.div
                        key={`mockup-${activeIndex}`}
                        initial={{ opacity: 0, scale: 0.92, rotateY: 10, y: 15 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, rotateY: -10, y: -15 }}
                        transition={{ type: "spring", stiffness: 100, damping: 18 }}
                        className="relative w-full h-[320px] rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#0D1117]/80 backdrop-blur-md flex flex-col group/browser"
                        style={{ perspective: "1000px" }}
                      >
                        {/* Browser Window Header */}
                        <div className="flex items-center justify-between px-4 py-2.5 bg-[#161B22] border-b border-gray-800/80 shrink-0">
                          <div className="flex gap-1.5 shrink-0">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                          </div>

                          <div className="flex-1 max-w-[75%] mx-auto bg-[#0D1117] border border-gray-800/60 rounded-md px-3 py-1 text-[9px] font-mono text-gray-400 text-center truncate flex items-center justify-center gap-1.5 select-none">
                            <span className="text-emerald-500 text-[10px] leading-none">🔒</span>
                            <span className="truncate">{projects[activeIndex].link !== "#" ? projects[activeIndex].link.replace(/https?:\/\//, "") : "localhost:3000"}</span>
                          </div>

                          <div className="w-12" /> {/* Spacer */}
                        </div>

                        {/* Browser Screen / Video view */}
                        <div className="flex-1 relative overflow-hidden bg-[#0D1117]/50">
                          <img
                            src={projects[activeIndex].video}
                            alt={`${projects[activeIndex].title} video demo`}
                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/browser:scale-[1.03]"
                            onError={(e) => {
                              // Fallback to static image if video fails to load
                              e.target.src = projects[activeIndex].image;
                            }}
                          />

                          {/* Video Recording Badge */}
                          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-white/10 flex items-center gap-1.5 z-10 pointer-events-none">
                            <motion.div
                              animate={{ opacity: [1, 0.4, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="w-1.5 h-1.5 rounded-full bg-red-500"
                            />
                            <span className="text-[9px] font-mono text-gray-300 font-medium">LIVE DEMO</span>
                          </div>

                          {/* Glossy Overlay Reflection */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none z-0" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Right side: Content - Full width on Mobile */}
                    <div className="w-full md:w-7/12 p-5 sm:p-8 md:p-10 flex flex-col justify-center bg-[#0D1117] text-gray-300 relative h-full">
                      <div className="font-mono text-[#79C0FF] text-[10px] sm:text-xs md:text-sm mb-2 opacity-80">
                        // Project 0{activeIndex + 1}
                      </div>

                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-4 font-sans tracking-tight">
                        {projects[activeIndex].title}
                      </h3>

                      <div className="text-[11px] sm:text-xs md:text-sm text-gray-400 mb-4 sm:mb-6 font-mono leading-relaxed bg-[#161B22] p-3 sm:p-4 rounded-xl border border-gray-800">
                        <span className="text-[#FF7B72]">const</span> <span className="text-[#79C0FF]">description</span> <span className="text-[#FF7B72]">=</span> <span className="text-[#A5D6FF]">"{projects[activeIndex].description}"</span>;
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {projects[activeIndex].tech.map((t) => (
                          <span key={t} className="px-2 py-1 rounded-md bg-blue-500/10 text-[#79C0FF] border border-blue-500/20 font-mono text-[9px] sm:text-[10px] md:text-xs">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 mt-auto font-mono">
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={projects[activeIndex].github}
                          target="_blank" rel="noopener noreferrer"
                          className="btn-secondary text-[11px] sm:text-xs md:text-sm py-2 px-4 sm:py-2.5 sm:px-5 !border-gray-700 !text-gray-300 hover:!bg-gray-800 hover:!text-white transition-colors duration-300 relative group overflow-hidden"
                        >
                          <span className="relative z-10">&lt;Code /&gt;</span>
                          <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
                        </motion.a>
                        <motion.a
                          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(29,78,216,0.8)" }}
                          whileTap={{ scale: 0.95 }}
                          href={projects[activeIndex].link}
                          target="_blank" rel="noopener noreferrer"
                          className="btn-primary text-[11px] sm:text-xs md:text-sm py-2 px-4 sm:py-2.5 sm:px-5 shadow-[0_0_20px_rgba(29,78,216,0.4)] transition-all duration-300 relative group overflow-hidden"
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