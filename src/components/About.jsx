"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const FloatingCodeBackground = () => {
  const codeSnippets = [
    { text: "<coder />", hoverText: "Role: Full-Stack Developer", left: "10%", top: "20%", duration: 25, delay: 0, size: "1.2rem", color: "#E34F26" },
    { text: "{ stack: 'MERN' }", hoverText: "MongoDB, Express, React, Node.js", left: "70%", top: "80%", duration: 22, delay: 2, size: "1.5rem", color: "#149ECA" },
    { text: "console.log('me');", hoverText: "Tech: React, Node, Next.js, Tailwind, JS", left: "80%", top: "15%", duration: 28, delay: 5, size: "1rem", color: "#D4B830" },
    { text: "while(alive) code();", hoverText: "Passion: Building Scalable Web Apps", left: "5%", top: "70%", duration: 30, delay: 1, size: "1.1rem", color: "#339933" },
    { text: "git push origin riddhesh-coder", hoverText: "Deploying high-quality code daily", left: "40%", top: "85%", duration: 20, delay: 4, size: "1.4rem", color: "#F05032" },
    { text: "npm run start", hoverText: "Booting up creative solutions", left: "50%", top: "10%", duration: 26, delay: 3, size: "1.3rem", color: "#CB3837" },
    { text: "<!-- logic -->", hoverText: "Focus: Clean Architecture & UI/UX", left: "85%", top: "50%", duration: 24, delay: 6, size: "1.6rem", color: "#6A9955" },
    { text: "javascript", hoverText: "Core Strength: Modern JS Ecosystem", left: "15%", top: "45%", duration: 27, delay: 2, size: "1rem", color: "#D4B830" }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {codeSnippets.map((snippet, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -80, 0],
            x: [0, 30, 0],
            rotate: [0, 8, -8, 0],
            opacity: [0.25, 0.40, 0.25]
          }}
          whileHover={{ opacity: 1, scale: 1.1, zIndex: 50 }}
          transition={{
            duration: snippet.duration,
            repeat: Infinity,
            delay: snippet.delay,
            ease: "linear"
          }}
          className="absolute font-mono font-bold whitespace-nowrap drop-shadow-sm pointer-events-auto cursor-crosshair group"
          style={{
            left: snippet.left,
            top: snippet.top,
            fontSize: snippet.size,
            color: snippet.color
          }}
        >
          {snippet.text}

          {/* Hover Tooltip showing details */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-[#0D1117] border border-gray-700 text-white text-[13px] tracking-wide font-sans px-4 py-2 rounded-lg whitespace-nowrap shadow-2xl relative">
              {snippet.hoverText}
              {/* Tooltip triangle pointer */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-[#0D1117]"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // 3D Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["0.2 1", "0.6 1"] // Animates between when top hits bottom of screen and center hits bottom
  });

  // Dynamic 3D Transforms for the Left side (IDE)
  const ideRotateX = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const ideRotateY = useTransform(scrollYProgress, [0, 1], [-25, 0]);
  const ideZ = useTransform(scrollYProgress, [0, 1], [-150, 0]);
  const ideOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Dynamic 3D Transforms for the Right side (Image)
  const imgRotateX = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const imgRotateY = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const imgZ = useTransform(scrollYProgress, [0, 1], [-150, 0]);
  const imgOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Subtle Floating Code Environment */}
      <FloatingCodeBackground />

      <div className="spotlight-bg" style={{ top: "40%", left: "20%", transform: "translate(-50%, -50%)" }} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto px-[24px] md:px-[64px] relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-16">
          <span className="label-mono text-[var(--color-tech-blue)]">01.</span>
          <h2 className="headline-lg text-[var(--color-primary)] font-mono flex items-center">
            &lt;AboutMe /&gt;
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="ml-2 w-3 h-8 md:h-10 bg-[var(--color-tech-blue)] inline-block"
            />
          </h2>
          <div className="hidden sm:block flex-1 h-px bg-[var(--color-outline-variant)]" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center" style={{ perspective: "1200px" }}>
          {/* Left: Text & IDE */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="body-lg text-[var(--color-on-surface-variant)] leading-relaxed">
                Hello World! I&apos;m a Full-Stack Developer obsessed with building scalable applications and creating flawless user experiences. My code lives at the intersection of <span className="font-bold text-[var(--color-primary)]">clean architecture</span> and <span className="font-bold text-[var(--color-primary)]">creative design</span>.
              </p>
              <p className="body-lg text-[var(--color-on-surface-variant)] leading-relaxed">
                I specialize in the modern JavaScript ecosystem, rapidly transforming complex logic into high-performing, intuitive software solutions. When I&apos;m not pushing commits, I&apos;m exploring system design, contributing to open-source, or refining my tech stack.
              </p>
            </motion.div>

            {/* GenZ IDE Mockup with 3D Scroll */}
            <motion.div
              style={{
                rotateX: ideRotateX,
                rotateY: ideRotateY,
                z: ideZ,
                opacity: ideOpacity,
                transformStyle: "preserve-3d"
              }}
              className="relative"
            >
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-[#0D1117] rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-800"
              >
                <div className="flex items-center px-4 py-3 bg-[#161B22] border-b border-gray-800">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                  </div>
                  <div className="mx-auto font-mono text-xs text-gray-400">developer.js</div>
                </div>
                <div className="p-6 font-mono text-[13px] md:text-[15px] leading-loose overflow-x-auto text-gray-300">
                  <span className="text-[#FF7B72]">const</span> <span className="text-[#79C0FF]">riddhesh</span> <span className="text-[#FF7B72]">=</span> {'{'} <br />
                  &nbsp;&nbsp;<span className="text-[#D2A8FF]">status</span>: <span className="text-[#A5D6FF]">'Open to Work'</span>,<br />
                  &nbsp;&nbsp;<span className="text-[#D2A8FF]">location</span>: <span className="text-[#A5D6FF]">'Ahmedabad, Gujarat'</span>,<br />
                  &nbsp;&nbsp;<span className="text-[#D2A8FF]">education</span>: <span className="text-[#A5D6FF]">'Diploma Computer Engineering'</span>,<br />
                  &nbsp;&nbsp;<span className="text-[#D2A8FF]">hobbies</span>: [<span className="text-[#A5D6FF]">'Coding'</span>, <span className="text-[#A5D6FF]">'Design'</span>, <span className="text-[#A5D6FF]">'Cricket'</span>],<br />
                  {'};'}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Image Visuals with 3D Scroll */}
          <motion.div
            style={{
              rotateX: imgRotateX,
              rotateY: imgRotateY,
              z: imgZ,
              opacity: imgOpacity,
              transformStyle: "preserve-3d"
            }}
            className="flex justify-center items-center relative"
          >
            <div className="relative w-full max-w-[400px] aspect-[4/5]">
              {/* Animated glowing background */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[var(--color-tech-blue)] to-[#47A248] opacity-20 blur-3xl"
              />

              {/* Main Image Container */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-[2rem] bg-white border border-[var(--color-card-border)] overflow-hidden shadow-2xl flex items-end justify-center group"
              >
                {/* The Image */}
                <img
                  src="/images.jpeg"
                  alt="Developer Illustration"
                  className="relative z-10 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Glitch Overlay Effect */}
                <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none"></div>
              </motion.div>

              {/* Floating Code Badge */}
              <motion.div
                animate={{ y: [0, 15, 0], rotate: [-2, 2, -2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{ transform: "translateZ(30px)" }}
                className="absolute -right-6 bottom-20 bg-[#0D1117] px-6 py-4 rounded-2xl shadow-2xl border border-gray-800 flex items-center gap-3 z-30"
              >
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                <div className="flex flex-col font-mono">
                  <span className="text-[10px] text-gray-400">console.log</span>
                  <span className="text-[14px] text-green-400 font-bold">"Code is Art"</span>
                </div>
              </motion.div>

              {/* Floating Bracket Badge */}
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [2, -2, 2] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{ transform: "translateZ(40px)" }}
                className="absolute -left-6 top-20 bg-white/90 backdrop-blur-md px-5 py-3 rounded-xl shadow-xl border border-gray-200 flex items-center gap-2 z-30"
              >
                <span className="text-xl font-mono text-[var(--color-primary)] font-bold">{`</>`}</span>
                <span className="text-[12px] font-mono text-gray-600 font-bold tracking-wider">CLEAN CODE</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
