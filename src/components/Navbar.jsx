"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";



const navLinks = [
  { label: "About", href: "#about", color: "#47A248" }, // MongoDB Green
  { label: "Skills", href: "#skills", color: "#333333" }, // Express Grey
  { label: "Projects", href: "#projects", color: "#149ECA" }, // React Cyan (darker for light mode visibility)
  { label: "Experience", href: "#experience", color: "#339933" }, // Node Green
  { label: "Contact", href: "#contact", color: "#D4B830" }, // JS Yellow (darker for light mode visibility)
];

const LOGO = "<RIDDHESH/>"
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-[rgba(248,249,255,0.9)] backdrop-blur-xl shadow-[0_1px_3px_rgba(30,41,59,0.05)] border-b border-[#E2E8F0]"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-[1280px] mx-auto px-[24px] md:px-[64px]">
        <div className="flex items-center justify-between h-[80px]">
          {/* Logo */}
          <a
            href="#"
            className="label-mono font-bold text-[var(--color-primary)] hover:text-[var(--color-tech-blue)] transition-colors duration-300 flex items-center"
            style={{ fontSize: "16px" }}
          >
            <h2> {LOGO} </h2>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="label-mono text-[var(--color-on-surface-variant)] hover:text-[var(--color-tech-blue)] transition-colors duration-300 relative group text-[13px] px-3 py-1 flex items-center"
                whileHover="hover"
                initial="rest"
              >
                <motion.span
                  variants={{ rest: { opacity: 0, x: 5 }, hover: { opacity: 1, x: -4 } }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 font-bold"
                  style={{ color: link.color }}
                >
                  &lt;
                </motion.span>

                <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">
                  {link.label}
                </span>

                <motion.span
                  variants={{ rest: { opacity: 0, x: -5 }, hover: { opacity: 1, x: 4 } }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 font-bold"
                  style={{ color: link.color }}
                >
                  /&gt;
                </motion.span>
              </motion.a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-[var(--color-primary)] rounded transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""
                }`}
            />
            <span
              className={`w-6 h-0.5 bg-[var(--color-primary)] rounded transition-all duration-300 ${mobileOpen ? "opacity-0" : ""
                }`}
            />
            <span
              className={`w-6 h-0.5 bg-[var(--color-primary)] rounded transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${mobileOpen ? "max-h-96 pb-6" : "max-h-0"
            }`}
        >
          <div className="flex flex-col gap-4 pt-4 border-t border-[#E2E8F0]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="label-mono text-[var(--color-on-surface-variant)] hover:text-[var(--color-tech-blue)] transition-colors pl-2"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
