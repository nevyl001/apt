"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useReducedMotion } from "@/components/motion/ReducedMotionProvider";

interface MagneticButtonProps {
  /** Solo renderiza si hay href real. No pasar null: omite el botón en el padre. */
  href: string;
  children: React.ReactNode;
  variant?: "lime" | "turquoise" | "outline" | "outline-light";
  size?: "md" | "sm";
  className?: string;
  showArrow?: boolean;
  external?: boolean;
}

const variants: Record<NonNullable<MagneticButtonProps["variant"]>, string> = {
  lime: "bg-lime text-navy-deep hover:bg-lime/90",
  turquoise: "bg-turquoise text-white hover:bg-turquoise/90",
  outline: "border border-navy/20 text-navy hover:border-navy/50",
  "outline-light": "border border-white/30 text-white hover:border-white/70",
};

const sizes: Record<NonNullable<MagneticButtonProps["size"]>, string> = {
  md: "px-6 py-3.5 text-sm",
  sm: "px-5 py-3.5 text-sm",
};

export function MagneticButton({
  href,
  children,
  variant = "lime",
  size = "md",
  className,
  showArrow = true,
  external = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.12);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.15);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={reduced ? undefined : { x: springX, y: springY }}
      className="inline-block w-full sm:w-auto"
    >
      <Link
        ref={ref}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={cn(
          "group inline-flex items-center gap-2 rounded-full font-medium tracking-wide transition-colors duration-200",
          sizes[size],
          variants[variant],
          className,
        )}
      >
        <span className="relative overflow-hidden">
          <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
            {children}
          </span>
          <span
            aria-hidden
            className="absolute left-0 top-full block transition-transform duration-300 ease-out group-hover:-translate-y-full"
          >
            {children}
          </span>
        </span>
        {showArrow && (
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
          />
        )}
      </Link>
    </motion.div>
  );
}
