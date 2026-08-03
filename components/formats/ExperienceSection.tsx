"use client";

import { useRef, useState } from "react";
import { RevealText } from "@/components/motion/RevealText";
import { FormatsVisual } from "@/components/formats/FormatsVisual";
import { competitionFormats } from "@/lib/data/community";
import { cn } from "@/lib/utils/cn";

const COUNT = competitionFormats.length;

function FormatRow({
  index,
  isActive,
  isPreview,
  onCommit,
  onPreview,
  onClearPreview,
  onKeyDown,
  buttonRef,
}: {
  index: number;
  isActive: boolean;
  isPreview: boolean;
  onCommit: () => void;
  onPreview: () => void;
  onClearPreview: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  buttonRef: (el: HTMLButtonElement | null) => void;
}) {
  const format = competitionFormats[index];
  const highlighted = isActive || isPreview;

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-pressed={isActive}
      tabIndex={isActive ? 0 : -1}
      onMouseEnter={onPreview}
      onMouseLeave={onClearPreview}
      onFocus={onPreview}
      onBlur={onClearPreview}
      onClick={onCommit}
      onKeyDown={onKeyDown}
      className="formats-list-item block w-full border-b border-border/70 text-left focus-visible:outline-none"
    >
      <span className="flex items-baseline gap-4">
        <span
          className={cn(
            "font-display w-6 shrink-0 text-sm font-bold transition-colors",
            highlighted ? "text-turquoise" : "text-navy/35",
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={cn(
            "font-display text-base font-bold uppercase tracking-tight transition-colors sm:text-lg",
            highlighted ? "text-navy-deep" : "text-navy/55",
          )}
        >
          {format.name}
        </span>
      </span>

      {isActive && (
        <p className="formats-list-description pl-10 text-muted">
          {format.descriptor}
        </p>
      )}
    </button>
  );
}

export function ExperienceSection() {
  const [active, setActive] = useState(0);
  const [preview, setPreview] = useState<number | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabsRef = useRef<HTMLDivElement>(null);

  const displayed = preview ?? active;

  function focusRow(i: number) {
    buttonRefs.current[i]?.focus();
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (i + 1) % COUNT;
      setActive(next);
      focusRow(next);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (i - 1 + COUNT) % COUNT;
      setActive(prev);
      focusRow(prev);
    }
  }

  function selectMobile(i: number) {
    setActive(i);
    setPreview(null);
    const tab = tabsRef.current?.children[i] as HTMLElement | undefined;
    tab?.scrollIntoView({ inline: "nearest", block: "nearest", behavior: "smooth" });
  }

  return (
    <section
      id="experiencia"
      className="formats-section scroll-mt-20 bg-surface"
    >
      <div className="formats-section-inner">
        <div className="formats-layout">
          <div className="formats-copy">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-turquoise">
                Formas de competir
              </p>
              <RevealText
                as="h2"
                splitBy="word"
                className="formats-title font-display font-bold text-navy-deep"
              >
                Elige cómo quieres jugar
              </RevealText>
              <p className="mt-4 max-w-sm text-[length:var(--text-body)] leading-relaxed text-muted">
                APT organiza desde encuentros casuales hasta ligas y torneos
                completos.
              </p>
            </div>

            {/* Escritorio: lista vertical. Visibilidad solo vía Tailwind. */}
            <div
              className="formats-list hidden lg:flex lg:flex-col"
              role="group"
              aria-label="Formatos de competencia"
            >
              {competitionFormats.map((format, i) => (
                <FormatRow
                  key={format.id}
                  index={i}
                  isActive={active === i}
                  isPreview={preview === i}
                  onCommit={() => {
                    setActive(i);
                    setPreview(null);
                  }}
                  onPreview={() => setPreview(i)}
                  onClearPreview={() => setPreview(null)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  buttonRef={(el) => {
                    buttonRefs.current[i] = el;
                  }}
                />
              ))}
            </div>

            {/* Móvil / tablet: tabs horizontales. Visibilidad solo vía Tailwind. */}
            <div
              ref={tabsRef}
              className="formats-tabs flex lg:hidden"
              role="group"
              aria-label="Formatos de competencia"
            >
              {competitionFormats.map((format, i) => (
                <button
                  key={format.id}
                  type="button"
                  aria-pressed={active === i}
                  onClick={() => selectMobile(i)}
                  className={cn(
                    "formats-tab rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise",
                    active === i
                      ? "border-turquoise/50 bg-turquoise/10 text-navy-deep"
                      : "border-border text-ink/55 hover:border-navy/30",
                  )}
                >
                  {String(i + 1).padStart(2, "0")} {format.name}
                </button>
              ))}
            </div>
          </div>

          <div className="formats-visual-frame">
            <FormatsVisual
              formatId={competitionFormats[displayed].id}
              number={String(displayed + 1).padStart(2, "0")}
            />
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted lg:mt-8">
          También podemos crear formatos especiales para tu comunidad.
        </p>
      </div>
    </section>
  );
}
