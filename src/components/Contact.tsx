"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Mail, Copy, Check, ArrowUpRight } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "./icons";

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => { navigator.clipboard.writeText("triaskosofiia@gmail.com"); setCopied(true); setTimeout(() => setCopied(false), 2000); }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("is-visible"); o.disconnect(); } }, { threshold: 0.1 });
    o.observe(el);
    return () => o.disconnect();
  }, []);

  return (
    <section id="contact" className="scroll-mt-20 px-6 py-20">
      <div ref={ref} className="mx-auto max-w-3xl text-center">
        <span className="sticker bg-[var(--pink-bg)] text-[var(--pink)] px-4 py-1.5 mb-6 inline-flex items-center gap-1.5">
          <Mail size={13} /> Contact
        </span>

        <h2 className="text-3xl font-bold sm:text-5xl mb-2 opacity-0 translate-y-6 transition-all duration-700 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0">
          Let&apos;s connect
        </h2>
        <p className="mx-auto mt-4 max-w-md text-lg text-[var(--fg-muted)] opacity-0 translate-y-6 transition-all duration-700 delay-100 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0">
          Whether it&apos;s about a project, a role, or just a good book recommendation — I&apos;d love to hear from you.
        </p>

        <div className="mt-8 opacity-0 translate-y-6 transition-all duration-700 delay-200 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0">
          <div className="inline-flex flex-wrap items-center gap-2 brutal-card p-2 pl-5">
            <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--fg-muted)]">triaskosofiia@gmail.com</span>
            <button onClick={copy} className="brutal-btn bg-[var(--bg-alt)] px-4 py-2 text-sm text-[var(--fg)]" aria-label="Copy email">
              {copied ? <span className="flex items-center gap-1 text-[var(--green)]"><Check size={14} /> Copied!</span> : <span className="flex items-center gap-1"><Copy size={14} /> Copy</span>}
            </button>
            <a href="mailto:triaskosofiia@gmail.com" className="brutal-btn bg-[var(--green)] text-white px-4 py-2 text-sm">
              <span className="flex items-center gap-1"><Mail size={14} /> Send</span>
            </a>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3 opacity-0 translate-y-4 transition-all duration-700 delay-300 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0">
          {[
            { href: "https://linkedin.com/in/sofiia-triasko", label: "LinkedIn", icon: <LinkedInIcon width={16} height={16} /> },
            { href: "https://github.com", label: "GitHub", icon: <GitHubIcon width={16} height={16} /> },
          ].map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
              className="brutal-btn bg-[var(--card)] px-5 py-2.5 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] inline-flex items-center gap-2"
            >{l.icon} {l.label} <ArrowUpRight size={12} /></a>
          ))}
        </div>
      </div>
    </section>
  );
}
