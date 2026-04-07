"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Briefcase, User, Layers, Mail, Sparkles } from "lucide-react";

const navLinks = [
  { href: "#work", label: "Work", icon: Briefcase },
  { href: "#about", label: "About", icon: User },
  { href: "#stack", label: "Stack", icon: Layers },
  { href: "#contact", label: "Contact", icon: Mail },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a href="#" className="group flex items-center gap-2 cursor-pointer">
          <span className="brutal-btn flex h-10 w-10 items-center justify-center bg-[var(--green)] text-sm font-bold text-white">
            S.
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1 brutal-card px-2 py-2">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}
              className="cursor-pointer flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium text-[var(--fg-muted)] transition-all duration-200 hover:bg-[var(--bg-alt)] hover:text-[var(--fg)]"
            >
              <link.icon size={14} />
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={toggleTheme}
            className="brutal-btn cursor-pointer flex h-10 w-10 items-center justify-center bg-[var(--card)] text-[var(--fg)]"
            aria-label={isDark ? "Light mode" : "Dark mode"}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)}
            className="brutal-btn cursor-pointer flex h-10 w-10 items-center justify-center bg-[var(--card)] text-[var(--fg)] md:hidden"
            aria-label="Menu"
          >
            {isOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="mx-6 mt-2 brutal-card p-4 md:hidden">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-medium text-[var(--fg-muted)] hover:bg-[var(--bg-alt)] hover:text-[var(--fg)]"
            >
              <link.icon size={14} />
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
