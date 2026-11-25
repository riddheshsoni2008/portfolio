import { skillCategories } from "@/data/skills";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Skills() {
  return (
    <section id="skills" className="section bg-[var(--color-panel)]/40 border-y border-[var(--color-line)]">
      <div className="container-page">
        <SectionHeader
          number="02"
          label="Skills"
          title="The tools I work with."
          subtitle="Grouped by what each one is for, so you don't need to be a developer to follow."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <Reveal key={category.file} delay={(index % 3) * 0.08} className="card card-hover p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-[var(--color-text)]">{category.label}</h3>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">{category.plain}</p>
                </div>
                <span
                  className="shrink-0 rounded-md px-2 py-1 font-mono text-[11px]"
                  style={{ color: category.color, backgroundColor: `${category.color}1a` }}
                >
                  {category.file}
                </span>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li key={skill} className="chip">
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
