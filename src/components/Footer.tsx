"use client";
import { useEffect, useState } from "react";

const facts = [
  "probably debugging something right now",
  "fueled by oat milk flat whites",
  "currently reading 3 books at once",
  "try dragging the skill tags above",
  "commitment is hard (except in git)",
  "built this site with Next.js + Tailwind",
  "there's an easter egg in the terminal",
  "squash > most sports, don't @ me",
];

export function Footer() {
  const [f, setF] = useState(facts[0]);
  useEffect(() => { setF(facts[Math.floor(Math.random() * facts.length)]); }, []);

  return (
    <footer className="border-t border-[var(--border)] px-6 py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--fg-dim)]">&copy; {new Date().getFullYear()} Sofiia Triasko</p>
        <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--fg-dim)] italic">&quot;{f}&quot;</p>
      </div>
    </footer>
  );
}
