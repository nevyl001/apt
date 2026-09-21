"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { AptLogo } from "@/components/apt/AptLogo";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { cn } from "@/lib/utils/cn";
import { DURATION, EASE_SECONDARY, STAGGER } from "@/lib/motion/tokens";

const NAV_ITEMS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#eventos", label: "Liga APT" },
  { href: "#experiencia", label: "Formatos" },
  { href: "#tecnologia", label: "Plataforma" },
  { href: "#contacto", label: "Contacto" },
];

export function AptNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.href.slice(1)),
    ).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length === 0) return;
        const id = visible[0].target.id;
        const href = `#${id}`;
        setActiveHref(href);
        if (window.location.hash !== href) {
          history.replaceState(null, "", href);
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleNavClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    if (href === "#inicio") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      history.replaceState(null, "", "#inicio");
      setActiveHref("#inicio");
    }
    setOpen(false);
  }

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b bg-white transition-shadow duration-300",
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
                  onClick={(e) => handleNavClick(e, item.href)}
                  aria-current={activeHref === item.href ? "true" : undefined}
                  className={cn(
                    "block whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise",
                    activeHref === item.href
                      ? "text-navy"
                      : "text-ink/65 hover:text-navy",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-end gap-3">
            <div className="hidden sm:block">
              <MagneticButton href="#eventos" variant="lime" size="sm" showArrow={false}>
                Inscríbete a la Liga APT
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
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.small, ease: EASE_SECONDARY }}
            className="fixed inset-0 z-40 flex flex-col bg-white pt-[4.75rem] xl:hidden"
          >
            <div className="flex min-h-0 flex-1 flex-col px-6 pb-10 pt-4">
              <ul className="flex flex-1 flex-col justify-center gap-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.05 + i * STAGGER.min,
                      duration: DURATION.small,
                      ease: EASE_SECONDARY,
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="block border-b border-border py-4 font-display text-2xl font-bold text-navy-deep"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <MagneticButton
                href="#eventos"
                variant="lime"
                showArrow={false}
                className="w-full justify-center"
              >
                Inscríbete a la Liga APT
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
