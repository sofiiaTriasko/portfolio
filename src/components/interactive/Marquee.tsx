"use client";

import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  pauseOnHover?: boolean;
}

export function Marquee({
  children,
  speed = 30,
  direction = "left",
  className = "",
  pauseOnHover = true,
}: Props) {
  const animDir = direction === "left" ? "normal" : "reverse";

  return (
    <div
      className={`group flex overflow-hidden ${className}`}
      style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          className={`flex shrink-0 items-center gap-8 ${
            pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
          }`}
          style={{
            animation: `marquee ${speed}s linear infinite`,
            animationDirection: animDir,
          }}
          aria-hidden={i === 1}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
