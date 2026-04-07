"use client";

import { useEffect, useRef } from "react";
import { Monitor, Code2, Terminal, Headphones, Coffee, Dumbbell, Wrench } from "lucide-react";

const cats = [
  { icon: Code2, title: "Editor", bg: "var(--green-bg)", color: "var(--green)", items: [
    { name: "VS Code / Cursor", note: "with Vim motions" }, { name: "JetBrains IDEs", note: "heavy lifting" }, { name: "Neovim", note: "when I want to feel alive" }
  ]},
  { icon: Terminal, title: "Terminal", bg: "var(--blue-bg)", color: "var(--blue)", items: [
    { name: "iTerm2 + Zsh", note: "Oh My Zsh" }, { name: "Starship prompt", note: "fast + pretty" }, { name: "tmux", note: "window management" }
  ]},
  { icon: Monitor, title: "Hardware", bg: "var(--amber-bg)", color: "var(--amber)", items: [
    { name: "MacBook Pro", note: "M-series" }, { name: "Ultrawide 34\"", note: "because tabs" }, { name: "Mech keyboard", note: "sorry, coworkers" }
  ]},
  { icon: Headphones, title: "Productivity", bg: "var(--purple-bg)", color: "var(--purple)", items: [
    { name: "Notion", note: "second brain" }, { name: "Linear", note: "doesn't suck" }, { name: "Arc Browser", note: "never going back" }
  ]},
  { icon: Coffee, title: "Fuel", bg: "var(--pink-bg)", color: "var(--pink)", items: [
    { name: "Oat milk flat white", note: "non-negotiable" }, { name: "Lo-fi playlists", note: "stereotype is real" }, { name: "Standing desk", note: "80/20 sit/stand" }
  ]},
  { icon: Dumbbell, title: "Off-Screen", bg: "var(--cyan-bg)", color: "var(--cyan)", items: [
    { name: "Squash", note: "Tecnifibre racket" }, { name: "Books", note: "Kindle + physical" }, { name: "Walking", note: "best debug tool" }
  ]},
];

export function Uses() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("is-visible"); o.disconnect(); } }, { threshold: 0.05 });
    o.observe(el);
    return () => o.disconnect();
  }, []);

  return (
    <section id="uses" className="scroll-mt-20 px-6 py-20 bg-[var(--bg-alt)]">
      <div ref={ref} className="mx-auto max-w-6xl">
        <span className="sticker bg-[var(--cyan-bg)] text-[var(--cyan)] px-4 py-1.5 mb-6 inline-flex items-center gap-1.5">
          <Wrench size={13} /> Uses
        </span>
        <h2 className="text-3xl font-bold sm:text-4xl mb-2">What&apos;s in my setup</h2>
        <p className="max-w-lg text-[var(--fg-muted)] mb-10">Tools, gear, and rituals. Or at least what makes me feel productive.</p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cats.map((c, i) => (
            <div key={c.title} className="brutal-card p-6 opacity-0 translate-y-6 transition-all duration-500 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0" style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border-[2px] border-[var(--border)]" style={{ background: c.bg }}>
                  <c.icon size={18} style={{ color: c.color }} aria-hidden="true" />
                </div>
                <h3 className="font-bold">{c.title}</h3>
              </div>
              <ul className="space-y-2.5">
                {c.items.map((it) => (
                  <li key={it.name}><span className="text-sm font-semibold">{it.name}</span><br /><span className="text-xs text-[var(--fg-dim)]">{it.note}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
