"use client";

import { useRef, useState } from "react";
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
      className="formats-list-item flex w-full items-center gap-3 border-b border-border/60 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise/40"
    >
      <span
        className={cn(
          "font-display w-7 shrink-0 text-[13px] font-bold tabular-nums transition-colors",
          highlighted ? "text-turquoise" : "text-navy/30",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <span
        className={cn(
          "font-display text-[15px] font-bold uppercase tracking-tight transition-colors",
          highlighted ? "text-navy-deep" : "text-navy/50",
        )}
      >
        {format.name}
      </span>
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
    tab?.scrollIntoView({
      inline: "nearest",
      block: "nearest",
      behavior: "smooth",
    });
  }

  return (
    <section
      id="experiencia"
      className="formats-section apt-section scroll-mt-20 bg-surface"
    >
      <div className="apt-container">
        <div className="formats-layout">
          <div className="formats-copy">
            <header className="formats-heading">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-turquoise">
                Formas de competir
              </p>
              <h2 className="formats-title font-display font-bold text-navy-deep">
                Elige cómo quieres jugar
              </h2>
              <p className="formats-lead text-muted">
                APT organiza desde encuentros casuales hasta ligas y torneos
                completos.
              </p>
            </header>

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
                    "formats-tab rounded-full border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise",
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
      </div>
    </section>
  );
}
