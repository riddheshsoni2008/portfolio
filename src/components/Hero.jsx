"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView, AnimatePresence } from "framer-motion";
import Typewriter from "typewriter-effect";

const ArchResumeBtn = () => {
  return (
    <a
      href="/resume.pdf"
      download="Riddhesh_Resume.pdf"
      className="absolute top-10 left-1/2 -translate-x-1/2 w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] z-0 flex justify-center cursor-pointer group"
      title="Download Resume"
    >
      <motion.div
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="w-full h-full relative opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full text-[var(--color-primary)] overflow-visible font-mono">
          <defs>
            <path id="haloPath" d="M 15, 120 A 85,85 0 0,1 185, 120" />
          </defs>
          <text fontSize="14" fontWeight="bold" letterSpacing="3" fill="currentColor">
            <textPath href="#haloPath" startOffset="50%" textAnchor="middle">
              &lt; GET_RESUME.PDF /&gt;
            </textPath>
          </text>
        </svg>
      </motion.div>
    </a>
  );
};

const WanderingBadge = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const badges = [
    { text: "Passionate coder", top: "70%", left: "-15%", right: "auto" },
    { text: "Problem solver", top: "15%", left: "-10%", right: "auto" },
    { text: "UI/UX Thinker", top: "20%", left: "auto", right: "-10%" },
    { text: "Clean Coder", top: "75%", left: "auto", right: "-15%" },
    { text: "Node.js developer", top: "35%", left: "auto", right: "-20%" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % badges.length);
    }, 4500); // Change text and position every 4.5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -15 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 15 }}
          className="absolute bg-white/90 backdrop-blur-md px-4 sm:px-5 py-2 sm:py-3 rounded-2xl shadow-xl border border-white/20 flex items-center gap-2 sm:gap-3 pointer-events-auto"
          style={{ top: badges[currentIndex].top, left: badges[currentIndex].left, right: badges[currentIndex].right }}
        >
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse ring-4 ring-green-100 shrink-0"></div>
          <span className="label-mono text-[13px] text-[var(--color-on-surface)] uppercase font-bold tracking-wider">
            <Typewriter
              options={{
                strings: [badges[currentIndex].text],
                autoStart: true,
                loop: false,
                delay: 60,
                cursor: '|',
              }}
            />
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Counter = ({ to, suffix = "" }) => {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-10px" });

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || !isInView) return;

    const controls = animate(0, to, {
      duration: 2.5,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = Math.round(value) + suffix;
      },
    });

    return () => controls.stop();
  }, [to, suffix, isInView]);

  return <span ref={nodeRef}>0{suffix}</span>;
};

const FloatingIcons = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Code Brackets */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -40, 20, 0],
          rotate: [0, 15, -10, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 left-8 md:left-12 text-5xl font-mono text-[var(--color-primary)] opacity-20"
      >
        {`{}`}
      </motion.div>

      {/* Array */}
      <motion.div
        animate={{
          x: [0, -30, 40, 0],
          y: [0, 50, -20, 0],
          rotate: [0, -15, 10, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-40 left-10 md:left-24 text-6xl font-mono text-[var(--color-tech-blue)] opacity-15"
      >
        {`[]`}
      </motion.div>

      {/* JS Text */}
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -30, -10, 0],
          rotate: [0, 20, -5, 0]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 text-6xl font-bold font-mono text-[var(--color-accent)] opacity-40"
      >
        JS
      </motion.div>

      {/* React Logo */}
      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -30, 0],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 right-8 md:right-16 text-[#61DAFB] opacity-30"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <svg
            className="w-16 h-16"
            viewBox="-11.5 -10.23174 23 20.46348"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="0" cy="0" r="2.05" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="1" fill="none">
              <ellipse rx="11" ry="4.2" />
              <ellipse rx="11" ry="4.2" transform="rotate(60)" />
              <ellipse rx="11" ry="4.2" transform="rotate(120)" />
            </g>
          </svg>
        </motion.div>
      </motion.div>

      {/* Node.js Logo */}
      <motion.div
        animate={{ 
          x: [0, 30, -20, 0], 
          y: [0, -30, 20, 0],
          rotate: [0, 15, -10, 0]
        }}
        transition={{ duration: 23, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-24 right-10 md:right-28 text-[#339933] opacity-30"
      >
        <svg viewBox="0 0 118 118" className="w-14 h-14" fill="currentColor">
          <path d="M57.6 0L1.7 32.2v64.6L57.6 118l55.8-32.2V32.2L57.6 0zm45.3 90.7L57.6 106 12.3 90.7V37.9L57.6 11.9l45.3 26v52.8z"/>
          <path d="M57.6 51l-18 10.4v20.9l18 10.4 18-10.4V61.4L57.6 51zm7.8 26.6l-7.8 4.5-7.8-4.5v-9l7.8-4.5 7.8 4.5v9z"/>
        </svg>
      </motion.div>
    </div>
  );
};

export default function Hero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("visible");
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="section-animate relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      style={{
        backgroundColor: "var(--color-surface)",
        backgroundImage: "radial-gradient(var(--color-outline-variant) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      <FloatingIcons />
      <div className="max-w-[1280px] mx-auto px-[24px] md:px-[64px] w-full flex flex-col md:flex-row items-center gap-12 relative z-10">
        <div className="flex-1 flex flex-col items-center text-center md:items-start md:text-left">
          {/* Tag */}
          <div className="chip mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="label-mono ml-2">Available for opportunities</span>
          </div>

          {/* Headline */}
          <h1 className="display-lg text-[var(--color-on-surface)] mb-6 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-x-4">
            <span>Hi, I&apos;m</span>
            <span className="text-[var(--color-primary)] drop-shadow-[0_0_15px_rgba(29,78,216,0.4)]">
              <Typewriter
                options={{
                  strings: ['Riddhesh', 'a Full-Stack Dev'],
                  autoStart: true,
                  loop: true,
                  delay: 80,
                  deleteSpeed: 50,
                }}
              />
            </span>
          </h1>

          {/* Subheadline */}
          <p className="body-lg text-[var(--color-on-surface-variant)] max-w-xl mb-10">
            A passionate{" "}
            <span style={{ fontWeight: 600, color: "var(--color-primary)" }}>
              Full-Stack Developer
            </span>{" "}
            who builds performant, scalable, and beautiful web applications
            with modern technologies.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="btn-primary font-mono tracking-tight"
            >
              viewMyWork()
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="btn-secondary font-mono tracking-tight"
            >
              getInTouch()
            </motion.a>
          </div>

          {/* Stats */}
          <div className="flex gap-10 mt-16 pt-10 border-t border-[var(--color-card-border)] w-full">
            {[
              { value: 10, suffix: "+", label: "Projects Built" },
              { value: 1, suffix: "+", label: "Years Experience" },
              { value: 9, suffix: "+", label: "Technologies" },
            ].map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <p className="headline-lg text-[var(--color-primary)]">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </p>
                <p className="label-mono text-[var(--color-on-surface-variant)] mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Image with High-End Presentation */}
        <div className="flex-1 hidden md:flex items-center justify-center relative mt-10 md:mt-0">
          <div className="relative w-[400px] h-[500px] lg:w-[500px] lg:h-[620px]">
            {/* Animated glowing background */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-accent)] opacity-20 blur-3xl"
            />

            {/* Main Image Container */}
            <motion.div

              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-white to-[var(--color-surface-container)] border border-white overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.1)] flex items-end justify-center"
            >
              {/* Inner ambient gradients */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--color-accent)] rounded-full blur-3xl opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--color-primary)] rounded-full blur-3xl opacity-10"></div>
              {/* Arch/Halo Resume Button behind image */}
              <ArchResumeBtn />

              {/* The Image */}
              <img
                src="/me.png"
                alt="Riddhesh Profile"
                className="relative z-10 w-full h-auto object-cover object-bottom drop-shadow-xl"
                style={{ marginBottom: "-1px" }}
              />
            </motion.div>



            {/* Dynamic Wandering Badge */}
            <WanderingBadge />
          </div>
        </div>
      </div>


    </section>
  );
}
