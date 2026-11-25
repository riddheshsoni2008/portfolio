import { site } from "@/data/site";
import CountUp from "./CountUp";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const facts = [
  { label: "Status", value: "Open to work" },
  { label: "Based in", value: site.location },
  { label: "Education", value: site.education },
  { label: "Focus", value: "MERN stack and Next.js" },
];

const stats = [
  { value: 10, suffix: "+", label: "Projects built" },
  { value: 1, suffix: "+", label: "Years of experience" },
  { value: 9, suffix: "+", label: "Technologies" },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-page">
        <SectionHeader number="01" label="About" title="A developer who likes shipping things people use." />

        <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
          <div>
            <Reveal className="space-y-5 text-lg leading-relaxed text-[var(--color-muted)]">
              <p>
                Hi, I&apos;m Riddhesh. I&apos;m a full-stack developer, which means I build both the part of a
                website you see and the part behind it that stores data and does the work.
              </p>
              <p>
                I spent a year as an intern at Avetsa HQ working on real production apps. Since then I&apos;ve
                built my own products, including billing software that a jewellery shop uses every day. I care
                about <span className="text-[var(--color-text)] font-medium">clean code</span> and{" "}
                <span className="text-[var(--color-text)] font-medium">simple design</span>.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-8 grid grid-cols-2 gap-3">
              {facts.map((fact) => (
                <div key={fact.label} className="card p-4">
                  <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">{fact.label}</p>
                  <p className="mt-1.5 font-medium text-[var(--color-text)]">{fact.value}</p>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.15} className="mt-8 grid grid-cols-3 gap-3 border-t border-[var(--color-line)] pt-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl md:text-4xl font-bold text-[var(--color-mint)]">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">{stat.label}</p>
                </div>
              ))}
            </Reveal>
          </div>

          <Reveal delay={0.1} className="space-y-4">
            <div className="card overflow-hidden bg-gradient-to-b from-[var(--color-panel-2)] to-[var(--color-panel)]">
              <img src="/me.png" alt="Riddhesh Soni" className="mx-auto block w-full max-w-[340px]" />
            </div>

            {/* The one "code" touch in this section */}
            <div className="card overflow-hidden">
              <div className="flex items-center gap-2 border-b border-[var(--color-line)] px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-2 font-mono text-xs text-[var(--color-muted)]">developer.js</span>
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-7 text-[#cbd5e1]">
                <span className="text-[#ff7b72]">const</span> <span className="text-[#79c0ff]">riddhesh</span> = {"{\n"}
                {"  "}<span className="text-[#d2a8ff]">status</span>: <span className="text-[#a5d6ff]">&quot;Open to Work&quot;</span>,{"\n"}
                {"  "}<span className="text-[#d2a8ff]">hobbies</span>: [<span className="text-[#a5d6ff]">&quot;Coding&quot;</span>, <span className="text-[#a5d6ff]">&quot;Design&quot;</span>, <span className="text-[#a5d6ff]">&quot;Cricket&quot;</span>],{"\n"}
                {"};"}
              </pre>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
