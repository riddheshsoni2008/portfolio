"use client";

import { useState } from "react";
import { CheckCircle2, Mail, Send, TriangleAlert } from "lucide-react";
import { site } from "@/data/site";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const EMPTY_FORM = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  // idle | sending | success | error
  const [status, setStatus] = useState("idle");
  const [errorText, setErrorText] = useState("");

  const handleChange = (event) => {
    setFormData((data) => ({ ...data, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    setErrorText("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setFormData(EMPTY_FORM);
      } else {
        setStatus("error");
        setErrorText(data.error || "The message could not be sent.");
      }
    } catch {
      setStatus("error");
      setErrorText("The message could not be sent. Check your connection and try again.");
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container-page">
        <SectionHeader
          number="06"
          label="Contact"
          title="Let's build something."
          subtitle="Have a role, a project or a question? Send a message and I'll reply by email."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-10">
          <Reveal className="space-y-3">
            <a href={`mailto:${site.email}`} className="card card-hover flex items-center gap-4 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-panel-2)] text-[var(--color-mint)]">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-[var(--color-muted)]">Email</span>
                <span className="block truncate font-medium text-[var(--color-text)]">{site.email}</span>
              </span>
            </a>
            <a href={site.socials.github} target="_blank" rel="noopener noreferrer" className="card card-hover flex items-center gap-4 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-panel-2)] text-[var(--color-mint)]">
                <GithubIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm text-[var(--color-muted)]">GitHub</span>
                <span className="block font-medium text-[var(--color-text)]">riddheshsoni2008</span>
              </span>
            </a>
            <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="card card-hover flex items-center gap-4 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-panel-2)] text-[var(--color-mint)]">
                <LinkedinIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm text-[var(--color-muted)]">LinkedIn</span>
                <span className="block font-medium text-[var(--color-text)]">Riddhesh Soni</span>
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="card p-6 md:p-8">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm text-[var(--color-muted)]">Your name</span>
                  <input name="name" value={formData.name} onChange={handleChange} required autoComplete="name" placeholder="Jane Doe" className="field" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm text-[var(--color-muted)]">Your email</span>
                  <input name="email" type="email" value={formData.email} onChange={handleChange} required autoComplete="email" placeholder="your@email.com" className="field" />
                </label>
              </div>
              <label className="mt-4 block">
                <span className="mb-1.5 block text-sm text-[var(--color-muted)]">Subject (optional)</span>
                <input name="subject" value={formData.subject} onChange={handleChange} placeholder="What is it about?" className="field" />
              </label>
              <label className="mt-4 block">
                <span className="mb-1.5 block text-sm text-[var(--color-muted)]">Message</span>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} placeholder="Tell me a little about it…" className="field resize-y" />
              </label>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button type="submit" disabled={status === "sending"} className="btn btn-primary">
                  <Send className="h-4 w-4" aria-hidden="true" />
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>

                <p role="status" aria-live="polite" className="text-sm">
                  {status === "success" && (
                    <span className="inline-flex items-center gap-2 text-[var(--color-mint)]">
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      Message sent. Thank you!
                    </span>
                  )}
                  {status === "error" && (
                    <span className="inline-flex items-center gap-2 text-[#fb7185]">
                      <TriangleAlert className="h-4 w-4" aria-hidden="true" />
                      {errorText}
                    </span>
                  )}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
