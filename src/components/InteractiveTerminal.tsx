"use client";

import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from "react";
import { TerminalSquare } from "lucide-react";

interface Line { type: "input" | "output"; text: string; }

const COMMANDS: Record<string, string[]> = {
  help: [
    "Available commands:",
    "",
    "  about       — a bit about me",
    "  skills      — what I work with",
    "  interests   — what I'm curious about lately",
    "  contact     — how to reach me",
    "  coffee      — fuel status",
    "  joke        — developer humor",
    "  quote       — something worth reading",
    "  squash      — the sport, not the bug",
    "  books       — what I'm reading",
    "  ascii       — a surprise",
    "  clear       — clean slate",
    "  help        — this menu",
  ],
  about: [
    "Hi! I'm Sofiia — a software engineer based in Kyiv.",
    "I build full-stack web and mobile products, mostly",
    "with TypeScript, React, and Node.js.",
    "",
    "I care about writing readable code, understanding",
    "users, and shipping things that actually work.",
    "",
    "When I'm not coding, I play squash and read too",
    "many books at once.",
  ],
  skills: [
    "What I reach for most days:",
    "  TypeScript, React, Next.js, NestJS, PostgreSQL",
    "",
    "What I've shipped production code with:",
    "  React Native, GraphQL, gRPC, Redis, Docker, AWS",
    "",
    "What I'm exploring on weekends:",
    "  LLM APIs, RAG pipelines, prompt engineering",
  ],
  interests: [
    "Things I've been thinking about lately:",
    "",
    "  - How LLMs can help with code review (not replace it)",
    "  - The gap between A/B test results and actual UX improvements",
    "  - Whether monorepos are worth the tooling overhead",
    "  - How to write docs that people actually read",
    "  - The overlap between squash strategy and system design",
    "",
    "Always happy to chat about any of these.",
  ],
  contact: [
    "Best ways to reach me:",
    "",
    "  Email     triaskosofiia@gmail.com",
    "  LinkedIn  linkedin.com/in/sofiia-triasko",
    "",
    "I'm always open to interesting conversations —",
    "about work, side projects, or book recommendations.",
  ],
  coffee: [
    "    ( (",
    "     ) )",
    "  .........",
    "  |       |]",
    "  \\       /",
    "   `-----'",
    "",
    "Oat milk flat white. No sugar.",
    "It's not an addiction, it's a daily ritual.",
    "Okay, maybe a little of both.",
  ],
  joke: [""],
  quote: [""],
  squash: [
    "I play squash — the racket sport, not the vegetable.",
    "",
    "It's fast, strategic, and surprisingly similar to",
    "debugging: you think you've got the upper hand,",
    "then the ball bounces somewhere unexpected.",
    "",
    "Best stress relief after a long coding session.",
  ],
  books: [
    "Currently reading (all at once, as usual):",
    "",
    '  1. "Designing Data-Intensive Applications" — Kleppmann',
    '  2. "The Pragmatic Programmer" — Hunt & Thomas',
    '  3. Something non-technical so I remember the world exists',
    "",
    "Open to recommendations — just send me a message.",
  ],
  ascii: [
    "",
    "   ███████╗ ██████╗ ███████╗██╗██╗ █████╗ ",
    "   ██╔════╝██╔═══██╗██╔════╝██║██║██╔══██╗",
    "   ███████╗██║   ██║█████╗  ██║██║███████║",
    "   ╚════██║██║   ██║██╔══╝  ██║██║██╔══██║",
    "   ███████║╚██████╔╝██║     ██║██║██║  ██║",
    "   ╚══════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═╝",
    "",
    "You found the easter egg. Nice.",
  ],
};

const jokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "A SQL query walks into a bar, walks up to two tables, and asks: 'Can I JOIN you?'",
  "There are only 10 types of people: those who understand binary and those who don't.",
  "!false — it's funny because it's true.",
  "Why did the developer go broke? Because he used up all his cache.",
  "Debugging: being the detective in a crime movie where you are also the murderer.",
  "It works on my machine. Then we'll ship your machine.",
  "How many developers does it take to change a light bulb? None — it's a hardware issue.",
];

const quotes = [
  '"Talk is cheap. Show me the code." — Linus Torvalds',
  '"First, solve the problem. Then, write the code." — John Johnson',
  '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Martin Fowler',
  '"The best error message is the one that never shows up." — Thomas Fuchs',
  '"Code is like humor. When you have to explain it, it\'s bad." — Cory House',
  '"Simplicity is the soul of efficiency." — Austin Freeman',
];

const errorResponses = [
  "Command not found. But I appreciate the curiosity — try 'help'.",
  "Hmm, I don't know that one. Type 'help' to see what I can do.",
  "Not in my vocabulary yet. Try 'help' for a list of things I know.",
  "I don't have a response for that, but 'help' might point you somewhere.",
];

function getResponse(input: string): string[] {
  const cmd = input.trim().toLowerCase();
  if (!cmd) return [];
  if (cmd === "clear") return ["__CLEAR__"];
  if (cmd === "joke") return [jokes[Math.floor(Math.random() * jokes.length)]];
  if (cmd === "quote") return [quotes[Math.floor(Math.random() * quotes.length)]];

  if (cmd.startsWith("sudo")) {
    return ["Nice try — no root access here.", "But I like the confidence."];
  }
  if (cmd === "exit" || cmd === "quit") {
    return ["You can close the tab, but you can't close the vibes.", "Or just scroll down — there's more to see."];
  }
  if (cmd === "ls") {
    return ["Hero.tsx  Projects.tsx  About.tsx  Skills.tsx  Contact.tsx", "All handcrafted, no templates."];
  }
  if (cmd === "pwd") {
    return ["/home/sofiia/portfolio"];
  }
  if (cmd === "whoami") {
    return ["A curious visitor. Welcome!"];
  }
  if (cmd === "hello" || cmd === "hi" || cmd === "hey") {
    return ["Hey! Thanks for stopping by. Type 'help' to explore."];
  }

  if (COMMANDS[cmd]) return COMMANDS[cmd];
  return [errorResponses[Math.floor(Math.random() * errorResponses.length)]];
}

export function InteractiveTerminal() {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: "  Welcome — this is an interactive terminal." },
    { type: "output", text: '  Type "help" to see what you can do here.' },
    { type: "output", text: "" },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("is-visible"); o.disconnect(); } }, { threshold: 0.1 });
    o.observe(el);
    return () => o.disconnect();
  }, []);

  const handleSubmit = useCallback(() => {
    if (!input.trim()) return;
    const response = getResponse(input);
    if (response[0] === "__CLEAR__") {
      setLines([]);
    } else {
      setLines((prev) => [
        ...prev,
        { type: "input", text: input },
        ...response.map((text) => ({ type: "output" as const, text })),
        { type: "output", text: "" },
      ]);
    }
    setInput("");
  }, [input]);

  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  }, [handleSubmit]);

  return (
    <section className="scroll-mt-20 px-6 py-20 bg-[var(--bg-alt)] dark-section-alt">
      <div ref={sectionRef} className="mx-auto max-w-3xl">
        <span className="sticker bg-[var(--cyan-bg)] text-[var(--cyan)] px-4 py-1.5 mb-6 inline-flex items-center gap-1.5">
          <TerminalSquare size={13} /> Interactive
        </span>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">Explore via terminal</h2>
        <p className="text-[var(--fg-muted)] mb-8">
          Type commands below — learn about me, find easter eggs, or just try random things.
        </p>

        <div className="brutal-card glow-terminal overflow-hidden opacity-0 translate-y-6 transition-all duration-700 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0">
          <div className="flex items-center gap-2 border-b-[2.5px] border-[var(--border)] px-4 py-3 bg-[var(--bg-alt)]">
            <div className="h-3.5 w-3.5 rounded-full border-[2px] border-[var(--border)] bg-[#FF5F56]" />
            <div className="h-3.5 w-3.5 rounded-full border-[2px] border-[var(--border)] bg-[#FFBD2E]" />
            <div className="h-3.5 w-3.5 rounded-full border-[2px] border-[var(--border)] bg-[#27C93F]" />
            <span className="ml-2 font-[family-name:var(--font-mono)] text-xs text-[var(--fg-dim)]">sofiia.sh</span>
          </div>

          <div ref={scrollRef} onClick={() => inputRef.current?.focus()} className="h-80 overflow-y-auto p-5 bg-[var(--card)] cursor-text">
            {lines.map((line, i) => (
              <div key={i} className="font-[family-name:var(--font-mono)] text-[13px] leading-6">
                {line.type === "input" ? (
                  <span><span className="text-[var(--green)] font-semibold">visitor@sofiia</span><span className="text-[var(--fg-dim)]">:</span><span className="text-[var(--blue)]">~</span><span className="text-[var(--fg-dim)]">$</span> <span className="text-[var(--fg)]">{line.text}</span></span>
                ) : (
                  <span className="text-[var(--fg-muted)]">{line.text}</span>
                )}
              </div>
            ))}
            <div className="font-[family-name:var(--font-mono)] text-[13px] leading-6 flex items-center">
              <span className="text-[var(--green)] font-semibold">visitor@sofiia</span>
              <span className="text-[var(--fg-dim)]">:</span>
              <span className="text-[var(--blue)]">~</span>
              <span className="text-[var(--fg-dim)]">$&nbsp;</span>
              <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKey}
                className="flex-1 bg-transparent outline-none text-[var(--fg)] font-[family-name:var(--font-mono)] text-[13px] caret-[var(--green)]"
                autoComplete="off" spellCheck={false} aria-label="Terminal input" />
            </div>
          </div>

          <div className="border-t-[2.5px] border-[var(--border)] px-4 py-2 bg-[var(--bg-alt)] flex items-center justify-between">
            <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--fg-dim)]">Try: help · about · books · joke · ascii</span>
            <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--fg-dim)]">Press Enter ↵</span>
          </div>
        </div>
      </div>
    </section>
  );
}
