"use client";

import { useEffect, useRef } from "react";
import { MapPin, GraduationCap, Briefcase } from "lucide-react";

const timeline = [
  { role: "Software Engineer", company: "Genesis Tech", period: "Nov 2024 – Present", current: true, color: "var(--green)" },
  { role: "Full Stack Developer", company: "Onix-Systems", period: "Aug – Nov 2024", current: false, color: "var(--blue)" },
  { role: "JavaScript Developer", company: "Teamvoy", period: "Feb – Jul 2024", current: false, color: "var(--amber)" },
  { role: "Freelance Developer", company: "Upwork", period: "Jan 2023 – Feb 2024", current: false, color: "var(--purple)" },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("is-visible"); o.disconnect(); } }, { threshold: 0.05 });
    o.observe(el);
    return () => o.disconnect();
  }, []);

  return (
    <section id="about" className="scroll-mt-20 px-6 py-24">
      <div ref={ref} className="mx-auto max-w-4xl">
        <span className="sticker bg-[var(--purple-bg)] text-[var(--purple)] px-4 py-1.5 mb-8 inline-flex items-center gap-1.5">
          <Briefcase size={13} /> About
        </span>

        <div className="space-y-6 text-lg leading-relaxed text-[var(--fg-muted)] opacity-0 translate-y-6 transition-all duration-700 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0">
          <p>
            I&apos;m <span className="font-bold text-[var(--fg)]">Sofiia</span> — a software engineer from
            <span className="inline-flex items-center gap-1 mx-1"><MapPin size={14} className="text-[var(--blue)]" /><span className="font-semibold text-[var(--fg)]">Kyiv</span></span>
            who got into programming because I liked solving puzzles, and stayed because I like building things that
            make someone&apos;s day a little easier.
          </p>

          <p>
            I&apos;ve spent the last few years working across the full stack — from React frontends and React Native
            mobile apps to Node.js backends, payment systems, and microservices. Right now I&apos;m at
            <span className="font-semibold text-[var(--green)]"> Genesis Tech</span>, where I work on
            large-scale web products and run a lot of A/B experiments to understand what actually works versus
            what just looks good in a spec.
          </p>

          <p>
            What I care about most is <span className="font-semibold text-[var(--fg)]">writing code that other people
            can read and maintain</span>. I&apos;ve seen enough legacy codebases to know that clever code is usually
            expensive code. I&apos;d rather be boring and reliable than brilliant and confusing.
          </p>

          <p>
            Outside of work, I enjoy hackathons (they&apos;re a good excuse to build weird things fast),
            I&apos;m finishing my CS degree at
            <span className="inline-flex items-center gap-1 mx-1"><GraduationCap size={14} className="text-[var(--purple)]" /><span className="font-semibold text-[var(--fg)]">Taras Shevchenko University</span></span>,
            and I&apos;ve been exploring how LLMs can fit into real engineering workflows.
            When I close the laptop, I play squash, walk a lot, and always have a few books going at once.
          </p>
        </div>

        <div className="mt-14 opacity-0 translate-y-6 transition-all duration-700 delay-200 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0">
          <h3 className="text-xl font-bold mb-6">Where I&apos;ve worked</h3>
          <div className="relative border-l-[2.5px] border-[var(--border)] ml-4 space-y-6 pl-8">
            {timeline.map((t) => (
              <div key={t.company} className="relative">
                <div className="absolute -left-[calc(2rem+7px)] top-1.5 h-3.5 w-3.5 rounded-full border-[2.5px]"
                  style={{ borderColor: t.color, background: t.current ? t.color : "var(--card)" }} />
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-[var(--fg)]">{t.role}</span>
                  {t.current && <span className="sticker bg-[var(--green-bg)] text-[var(--green)] px-2 py-0.5 text-[10px]">Now</span>}
                </div>
                <p className="font-[family-name:var(--font-mono)] text-sm text-[var(--fg-dim)]">{t.company} · {t.period}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
