import { ArrowUp } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "./BrandIcons";

const socials = [
  { label: "GitHub", href: site.socials.github, Icon: GithubIcon },
  { label: "LinkedIn", href: site.socials.linkedin, Icon: LinkedinIcon },
  { label: "Instagram", href: site.socials.instagram, Icon: InstagramIcon },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-panel)]">
      <div className="container-page py-12 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="font-mono font-semibold text-[var(--color-text)]">
            <span className="text-[var(--color-mint)]">&lt;</span>Riddhesh<span className="text-[var(--color-mint)]"> /&gt;</span>
          </p>
          <p className="mt-3 text-sm text-[var(--color-muted)] leading-relaxed">
            {site.role} in {site.location}. I build web apps that real people use.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-[var(--color-muted)] hover:text-[var(--color-mint)] transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex gap-2">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="btn btn-ghost btn-sm px-2.5!"
            >
              <Icon className="w-[18px] h-[18px]" />
            </a>
          ))}
        </div>
      </div>

      <div className="container-page py-5 border-t border-[var(--color-line)] flex items-center justify-between gap-4">
        <p className="text-xs text-[var(--color-muted)] font-mono">
          © {new Date().getFullYear()} {site.name}
        </p>
        <a href="#top" className="btn btn-ghost btn-sm">
          <ArrowUp className="w-4 h-4" aria-hidden="true" />
          Back to top
        </a>
      </div>
    </footer>
  );
}
