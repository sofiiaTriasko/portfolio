"use client";

import { useEffect, useRef, useState } from "react";

const chars = "!<>-_\\/[]{}—=+*^?#_abcdefghijklmnopqrstuvwxyz";

interface Props {
  text: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
  speed?: number;
}

export function TextScramble({
  text,
  className = "",
  as: Tag = "span",
  delay = 0,
  speed = 30,
}: Props) {
  const [display, setDisplay] = useState("");
  const ref = useRef<HTMLElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          setTimeout(() => scramble(), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);

  function scramble() {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (i < iteration) return char;
            if (char === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      iteration += 1 / 2;
      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplay(text);
      }
    }, speed);
  }

  return (
    // @ts-expect-error - dynamic tag
    <Tag ref={ref} className={className}>
      {display || "\u00A0".repeat(text.length)}
    </Tag>
  );
}
