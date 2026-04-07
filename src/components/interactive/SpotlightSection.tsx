"use client";

import { useRef, useCallback, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  id?: string;
  color?: string;
}

export function SpotlightSection({
  children,
  className = "",
  id,
  color = "var(--accent)",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
    },
    []
  );

  return (
    <section
      ref={ref}
      id={id}
      onMouseMove={onMove}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 [section:hover>&]:opacity-100"
        style={{
          background: `radial-gradient(800px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${color}06, transparent 50%)`,
        }}
      />
      {children}
    </section>
  );
}
