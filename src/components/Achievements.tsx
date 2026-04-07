"use client";

import { useEffect, useRef } from "react";
import { Sparkles, Rocket, Lightbulb, Award, Star } from "lucide-react";

const items = [
  {
    icon: Rocket,
    title: "NASA Space Apps",
    sub: "Kyiv, 2025",
    desc: "Built an AI system for assessing exoplanet habitability with a team of five. The kind of weekend where you forget to sleep and it's actually worth it.",
    bg: "var(--blue-bg)", color: "var(--blue)", tag: "Hackathon",
  },
  {
    icon: Lightbulb,
    title: "PERSHi(YEP)",
    sub: "2025",
    desc: "Co-founded a startup as CTO. Took it from idea to a production-ready product and pre-seed funding. Learned more about product thinking in 6 months than in 2 years of courses.",
    bg: "var(--amber-bg)", color: "var(--amber)", tag: "Startup",
  },
  {
    icon: Sparkles,
    title: "IdeaS Lab",
    sub: "2025",
    desc: "Another startup adventure. Built the MVP, pitched to investors, learned how to explain technical decisions to non-technical people (harder than it sounds).",
    bg: "var(--green-bg)", color: "var(--green)", tag: "Startup",
  },
  {
    icon: Award,
    title: "Diia City Program",
    sub: "2023",
    desc: "A national innovation program where I got to validate a business model and think about go-to-market strategy. Good reminder that code is just one piece of the puzzle.",
    bg: "var(--purple-bg)", color: "var(--purple)", tag: "Business",
  },
  {
    icon: Star,
    title: "Young Innovation Forum",
    sub: "2023",
    desc: "Built a working prototype in 48 hours. Hackathons are great for practicing the art of scoping ruthlessly and shipping something imperfect but real.",
    bg: "var(--pink-bg)", color: "var(--pink)", tag: "Hackathon",
  },
];

export function Achievements() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("is-visible"); o.disconnect(); } }, { threshold: 0.05 });
    o.observe(el);
    return () => o.disconnect();
  }, []);

  return (
    <section className="scroll-mt-20 px-6 py-20 bg-[var(--bg-alt)] dark-section-alt">
      <div ref={ref} className="mx-auto max-w-6xl">
        <span className="sticker bg-[var(--amber-bg)] text-[var(--amber)] px-4 py-1.5 mb-6 inline-flex items-center gap-1.5">
          <Sparkles size={13} /> Beyond work
        </span>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3">Side adventures</h2>
        <p className="max-w-lg text-[var(--fg-muted)] mb-10">Hackathons, startups, and the things I&apos;ve done when nobody assigned me a Jira ticket.</p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div key={item.title} className="brutal-card p-6 opacity-0 translate-y-6 transition-all duration-500 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0"
              style={{ transitionDelay: `${i * 80}ms`, background: item.bg }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border-[2px] border-[var(--border)] bg-[var(--card)]">
                  <item.icon size={20} style={{ color: item.color }} aria-hidden="true" />
                </div>
                <span className="sticker text-[10px] px-2.5 py-1 bg-[var(--card)]" style={{ color: item.color }}>{item.tag}</span>
              </div>
              <h3 className="font-bold text-base mb-0.5">{item.title}</h3>
              <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--fg-dim)] mb-2">{item.sub}</p>
              <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
