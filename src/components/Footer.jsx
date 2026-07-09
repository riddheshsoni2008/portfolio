export default function Footer() {
  return (
    <footer className="relative py-10 border-t border-[var(--color-outline-variant)]">
      <div className="max-w-[1280px] mx-auto px-[24px] md:px-[64px]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="label-mono text-[var(--color-outline)] text-[12px]">
            Designed & Built by{" "}
            <span className="text-[var(--color-tech-blue)]">Riddhesh</span>
          </p>
          <p className="label-mono text-[var(--color-outline)] text-[12px]">
            © {new Date().getFullYear()} — All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
