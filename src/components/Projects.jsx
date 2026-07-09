"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

const projects = [
  {
    title: "LearnStack",
    description: "A comprehensive e-learning platform with real-time collaboration, hackathon management, and interactive dashboards.",
    tech: ["React", "Node.js", "MongoDB", "Socket.io"],
    link: "#", github: "#",
    color: "bg-blue-100",
    imageEmoji: "🎓"
  },
  {
    title: "Druto - Business Manager",
    description: "Full-featured business management app with customer tracking, campaign management, and analytics dashboards.",
    tech: ["Next.js", "PostgreSQL", "Prisma", "TypeScript"],
    link: "#", github: "#",
    color: "bg-yellow-100",
    imageEmoji: "📊"
  },
  {
    title: "Portfolio Website",
    description: "High-end developer portfolio with WebGL shader backgrounds, smooth animations, and modern SaaS-inspired design.",
    tech: ["Next.js", "Tailwind CSS", "WebGL", "Framer Motion"],
    link: "#", github: "#",
    color: "bg-indigo-100",
    imageEmoji: "✨"
  },
  {
    title: "Real-Time Chat App",
    description: "Full-stack messaging app with real-time communication, media sharing, read receipts, and encryption support.",
    tech: ["React", "Firebase", "WebRTC", "Node.js"],
    link: "#", github: "#",
    color: "bg-blue-50",
    imageEmoji: "💬"
  },
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

          {/* Header */}
          <div className="w-full max-w-[1280px] mx-auto px-[24px] md:px-[64px] absolute top-24 left-0 right-0 z-20">
            <div className="flex items-center gap-4 mb-2">
              <span className="label-mono text-[var(--color-primary)]">03.</span>
              <h2 className="headline-lg text-[var(--color-on-surface)]">Featured Projects</h2>
            </div>
            <p className="body-lg text-[var(--color-on-surface-variant)] max-w-2xl">
              Scroll down to view my latest work.
            </p>
          </div>

          {/* Cards Container */}
          <div className="relative w-full max-w-[1000px] h-[500px] mt-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <div className="project-card flex flex-col md:flex-row h-full">
                  {/* Left side: Image/Color */}
                  <div className={`w-full md:w-1/2 h-48 md:h-full ${projects[activeIndex].color} flex flex-col items-center justify-center`}>
                    <span className="text-6xl md:text-8xl drop-shadow-lg animate-bounce">
                      {projects[activeIndex].imageEmoji}
                    </span>
                  </div>
                  {/* Right side: Content */}
                  <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
                    <div className="label-mono text-[var(--color-accent)] mb-2">
                      Project 0{activeIndex + 1}
                    </div>
                    <h3 className="headline-md text-[var(--color-primary)] mb-4">
                      {projects[activeIndex].title}
                    </h3>
                    <p className="body-lg text-[var(--color-on-surface-variant)] mb-8">
                      {projects[activeIndex].description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {projects[activeIndex].tech.map((t) => (
                        <span key={t} className="chip label-mono text-[11px]">{t}</span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 mt-auto">
                      <a href={projects[activeIndex].github} className="btn-secondary text-sm">
                        View Code
                      </a>
                      <a href={projects[activeIndex].link} className="btn-primary text-sm">
                        Live Demo
                      </a>
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