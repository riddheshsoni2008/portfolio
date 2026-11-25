import { Check } from "lucide-react";
import { experiences } from "@/data/experience";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Experience() {
  return (
    <section id="experience" className="section bg-[var(--color-panel)]/40 border-y border-[var(--color-line)]">
      <div className="container-page">
        <SectionHeader number="05" label="Experience" title="Where I've worked." />

        <ol className="relative space-y-6 border-l border-[var(--color-line)] pl-6 md:pl-10">
          {experiences.map((exp, index) => (
            <Reveal as="li" key={exp.company} delay={index * 0.1} className="relative">
              <span
                className={`absolute -left-[31px] top-7 h-3.5 w-3.5 rounded-full border-2 border-[var(--color-ink)] md:-left-[47px] ${
                  exp.status === "active" ? "bg-[var(--color-mint)] shadow-[0_0_12px_var(--color-mint)]" : "bg-[var(--color-muted)]"
                }`}
              />
              <div className="card p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-[var(--color-text)]">{exp.role}</h3>
                    <p className="mt-1 text-[var(--color-mint)]">{exp.company}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="chip">{exp.period}</span>
                    <span className="chip">{exp.duration}</span>
                  </div>
                </div>

                <p className="mt-4 leading-relaxed text-[var(--color-muted)]">{exp.description}</p>

                <ul className="mt-5 grid gap-2.5 md:grid-cols-2">
                  {exp.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2.5 text-[15px] text-[#cbd5e1]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-mint)]" aria-hidden="true" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-2 border-t border-[var(--color-line)] pt-5">
                  {exp.techUsed.map((tech) => (
                    <li key={tech} className="chip">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
