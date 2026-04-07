"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export function ParticleField() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let particles: Particle[] = [];
    let raf: number;

    function resize() {
      w = c!.parentElement!.clientWidth;
      h = c!.parentElement!.clientHeight;
      c!.width = w * devicePixelRatio;
      c!.height = h * devicePixelRatio;
      c!.style.width = w + "px";
      c!.style.height = h + "px";
      ctx!.scale(devicePixelRatio, devicePixelRatio);
    }

    function init() {
      resize();
      const count = Math.min(80, Math.floor((w * h) / 12000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);

      const isDark = !document.documentElement.classList.contains("light");
      const particleColor = isDark ? "255,255,255" : "0,0,0";
      const lineColor = isDark ? "255,255,255" : "0,0,0";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.x -= dx * 0.008;
          p.y -= dy * 0.008;
        }

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${particleColor},${p.opacity})`;
        ctx!.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 120) {
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(p2.x, p2.y);
            ctx!.strokeStyle = `rgba(${lineColor},${0.06 * (1 - d / 120)})`;
            ctx!.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    }

    function onMove(e: MouseEvent) {
      const rect = c!.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    init();
    draw();

    window.addEventListener("resize", init);
    c.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", init);
      c.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvas}
      className="pointer-events-auto absolute inset-0"
      aria-hidden="true"
    />
  );
}
