import { journey } from "@/data/journey";
import Reveal from "../Reveal";

// Plain version of the journey, used when 3D is unavailable or motion is reduced.
export default function JourneyTimeline() {
  return (
    <ol className="container-page pb-24 grid gap-4 md:grid-cols-2">
      {journey.map((stage, index) => (
        <Reveal as="li" key={stage.id} delay={(index % 2) * 0.08} className="card p-6">
          <p className="eyebrow">
            {String(index + 1).padStart(2, "0")} <span className="text-[var(--color-muted)]">/ {stage.when}</span>
          </p>
          <h3 className="mt-2 text-xl font-semibold text-[var(--color-text)]">{stage.title}</h3>
          <p className="mt-2 text-[var(--color-muted)] leading-relaxed">{stage.line}</p>
        </Reveal>
      ))}
    </ol>
  );
}
