"use client";

import { useEffect, useRef } from "react";

const experiences = [
  {
    role: "Full-Stack Developer",
    company: "Freelance / Personal Projects",
    period: "2024 — Present",
    description: "Building full-stack web applications using React, Next.js, Node.js, and MongoDB. Focused on creating scalable, performant solutions with modern UI/UX.",
    highlights: ["Built 10+ production-ready projects", "Implemented real-time features with WebSockets", "Optimized applications for performance and SEO"],
  },
  {
    role: "Frontend Developer",
    company: "Open Source & Hackathons",
    period: "2023 — 2024",
    description: "Contributed to open-source projects and participated in hackathons, sharpening skills in collaborative development and rapid prototyping.",
    highlights: ["Contributed to community-driven projects", "Won recognition in coding competitions", "Mastered React ecosystem and state management"],
  },
];

export default function Experience() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("visible"); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="experience" ref={ref} className="section-animate relative py-24 md:py-32">
      <div className="spotlight-bg" style={{ top: "50%", right: "0", transform: "translate(20%, -50%)" }} />
      <div className="max-w-[1280px] mx-auto px-[24px] md:px-[64px] relative z-10">
        <div className="flex items-center gap-4 mb-16">
          <span className="label-mono text-[var(--color-tech-blue)]">04.</span>
          <h2 className="headline-lg text-[var(--color-primary)]">Experience</h2>
          <div className="hidden sm:block flex-1 h-px" style={{ backgroundColor: "var(--color-outline-variant)" }} />
        </div>

        <div className="max-w-3xl">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative pl-8 pb-12 last:pb-0 group">
              {/* Timeline line */}
              <div className="absolute left-0 top-2 bottom-0 w-px" style={{ backgroundColor: "var(--color-outline-variant)" }} />
              {/* Timeline dot */}
              <div className="absolute left-0 top-2 w-2.5 h-2.5 -translate-x-[4.5px] rounded-full bg-[var(--color-tech-blue)] ring-4 ring-[var(--color-surface)]" />

              <div className="project-card p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                  <h3 className="headline-md text-[var(--color-primary)]">{exp.role}</h3>
                  <span className="label-mono text-[var(--color-tech-blue)]">{exp.period}</span>
                </div>
                <p className="body-md font-semibold text-[var(--color-tech-blue)] mb-3">{exp.company}</p>
                <p className="body-md text-[var(--color-on-surface-variant)] mb-4">{exp.description}</p>
                <ul className="space-y-2">
                  {exp.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 body-md text-[var(--color-on-surface-variant)]">
                      <span className="text-[var(--color-tech-blue)] mt-1 shrink-0">▹</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
