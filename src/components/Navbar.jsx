"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { navLinks, site } from "@/data/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 20));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled || mobileOpen
          ? "bg-[rgba(8,13,24,0.85)] backdrop-blur-xl border-b border-[var(--color-line)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="container-page flex items-center justify-between h-[68px]" aria-label="Main">
        <a href="#top" className="font-mono text-[15px] font-semibold text-[var(--color-text)] hover:text-[var(--color-mint)] transition-colors">
          <span className="text-[var(--color-mint)]">&lt;</span>Riddhesh<span className="text-[var(--color-mint)]"> /&gt;</span>
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-lg text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-white/5 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a href={site.resume.href} download={site.resume.fileName} className="btn btn-primary btn-sm">
            <Download className="w-4 h-4" aria-hidden="true" />
            Resume
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="btn btn-ghost btn-sm px-2.5! lg:hidden!"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden container-page pb-4 flex flex-col">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-3 border-t border-[var(--color-line)] text-[var(--color-muted)] hover:text-[var(--color-mint)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="absolute bottom-[-1px] left-0 right-0 h-[2px] origin-left bg-[var(--color-mint)]"
      />
    </header>
  );
}
