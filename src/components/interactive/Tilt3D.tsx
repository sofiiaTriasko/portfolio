"use client";

import { useRef, useCallback, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
  glare?: boolean;
}

export function Tilt3D({
  children,
  className = "",
  max = 8,
  scale = 1.02,
  glare = true,
}: Props) {
  const wrapper = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = wrapper.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * max;
      const rotateY = (x - 0.5) * max;
      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;

      if (glareRef.current) {
        const angle = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI) + 90;
        glareRef.current.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,0.12) 0%, transparent 60%)`;
        glareRef.current.style.opacity = "1";
      }
    },
    [max, scale]
  );

  const onLeave = useCallback(() => {
    const el = wrapper.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)";
    if (glareRef.current) glareRef.current.style.opacity = "0";
  }, []);

  return (
    <div
      ref={wrapper}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative ${className}`}
      style={{
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
        />
      )}
    </div>
  );
}
