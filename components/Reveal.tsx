"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  className?: string;
  children: React.ReactNode;
  as?: "div" | "figure";
};

export function Reveal({ className = "", children, as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement | HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as;
  return (
    <Tag ref={ref as never} className={`reveal${shown ? " is-in" : ""}${className ? ` ${className}` : ""}`}>
      {children}
    </Tag>
  );
}
