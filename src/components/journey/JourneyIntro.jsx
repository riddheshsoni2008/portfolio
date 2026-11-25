"use client";

import dynamic from "next/dynamic";
import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useInView, useMotionValue, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight, ChevronsDown, Download, Mail } from "lucide-react";
import { journey } from "@/data/journey";
import { site } from "@/data/site";
import JourneyTimeline from "./JourneyTimeline";

// three.js only runs in the browser, so the scene is loaded client-side on demand.
const JourneyScene = dynamic(() => import("./JourneyScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center font-mono text-sm text-[var(--color-muted)]">
      loading journey…
    </div>
  ),
});

const COUNT = journey.length;
// The first slice of the scroll belongs to the hero text; the walk starts after it.
const HERO_PART = 0.1;

const noopSubscribe = () => () => {};

let webglSupport;
function supportsWebGL() {
  if (webglSupport === undefined) {
    try {
      const canvas = document.createElement("canvas");
      webglSupport = Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(callback) {
  const media = window.matchMedia(REDUCED_QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function HeroCopy() {
  return (
    <>
      <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[rgba(15,23,38,0.7)] px-3 py-1.5 font-mono text-xs text-[var(--color-muted)] backdrop-blur-md">
        <span className="h-2 w-2 rounded-full bg-[var(--color-mint)] animate-pulse" />
        Available for opportunities
      </p>
      <p className="eyebrow mt-5">
        {site.name} <span className="text-[var(--color-muted)]">·</span> {site.role}
      </p>
      <h1 className="mt-3 max-w-3xl text-[40px] leading-[1.05] sm:text-6xl md:text-7xl font-bold tracking-tight text-[var(--color-text)]">
        I build web apps that <span className="text-[var(--color-mint)]">real people use.</span>
      </h1>
      <div className="mt-7 flex flex-wrap gap-3">
        <a href="#projects" className="btn btn-primary">
          View projects
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </a>
        <a href={site.resume.href} download={site.resume.fileName} className="btn btn-ghost">
          <Download className="w-4 h-4" aria-hidden="true" />
          Download resume
        </a>
      </div>
    </>
  );
}

export default function JourneyIntro() {
  const sectionRef = useRef(null);
  const progressRef = useRef(0);
  const introRef = useRef(0);
  const labelsRef = useRef([]);
  const [active, setActive] = useState(0);
  const [started, setStarted] = useState(false);

  const webgl = useSyncExternalStore(noopSubscribe, supportsWebGL, () => true);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false
  );
  const inView = useInView(sectionRef);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  // Set by hand below: a useTransform() here gets handed to the browser's scroll
  // timeline, which ignored the clamped range and left the hero text visible.
  const heroOpacity = useMotionValue(1);
  const heroY = useMotionValue(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const t = Math.min(Math.max((p - HERO_PART) / (1 - HERO_PART), 0), 1);
    heroOpacity.set(1 - Math.min(p / (HERO_PART * 0.7), 1));
    heroY.set(-48 * Math.min(p / HERO_PART, 1));
    progressRef.current = t;
    introRef.current = Math.min(p / HERO_PART, 1);
    setStarted(p > HERO_PART * 0.6);
    setActive(Math.round(t * (COUNT - 1)));
  });

  const jumpTo = useCallback((index) => {
    const el = sectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    const p = HERO_PART + (1 - HERO_PART) * (index / (COUNT - 1));
    window.scrollTo({ top: top + p * range + 1, behavior: "smooth" });
  }, []);

  if (reducedMotion || !webgl) {
    return (
      <section id="top" ref={sectionRef}>
        <div className="container-page pt-36 pb-14">
          <HeroCopy />
          <p className="mt-8 max-w-xl text-lg text-[var(--color-muted)]">
            My journey so far, from my first line of code to software a shop runs every day.
          </p>
        </div>
        <JourneyTimeline />
      </section>
    );
  }

  const stage = journey[active];
  const isLast = active === COUNT - 1;

  return (
    <section id="top" ref={sectionRef} className="relative" style={{ height: `${(COUNT + 1) * 80}vh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          <JourneyScene progressRef={progressRef} introRef={introRef} labelsRef={labelsRef} active={active} running={inView} />
        </div>

        {/* Island name tags: the scene moves these every frame to sit above each island */}
        <div className="pointer-events-none absolute inset-0 hidden sm:block">
          {journey.map((item, index) => (
            <button
              key={item.id}
              ref={(el) => {
                labelsRef.current[index] = el;
              }}
              type="button"
              onClick={() => jumpTo(index)}
              style={{ visibility: "hidden" }}
              className={`pointer-events-auto absolute left-0 top-0 flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 font-mono text-xs backdrop-blur-md transition-colors ${
                index === active
                  ? "border-[var(--color-mint)] bg-[rgba(8,13,24,0.9)] text-[var(--color-text)]"
                  : "border-[var(--color-line)] bg-[rgba(8,13,24,0.6)] text-[var(--color-muted)] hover:border-[var(--color-mint)] hover:text-[var(--color-text)]"
              }`}
            >
              <span className="text-[var(--color-mint)]">{String(index + 1).padStart(2, "0")}</span>
              {item.title}
            </button>
          ))}
        </div>

        {/* Darkens the lower part so text stays readable over the scene */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[var(--color-ink)] via-[rgba(8,13,24,0.75)] to-transparent" />

        <a href="#about" className="btn btn-ghost btn-sm absolute right-4 top-[84px] z-20 md:right-10">
          Skip intro
          <ChevronsDown className="w-4 h-4" aria-hidden="true" />
        </a>

        {/* Hero text: fades out as the walk begins */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY, pointerEvents: started ? "none" : "auto" }}
          className="absolute inset-x-0 bottom-0 z-10 pb-10 md:pb-16"
        >
          <div className="container-page">
            <HeroCopy />
            <p className="mt-8 flex items-center gap-2 text-sm text-[var(--color-muted)]">
              <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }} className="text-[var(--color-mint)]">
                <ChevronsDown className="w-4 h-4" aria-hidden="true" />
              </motion.span>
              Scroll to walk through my journey
            </p>
          </div>
        </motion.div>

        {/* Caption for the current stage */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 pb-6 md:pb-12">
          <div className="container-page">
            <AnimatePresence mode="wait">
              {started && (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="pointer-events-auto max-w-md rounded-2xl border border-[var(--color-line)] bg-[rgba(15,23,38,0.88)] p-5 backdrop-blur-xl md:p-6"
                >
                  <p className="eyebrow">
                    Stage {String(active + 1).padStart(2, "0")}
                    <span className="text-[var(--color-muted)]"> / {String(COUNT).padStart(2, "0")} · {stage.when}</span>
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--color-text)] md:text-3xl">{stage.title}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-muted)] md:text-base">{stage.line}</p>
                  {isLast && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      <a href="#projects" className="btn btn-primary btn-sm">
                        See my work
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </a>
                      <a href="#contact" className="btn btn-ghost btn-sm">
                        <Mail className="w-4 h-4" aria-hidden="true" />
                        Contact me
                      </a>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Stage dots: jump straight to any point of the journey */}
        <div className="absolute right-3 top-1/2 z-20 flex -translate-y-1/2 flex-col md:right-9">
          {journey.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => jumpTo(index)}
              aria-label={`Go to stage ${index + 1}: ${item.title}`}
              aria-current={started && index === active ? "step" : undefined}
              className="group relative flex h-7 w-7 cursor-pointer items-center justify-center"
            >
              <span
                className={`rounded-full transition-all duration-300 ${
                  started && index === active
                    ? "h-3 w-3 bg-[var(--color-mint)] shadow-[0_0_12px_var(--color-mint)]"
                    : "h-2 w-2 bg-[var(--color-line)] group-hover:bg-[var(--color-mint)]"
                }`}
              />
              <span className="pointer-events-none absolute right-8 hidden whitespace-nowrap rounded-md border border-[var(--color-line)] bg-[var(--color-panel)] px-2 py-1 font-mono text-xs text-[var(--color-text)] opacity-0 transition-opacity group-hover:opacity-100 md:block">
                {item.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
