"use client";
import { Marquee } from "./interactive/Marquee";

const items = ["TypeScript", "React", "Next.js", "NestJS", "Node.js", "PostgreSQL", "GraphQL", "Docker", "AWS", "React Native", "Tailwind", "Redis"];

export function MarqueeBanner() {
  return (
    <div className="border-y border-[var(--border)] bg-[var(--bg-alt)] py-4 overflow-hidden">
      <Marquee speed={25} pauseOnHover>
        {items.map((item) => (
          <span key={item} className="whitespace-nowrap font-bold text-sm text-[var(--fg)] flex items-center gap-8">
            {item}<span className="text-[var(--green)] text-xs" aria-hidden="true">◆</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
