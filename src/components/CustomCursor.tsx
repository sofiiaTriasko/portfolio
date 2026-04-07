"use client";

import { useEffect, useRef } from "react";

const TRAIL_COUNT = 5;

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const trails = useRef<(HTMLDivElement | null)[]>([]);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const trailPositions = useRef(Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 })));
  const hovering = useRef(false);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    function onMove(e: MouseEvent) { pos.current = { x: e.clientX, y: e.clientY }; }
    function onEnter() { hovering.current = true; }
    function onLeave() { hovering.current = false; }

    function tick() {
      const d = dot.current;
      const r = ring.current;
      if (!d || !r) return;

      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;

      d.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      r.style.transform = `translate(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px) scale(${hovering.current ? 1.8 : 1})`;
      r.style.opacity = hovering.current ? "0.9" : "0.4";

      for (let i = 0; i < TRAIL_COUNT; i++) {
        const prev = i === 0 ? pos.current : trailPositions.current[i - 1];
        const t = trailPositions.current[i];
        const ease = 0.14 - i * 0.015;
        t.x += (prev.x - t.x) * ease;
        t.y += (prev.y - t.y) * ease;
        const trail = trails.current[i];
        if (trail) {
          const size = 3 - i * 0.3;
          const opacity = 0.3 - i * 0.04;
          trail.style.transform = `translate(${t.x - size / 2}px, ${t.y - size / 2}px)`;
          trail.style.width = `${size}px`;
          trail.style.height = `${size}px`;
          trail.style.opacity = `${opacity}`;
        }
      }
      requestAnimationFrame(tick);
    }

    document.addEventListener("mousemove", onMove);
    requestAnimationFrame(tick);

    const bind = () => {
      document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    const observer = new MutationObserver(bind);
    observer.observe(document.body, { childList: true, subtree: true });
    bind();

    return () => { document.removeEventListener("mousemove", onMove); observer.disconnect(); };
  }, []);

  return (
    <>
      {Array.from({ length: TRAIL_COUNT }, (_, i) => (
        <div key={i} ref={(el) => { trails.current[i] = el; }} className="pointer-events-none fixed top-0 left-0 z-[9997] rounded-full bg-[var(--green)] max-md:hidden" style={{ willChange: "transform" }} />
      ))}
      <div ref={dot} className="pointer-events-none fixed top-0 left-0 z-[9998] h-2 w-2 rounded-full bg-[var(--fg)] max-md:hidden" style={{ willChange: "transform" }} />
      <div ref={ring} className="pointer-events-none fixed top-0 left-0 z-[9998] h-9 w-9 rounded-full border-[2px] border-[var(--green)] max-md:hidden" style={{ willChange: "transform", transition: "opacity 0.3s, transform 0.1s" }} />
    </>
  );
}
