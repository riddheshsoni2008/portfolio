import Reveal from "./Reveal";

export default function SectionHeader({ number, label, title, subtitle, className = "" }) {
  return (
    <Reveal className={`mb-10 md:mb-14 max-w-2xl ${className}`}>
      <p className="eyebrow mb-3">
        {number} <span className="text-[var(--color-muted)]">/</span> {label}
      </p>
      <h2 className="text-3xl md:text-[44px] md:leading-[1.1] font-bold tracking-tight text-[var(--color-text)]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-[var(--color-muted)] leading-relaxed">{subtitle}</p>
      )}
    </Reveal>
  );
}
