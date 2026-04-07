"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { X, Folder } from "lucide-react";

const projects = [
  {
    title: "Large-Scale Web Products",
    desc: "Production web apps used by a wide audience. Lots of A/B testing to learn what works.",
    long: "At Genesis Tech, I work on several web applications that serve a large user base. The most interesting part isn't the scale itself — it's running dozens of experiments to validate ideas before committing to them. I've learned more from failed A/B tests than from any book about product development.",
    tags: ["TypeScript", "React", "NestJS", "AWS"],
    bg: "var(--green-bg)", color: "var(--green)", gradient: "from-emerald-400 to-teal-500",
    featured: true,
  },
  {
    title: "AI-Powered File Manager",
    desc: "A cloud file system that organizes uploads automatically using NLP.",
    long: "I wanted to solve a simple problem: people upload files and never organize them. So I trained a RoBERTa classifier and ran it server-side via ONNX Runtime. The system watches uploads and sorts them into categories without any manual tagging. It's one of those features where the best UX is no UX at all.",
    tags: ["Next.js", "NestJS", "ONNX", "NLP"],
    bg: "var(--purple-bg)", color: "var(--purple)", gradient: "from-violet-400 to-purple-600",
    featured: false,
  },
  {
    title: "Microservice Suite",
    desc: "A set of gRPC services for document processing — transcription, conversion, templates.",
    long: "This was a classic microservices problem: multiple products needed audio transcription, PDF conversion, and document generation, but each team was reinventing the wheel. I built a shared service layer with gRPC, containerized everything, and set up autoscaling based on queue depth. Now teams just call the API.",
    tags: ["gRPC", "Docker", "AWS"],
    bg: "var(--amber-bg)", color: "var(--amber)", gradient: "from-amber-400 to-orange-500",
    featured: false,
  },
  {
    title: "Payment System",
    desc: "Subscriptions, one-time purchases, and all the edge cases that come with money.",
    long: "Payments are one of those domains where the happy path is easy and everything else is hard. I built the backend for subscriptions and purchases with Stripe, implemented webhook retry logic with idempotency guarantees, and learned that the real challenge is handling all the ways things can fail gracefully.",
    tags: ["NestJS", "Stripe", "Redis"],
    bg: "var(--pink-bg)", color: "var(--pink)", gradient: "from-pink-400 to-rose-500",
    featured: false,
  },
  {
    title: "CRM with Auto-Presentations",
    desc: "A sales tool that generates branded slide decks from deal data automatically.",
    long: "The sales team was spending hours manually building PowerPoint presentations for each deal. I built a CRM with a 6-role permission system and added a feature that auto-generates branded decks from the deal data. It was a fun blend of backend logic and creative output — and the team loved not doing slide work anymore.",
    tags: ["Next.js", "PostgreSQL", "PptxGenJS"],
    bg: "var(--cyan-bg)", color: "var(--cyan)", gradient: "from-cyan-400 to-blue-500",
    featured: false,
  },
  {
    title: "Mobile Banking App",
    desc: "Cross-platform banking for iOS and Android with a focus on reliability.",
    long: "Building a mobile banking app taught me how differently you have to think about trust. Every interaction has to feel rock-solid. I worked on GraphQL query batching for performance, wrote extensive E2E tests, and dealt with the nuances of handling sensitive financial data across platforms.",
    tags: ["React Native", "GraphQL", "Cypress"],
    bg: "var(--blue-bg)", color: "var(--blue)", gradient: "from-blue-400 to-indigo-500",
    featured: false,
  },
  {
    title: "AI Code Review in CI",
    desc: "Integrated LLMs into the PR review pipeline to catch issues earlier.",
    long: "I was curious whether LLMs could meaningfully help with code review, so I integrated the Claude API into our GitHub Actions pipeline. It now flags common issues — missing error handling, inconsistent naming, potential bugs — before human reviewers see the PR. It doesn't replace people, but it handles the repetitive stuff well.",
    tags: ["Claude API", "GitHub Actions"],
    bg: "var(--purple-bg)", color: "var(--purple)", gradient: "from-purple-400 to-fuchsia-500",
    featured: false,
  },
  {
    title: "Shared Component Library",
    desc: "A React design system used across multiple products for consistency.",
    long: "When you have several products built by different teams, the UI starts to drift. I built a shared component library with Storybook documentation and visual regression tests to keep things consistent. The hardest part wasn't building the components — it was convincing everyone to actually use them.",
    tags: ["React", "Tailwind", "Storybook"],
    bg: "var(--green-bg)", color: "var(--green)", gradient: "from-green-400 to-emerald-500",
    featured: false,
  },
];

function ProjectModal({ project, onClose }: { project: (typeof projects)[0]; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative brutal-card w-full max-w-2xl max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className={`relative h-48 sm:h-56 bg-gradient-to-br ${project.gradient} border-b-[2.5px] border-[var(--border)] flex items-center justify-center`}>
          <div className="text-center text-white px-6">
            <div className="h-14 w-14 mx-auto mb-3 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center">
              <Folder size={28} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold">{project.title}</h2>
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors cursor-pointer" aria-label="Close">
            <X size={16} />
          </button>
        </div>
        <div className="p-6 sm:p-8">
          <p className="text-[var(--fg-muted)] leading-relaxed mb-6">{project.long}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="sticker px-3 py-1 text-xs" style={{ background: project.bg, color: project.color }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ p, i }: { p: (typeof projects)[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => el.classList.add("is-v"), i * 60); o.disconnect(); } }, { threshold: 0.05 });
    o.observe(el);
    return () => o.disconnect();
  }, [i]);

  return (
    <>
      <div ref={ref} onClick={() => setOpen(true)}
        className={`brutal-card overflow-hidden cursor-pointer opacity-0 translate-y-6 transition-all duration-500 [&.is-v]:opacity-100 [&.is-v]:translate-y-0 ${p.featured ? "sm:col-span-2" : ""}`}
      >
        <div className={`h-2.5 bg-gradient-to-r ${p.gradient}`} />
        <div className="p-6">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border-[2px] border-[var(--border)]" style={{ background: p.bg }}>
              <Folder size={16} style={{ color: p.color }} aria-hidden="true" />
            </div>
            <span className="text-xs text-[var(--fg-dim)] font-[family-name:var(--font-mono)]">Read more →</span>
          </div>
          <h3 className="mb-1 text-base font-bold">{p.title}</h3>
          <p className="mb-4 text-sm text-[var(--fg-muted)] leading-relaxed">{p.desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span key={t} className="rounded-lg border-[1.5px] border-[var(--border)] bg-[var(--bg-alt)] px-2.5 py-1 text-[11px] font-semibold text-[var(--fg-muted)]">{t}</span>
            ))}
          </div>
        </div>
      </div>
      {open && <ProjectModal project={p} onClose={() => setOpen(false)} />}
    </>
  );
}

export function Projects() {
  return (
    <section id="work" className="scroll-mt-20 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <span className="sticker bg-[var(--green-bg)] text-[var(--green)] px-4 py-1.5 mb-6 inline-flex items-center gap-1.5">
          <Folder size={13} /> Work
        </span>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3">Things I&apos;ve worked on</h2>
        <p className="max-w-lg text-[var(--fg-muted)] mb-10">A mix of production products, side explorations, and problems I found interesting. Click any card for the full story.</p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => <Card key={p.title} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}
