"use client";

import { useEffect, useRef, useState } from "react";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { Mail } from "lucide-react";

const roles = ["building things that work", "learning something new", "probably refactoring again", "reading three books at once", "making software for real people"];

function useTypingEffect(strings: string[], speed = 70, del = 35, pause = 2200) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const cur = strings[idx];
    let t: NodeJS.Timeout;
    if (!deleting && text === cur) t = setTimeout(() => setDeleting(true), pause);
    else if (deleting && text === "") { setDeleting(false); setIdx((p) => (p + 1) % strings.length); }
    else t = setTimeout(() => setText(deleting ? cur.slice(0, text.length - 1) : cur.slice(0, text.length + 1)), deleting ? del : speed);
    return () => clearTimeout(t);
  }, [text, idx, deleting, strings, speed, del, pause]);
  return text;
}

const codeLines = [
  { tokens: [{ t: "const ", c: "#C678DD" }, { t: "sofiia", c: "var(--green)" }, { t: " = {", c: "var(--fg)" }] },
  { tokens: [{ t: '  does: ', c: "#C678DD" }, { t: '"full-stack engineering"', c: "#98C379" }] },
  { tokens: [{ t: '  with: ', c: "#C678DD" }, { t: '["TS","React","NestJS"]', c: "#E5C07B" }] },
  { tokens: [{ t: '  from: ', c: "#C678DD" }, { t: '"Kyiv, Ukraine"', c: "#98C379" }] },
  { tokens: [{ t: '  likes: ', c: "#C678DD" }, { t: '"clean code & squash"', c: "#98C379" }] },
  { tokens: [{ t: "}", c: "var(--fg)" }] },
];

function Terminal() {
  const [lines, setLines] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setLines((p) => { if (p >= codeLines.length) { clearInterval(t); return p; } return p + 1; }), 250);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="brutal-card glow-terminal overflow-hidden w-full max-w-md">
      <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-3 bg-[var(--bg-alt)]">
        <div className="h-3 w-3 rounded-full bg-[#FF5F56]" />
        <div className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
        <div className="h-3 w-3 rounded-full bg-[#27C93F]" />
        <span className="ml-2 font-[family-name:var(--font-mono)] text-xs text-[var(--fg-dim)]">sofiia.ts</span>
      </div>
      <div className="p-5 font-[family-name:var(--font-mono)] text-[13px] leading-7 bg-[var(--card)]">
        {codeLines.map((line, i) => (
          <div key={i} className={`transition-all duration-500 ${i < lines ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"}`}>
            {line.tokens.map((tok, j) => <span key={j} style={{ color: tok.c }}>{tok.t}</span>)}
          </div>
        ))}
        <span className="inline-block h-[18px] w-[2px] bg-[var(--green)] mt-1" style={{ animation: "blink 1.1s step-end infinite" }} />
      </div>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const typed = useTypingEffect(roles);

  useEffect(() => { ref.current?.classList.add("is-visible"); }, []);

  return (
    <section className="relative px-6 pt-28 pb-16 overflow-hidden min-h-[100dvh] flex items-center">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute top-20 right-10 h-40 w-40 rounded-full bg-[var(--green-bg)] border-[2.5px] border-[var(--border)] opacity-60 hero-blob" style={{ animation: "float 6s ease-in-out infinite", "--r": "-3deg" } as React.CSSProperties} />
      <div className="pointer-events-none absolute bottom-32 left-10 h-28 w-28 rounded-2xl bg-[var(--blue-bg)] border-[2.5px] border-[var(--border)] opacity-50 rotate-12 hero-blob" style={{ animation: "float 8s ease-in-out infinite" }} />
      <div className="pointer-events-none absolute top-1/2 right-1/4 h-20 w-20 rounded-full bg-[var(--pink-bg)] border-[2.5px] border-[var(--border)] opacity-40 hero-blob" style={{ animation: "float 7s ease-in-out 1s infinite" }} />
      <div className="pointer-events-none absolute top-1/3 left-1/4 h-32 w-32 rounded-full bg-[var(--purple-bg)] border-[2.5px] border-[var(--border)] opacity-30 hero-blob" style={{ animation: "float 9s ease-in-out 2s infinite" }} />

      <div ref={ref} className="mx-auto max-w-6xl w-full">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex-1 text-center lg:text-left opacity-0 translate-y-8 transition-all duration-1000 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0">
            <div className="mb-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <span className="sticker bg-[var(--green-bg)] text-[var(--green)] px-4 py-1.5 flex items-center gap-1.5">
                <span className="relative flex h-2 w-2"><span className="absolute h-full w-full animate-ping rounded-full bg-[var(--green)] opacity-75" /><span className="relative h-2 w-2 rounded-full bg-[var(--green)]" /></span>
                Open to opportunities
              </span>
            </div>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Hey, I&apos;m
              <br />
              <span className="relative inline-block hero-name">
                Sofiia
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none"><path d="M2 8c30-6 60-6 90-2s70 2 106-4" stroke="var(--green)" strokeWidth="4" strokeLinecap="round" /></svg>
              </span>
              <span className="text-[var(--green)]">.</span>
            </h1>

            <div className="mt-4 flex items-center justify-center gap-2 lg:justify-start">
              <span className="font-[family-name:var(--font-mono)] text-base text-[var(--fg-muted)]">Currently</span>
              <span className="font-[family-name:var(--font-mono)] text-base font-semibold text-[var(--green)]">{typed}</span>
              <span className="inline-block h-5 w-[2px] bg-[var(--green)]" style={{ animation: "blink 1.1s step-end infinite" }} />
            </div>

            <p className="mx-auto mt-6 max-w-lg text-lg text-[var(--fg-muted)] leading-relaxed lg:mx-0">
              Software engineer based in Kyiv. I enjoy building products that people actually
              use — from web apps and mobile banking to AI tools and microservices.
              When I&apos;m not coding, I&apos;m on the squash court or buried in a book.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <a href="#work" className="brutal-btn bg-[var(--green)] text-white px-7 py-3 text-sm">
                See what I&apos;ve built
              </a>
              <a href="#contact" className="brutal-btn bg-[var(--card)] text-[var(--fg)] px-7 py-3 text-sm">
                Say hello
              </a>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3 lg:justify-start">
              {[
                { href: "https://linkedin.com/in/sofiia-triasko", icon: <LinkedInIcon width={18} height={18} />, label: "LinkedIn" },
                { href: "https://github.com", icon: <GitHubIcon width={18} height={18} />, label: "GitHub" },
                { href: "mailto:triaskosofiia@gmail.com", icon: <Mail size={18} />, label: "Email" },
              ].map((l) => (
                <a key={l.label} href={l.href} target={l.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer"
                  className="brutal-btn flex h-10 w-10 items-center justify-center bg-[var(--card)] text-[var(--fg-muted)] hover:text-[var(--fg)]"
                  aria-label={l.label}
                >{l.icon}</a>
              ))}
            </div>
          </div>

          <div className="flex-1 flex justify-center lg:justify-end opacity-0 translate-y-8 transition-all duration-1000 delay-300 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0">
            <Terminal />
          </div>
        </div>
      </div>
    </section>
  );
}
