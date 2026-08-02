"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { AptLogo } from "@/components/apt/AptLogo";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { cn } from "@/lib/utils/cn";

const NAV_ITEMS = [
  { href: "/", label: "Inicio" },
  { href: "/eventos", label: "Eventos" },
  { href: "/ranking", label: "Ranking" },
  { href: "/resultados", label: "Resultados" },
  { href: "/comunidad", label: "Comunidad" },
  { href: "/riviera-app", label: "Riviera App" },
];

export function AptNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const [trackedPathname, setTrackedPathname] = useState(pathname);
  if (pathname !== trackedPathname) {
    setTrackedPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid
          ? "bg-white/95 shadow-[0_1px_0_0_var(--apt-border)] backdrop-blur-sm"
          : "bg-transparent",
      )}
    >
      <nav className="apt-container flex h-18 items-center justify-between py-3">
        <AptLogo height={36} />

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  className={cn(
                    "relative block px-4 py-2 text-sm font-medium transition-colors",
                    solid
                      ? active
                        ? "text-navy"
                        : "text-ink/70 hover:text-navy"
                      : active
                        ? "text-white"
                        : "text-white/80 hover:text-white",
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="apt-nav-active"
                      className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-turquoise"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <MagneticButton href="/ranking" variant="lime" showArrow={false}>
            Ver ranking
          </MagneticButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className={cn(
            "grid size-10 place-items-center rounded-full transition-colors lg:hidden",
            solid ? "text-navy" : "text-white",
          )}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-18 bottom-0 z-40 flex flex-col bg-navy-deep px-6 pb-10 pt-6 lg:hidden"
          >
            <ul className="flex flex-1 flex-col justify-center gap-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.35 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "block border-b border-white/10 py-4 font-display text-2xl font-bold",
                      pathname === item.href ? "text-turquoise" : "text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <MagneticButton
              href="/ranking"
              variant="lime"
              showArrow={false}
              className="w-full justify-center"
            >
              Ver ranking
            </MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
