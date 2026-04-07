"use client";

import { useRef, useCallback, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
  as?: "a" | "button";
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

export function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  strength = 0.3,
  as,
  target,
  rel,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * strength;
      const y = (e.clientY - rect.top - rect.height / 2) * strength;
      el.style.transform = `translate(${x}px, ${y}px)`;
    },
    [strength]
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  }, []);

  const Tag = as ?? (href ? "a" : "button");
  const props = {
    ref: ref as React.Ref<HTMLAnchorElement & HTMLButtonElement>,
    className: `${className} transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform`,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    onClick,
    "aria-label": ariaLabel,
    ...(href ? { href, target, rel } : {}),
  };

  return <Tag {...props}>{children}</Tag>;
}
