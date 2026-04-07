"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Layers } from "lucide-react";

interface Skill { name: string; level: "primary" | "secondary" | "exploring"; }

const allSkills: Skill[] = [
  { name: "TypeScript", level: "primary" }, { name: "JavaScript", level: "primary" },
  { name: "React", level: "primary" }, { name: "Next.js", level: "primary" },
  { name: "Node.js", level: "primary" }, { name: "NestJS", level: "primary" },
  { name: "PostgreSQL", level: "primary" }, { name: "Tailwind CSS", level: "primary" },
  { name: "React Native", level: "secondary" }, { name: "GraphQL", level: "secondary" },
  { name: "gRPC", level: "secondary" }, { name: "Redis", level: "secondary" },
  { name: "Docker", level: "secondary" }, { name: "AWS", level: "secondary" },
  { name: "MongoDB", level: "secondary" }, { name: "WebSockets", level: "secondary" },
  { name: "CI/CD", level: "secondary" }, { name: "Redux", level: "secondary" },
  { name: "Prompt Engineering", level: "exploring" }, { name: "RAG", level: "exploring" },
  { name: "Claude/OpenAI API", level: "exploring" }, { name: "Astro", level: "exploring" },
];

const styles: Record<string, { bg: string; color: string }> = {
  primary: { bg: "var(--green-bg)", color: "var(--green)" },
  secondary: { bg: "var(--card)", color: "var(--fg)" },
  exploring: { bg: "var(--purple-bg)", color: "var(--purple)" },
};

function Chip({ skill }: { skill: Skill }) {
  const [off, setOff] = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState(false);
  const start = useRef({ x: 0, y: 0 });
  const startOff = useRef({ x: 0, y: 0 });

  const down = useCallback((e: React.PointerEvent) => {
    e.preventDefault(); setDrag(true);
    start.current = { x: e.clientX, y: e.clientY };
    startOff.current = { ...off };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [off]);
  const move = useCallback((e: React.PointerEvent) => {
    if (!drag) return;
    setOff({ x: startOff.current.x + e.clientX - start.current.x, y: startOff.current.y + e.clientY - start.current.y });
  }, [drag]);
  const up = useCallback(() => setDrag(false), []);

  const s = styles[skill.level];
  return (
    <div onPointerDown={down} onPointerMove={move} onPointerUp={up}
      className="drag-none select-none brutal-btn px-5 py-2.5 text-sm"
      style={{
        background: s.bg, color: s.color,
        transform: `translate(${off.x}px,${off.y}px) scale(${drag ? 1.1 : 1}) rotate(${drag ? "2deg" : "0deg"})`,
        transition: drag ? "none" : "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s",
        cursor: drag ? "grabbing" : "grab", position: "relative", zIndex: drag ? 50 : 1, touchAction: "none",
        boxShadow: drag ? "6px 6px 0 var(--shadow)" : undefined,
      }}
    >{skill.name}</div>
  );
}

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("is-visible"); o.disconnect(); } }, { threshold: 0.1 });
    o.observe(el);
    return () => o.disconnect();
  }, []);

  return (
    <section id="stack" className="scroll-mt-20 px-6 py-20">
      <div ref={ref} className="mx-auto max-w-6xl">
        <span className="sticker bg-[var(--blue-bg)] text-[var(--blue)] px-4 py-1.5 mb-6 inline-flex items-center gap-1.5">
          <Layers size={13} /> Stack
        </span>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">What I work with</h2>
        <p className="max-w-lg text-[var(--fg-muted)] mb-8">These are draggable — feel free to rearrange.</p>

        <div className="brutal-card p-6 opacity-0 translate-y-6 transition-all duration-700 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0">
          <div className="flex flex-wrap gap-3">
            {allSkills.map((s) => <Chip key={s.name} skill={s} />)}
          </div>
          <div className="mt-6 flex flex-wrap gap-5 text-xs text-[var(--fg-dim)]">
            <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-[var(--green)]" /> Use daily</span>
            <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full border-2 border-[var(--border)]" /> Shipped with</span>
            <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-[var(--purple)]" /> Currently exploring</span>
          </div>
        </div>
      </div>
    </section>
  );
}
