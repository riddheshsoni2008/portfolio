"use client";

import { useEffect, useRef } from "react";

export default function Contact() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("visible"); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contact" ref={ref} className="section-animate relative py-24 md:py-32">
      <div className="spotlight-bg" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
      <div className="max-w-[1280px] mx-auto px-[24px] md:px-[64px] relative z-10">
        <div className="max-w-xl mx-auto text-center">
          <span className="label-mono text-[var(--color-tech-blue)]">05. What&apos;s Next?</span>
          <h2 className="display-lg text-[var(--color-primary)] mt-4 mb-6">Get In Touch</h2>
          <p className="body-lg text-[var(--color-on-surface-variant)] mb-12">
            I&apos;m currently looking for new opportunities. Whether you have a question, 
            a project idea, or just want to say hi — my inbox is always open!
          </p>

          <form className="flex flex-col gap-4 text-left mb-10 project-card p-8">
            <div>
              <label className="label-mono text-[var(--color-primary)] mb-2 block">Name</label>
              <input 
                type="text" 
                placeholder="YOUR NAME" 
                className="w-full bg-white border border-[#E2E8F0] rounded-[0.5rem] p-3 text-[var(--color-primary)] focus:border-[var(--color-tech-blue)] focus:outline-none transition-colors label-mono"
              />
            </div>
            <div>
              <label className="label-mono text-[var(--color-primary)] mb-2 block">Email</label>
              <input 
                type="email" 
                placeholder="YOUR@EMAIL.COM" 
                className="w-full bg-white border border-[#E2E8F0] rounded-[0.5rem] p-3 text-[var(--color-primary)] focus:border-[var(--color-tech-blue)] focus:outline-none transition-colors label-mono"
              />
            </div>
            <div>
              <label className="label-mono text-[var(--color-primary)] mb-2 block">Message</label>
              <textarea 
                placeholder="HOW CAN I HELP?" 
                rows={4}
                className="w-full bg-white border border-[#E2E8F0] rounded-[0.5rem] p-3 text-[var(--color-primary)] focus:border-[var(--color-tech-blue)] focus:outline-none transition-colors label-mono resize-none"
              ></textarea>
            </div>
            <button type="button" className="btn-primary w-full mt-2">
              Send Message
            </button>
          </form>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            {[
              { label: "GitHub", href: "https://github.com", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> },
              { label: "LinkedIn", href: "https://linkedin.com", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
              { label: "Twitter", href: "https://twitter.com", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-[var(--color-outline-variant)] flex items-center justify-center text-[var(--color-on-surface-variant)] hover:text-[var(--color-tech-blue)] hover:border-[var(--color-tech-blue)] transition-all duration-300 hover:-translate-y-1"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
