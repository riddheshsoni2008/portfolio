"use client";

import { useState } from "react";
import { ArrowUpRight, Lock, Pause, Play } from "lucide-react";
import { projects } from "@/data/projects";
import { GithubIcon } from "./BrandIcons";
import JewelTagPreview from "./JewelTagPreview";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

function ProjectCard({ project }) {
  // The demo is a large animated image, so it only loads once someone asks for it.
  const [hovering, setHovering] = useState(false);
  const [pinned, setPinned] = useState(false);
  const playing = hovering || pinned;

  return (
    <article className="card card-hover flex h-full flex-col overflow-hidden">
      <div
        className="relative aspect-video overflow-hidden border-b border-[var(--color-line)] bg-[var(--color-panel-2)]"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {project.preview === "jeweltag" ? (
          <JewelTagPreview />
        ) : (
          <img
            src={playing && project.video ? project.video : project.image}
            alt={`${project.title} ${playing ? "demo" : "screenshot"}`}
            loading="lazy"
            className="h-full w-full object-cover object-top"
          />
        )}

        {project.video && (
          <button
            type="button"
            onClick={() => setPinned((value) => !value)}
            aria-pressed={pinned}
            className="btn btn-ghost btn-sm absolute bottom-3 right-3 min-h-[34px]! px-2.5! text-xs!"
          >
            {pinned ? <Pause className="h-3.5 w-3.5" aria-hidden="true" /> : <Play className="h-3.5 w-3.5" aria-hidden="true" />}
            {pinned ? "Stop demo" : "Play demo"}
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {project.badge && (
          <p className="mb-2 self-start rounded-md bg-[var(--color-amber)] px-2 py-0.5 text-[11px] font-semibold text-[#3b2a00]">
            {project.badge}
          </p>
        )}
        <h3 className="text-xl font-semibold text-[var(--color-text)]">{project.title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-muted)]">{project.description}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
              Live site
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
            <GithubIcon className="h-4 w-4" />
            Code
          </a>
          {project.note && (
            <span className="inline-flex items-center gap-1.5 text-xs text-[var(--color-muted)]">
              <Lock className="h-3.5 w-3.5" aria-hidden="true" />
              {project.note}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container-page">
        <SectionHeader
          number="03"
          label="Projects"
          title="Things I've built."
          subtitle="Each card has its own buttons: open the live site, read the code, or play a short demo."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={(index % 3) * 0.08} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
