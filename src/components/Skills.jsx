"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillCategories = [
  {
    title: "frontend.js",
    color: "#61DAFB", // React Cyan
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "Framer Motion"],
  },
  {
    title: "backend.js",
    color: "#339933", // Node Green
    skills: ["Node.js", "Express.js", "REST APIs", "GraphQL", "Socket.io", "JWT Auth"],
  },
  {
    title: "database.db",
    color: "#47A248", // MongoDB Green
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Mongoose"],
  },
  {
    title: "devops.config",
    color: "#F05032", // Git Orange
    skills: ["Git", "Docker", "AWS", "Vercel", "Linux", "CI/CD"],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#09090B] overflow-hidden"
    >
      {/* Aesthetic Glowing Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto px-[24px] md:px-[64px] relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-20">
          <span className="label-mono text-[#149ECA]">02.</span>
          <h2 className="headline-lg text-white font-mono flex items-center">
            &lt;TechStack /&gt;
            <motion.span 
              animate={{ opacity: [1, 0, 1] }} 
              transition={{ duration: 1, repeat: Infinity }}
              className="ml-2 w-3 h-8 md:h-10 bg-[#149ECA] inline-block"
            />
          </h2>
          <div className="hidden sm:block flex-1 h-px bg-gray-800" />
        </motion.div>

        {/* Skills Grid - Coding Aesthetic */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8" style={{ perspective: "1000px" }}>
          {skillCategories.map((category, idx) => (
            <motion.div
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                rotateX: 5,
                rotateY: -5,
                boxShadow: `0px 20px 40px -10px ${category.color}40`,
                borderColor: category.color
              }}
              key={category.title}
              className="bg-[#0D1117] rounded-xl overflow-hidden border border-gray-800 transition-colors duration-300 flex flex-col h-full"
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#161B22] border-b border-gray-800">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                </div>
                <span 
                  className="font-mono text-xs opacity-80 font-semibold"
                  style={{ color: category.color }}
                >
                  {category.title}
                </span>
              </div>

              {/* Code Content */}
              <div className="p-6 font-mono text-[13px] md:text-[14px] leading-loose flex-grow overflow-x-auto text-gray-300">
                <span className="text-[#FF7B72]">export const</span> <span className="text-[#79C0FF]">{category.title.split('.')[0]}</span> <span className="text-[#FF7B72]">=</span> {'['}
                
                <div className="pl-4 border-l border-gray-700/50 ml-2 my-2 space-y-1 flex flex-col">
                  {category.skills.map((skill, index) => (
                    <motion.div 
                      key={skill}
                      whileHover={{ x: 5, color: category.color }}
                      className="transition-colors duration-200 cursor-default"
                    >
                      <span className="text-[#A5D6FF]">"{skill}"</span>
                      {index < category.skills.length - 1 && <span className="text-gray-400">,</span>}
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
