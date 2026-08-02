"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { AptLogo } from "@/components/apt/AptLogo";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { cn } from "@/lib/utils/cn";
import { whatsappCommunity } from "@/lib/data/links";
import { DURATION, EASE_SECONDARY, STAGGER } from "@/lib/motion/tokens";

const NAV_ITEMS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#eventos", label: "Eventos" },
  { href: "#experiencia", label: "Experiencia APT" },
  { href: "#riviera-app", label: "Riviera App" },
  { href: "#contacto", label: "Contacto" },
];

export function AptNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow duration-300",
        scrolled || open
          ? "border-border shadow-[0_1px_0_0_var(--apt-border)]"
          : "border-transparent",
      )}
    >
      <nav className="apt-container grid h-[4.75rem] grid-cols-[auto_1fr_auto] items-center gap-4 lg:h-20">
        <AptLogo variant="navbar" priority />

        <ul className="hidden items-center justify-center gap-0.5 xl:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium text-ink/65 transition-colors hover:text-navy"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-end gap-3">
          <div className="hidden sm:block">
            <MagneticButton href={whatsappCommunity} variant="lime" size="sm" showArrow={false} external>
              Unirme a APT
            </MagneticButton>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="grid size-10 place-items-center rounded-full text-navy transition-colors xl:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: DURATION.small, ease: EASE_SECONDARY }}
            className="fixed inset-x-0 top-[4.75rem] bottom-0 z-40 flex flex-col border-t border-border bg-white px-6 pb-10 pt-6 xl:hidden"
          >
            <ul className="flex flex-1 flex-col justify-center gap-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * STAGGER.min, duration: DURATION.small, ease: EASE_SECONDARY }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border py-4 font-display text-2xl font-bold text-navy-deep"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <MagneticButton
              href={whatsappCommunity}
              variant="lime"
              showArrow={false}
              className="w-full justify-center"
              external
            >
              Unirme a APT
            </MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
