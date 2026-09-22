interface Tag {
  label: string;
  value: string;
  dot: string;
  style: React.CSSProperties;
}

const TAGS: Tag[] = [
  {
    label: "Competencia",
    value: "Organizada",
    dot: "bg-turquoise",
    style: { top: "max(20px, 10%)", left: "max(20px, 8%)" },
  },
  {
    label: "Resultados",
    value: "Con seguimiento",
    dot: "bg-lime",
    style: { top: "max(20px, 38%)", right: "max(20px, 6%)" },
  },
  {
    label: "Comunidad",
    value: "Local en Acapulco",
    dot: "bg-white",
    style: { top: "max(20px, 54%)", left: "max(20px, 10%)" },
  },
];

/**
 * Composición editorial estática: cancha abstracta en perspectiva,
 * trayectoria de pelota y nodos de jugadores, resuelta solo con CSS y SVG.
 * Sin fotografía, sin mockups, sin animación — el día que exista material
 * real, esta capa se sustituye sin tocar el layout que la contiene.
 */
export function HeroVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-navy via-navy to-navy-deep">
      <div className="apt-grain" />

      <p
        aria-hidden
        className="font-display pointer-events-none absolute -right-4 -top-10 select-none text-[9rem] font-bold leading-none tracking-tighter text-white/[0.06] sm:text-[13rem]"
      >
        APT
      </p>

      <div
        aria-hidden
        className="absolute -bottom-20 -left-14 size-64 rounded-full bg-turquoise/20 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -right-10 top-10 size-40 rounded-full bg-lime/10 blur-3xl"
      />

      <svg
        aria-hidden
        viewBox="0 0 480 560"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Cancha abstracta en perspectiva */}
        <polygon
          points="70,500 410,500 350,120 130,120"
          fill="none"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth={1.5}
        />
        <line x1="130" y1="120" x2="70" y2="500" stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
        <line x1="350" y1="120" x2="410" y2="500" stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
        <line x1="240" y1="120" x2="240" y2="500" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />

        {/* Red */}
        <line
          x1="94"
          y1="332"
          x2="386"
          y2="332"
          stroke="var(--apt-turquoise)"
          strokeWidth={2}
          strokeOpacity={0.55}
        />
        <line x1="94" y1="332" x2="94" y2="318" stroke="var(--apt-turquoise)" strokeOpacity={0.4} strokeWidth={2} />
        <line x1="386" y1="332" x2="386" y2="318" stroke="var(--apt-turquoise)" strokeOpacity={0.4} strokeWidth={2} />

        {/* Trayectoria de la pelota, con rastro estático de profundidad */}
        <path
          d="M 110 470 C 190 400, 230 330, 250 250 S 320 130, 400 100"
          fill="none"
          stroke="var(--apt-turquoise)"
          strokeWidth={2}
          strokeDasharray="3 7"
          strokeLinecap="round"
          opacity={0.7}
        />
        <circle cx="150" cy="430" r="4" fill="var(--apt-lime)" opacity={0.25} />
        <circle cx="205" cy="360" r="5" fill="var(--apt-lime)" opacity={0.45} />
        <circle cx="265" cy="225" r="7" fill="var(--apt-lime)" opacity={0.95} />

        {/* Nodos de jugadores */}
        <g>
          <circle cx="150" cy="470" r="14" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={1} />
          <circle cx="150" cy="470" r="6" fill="var(--apt-white)" fillOpacity={0.9} />
          <line x1="164" y1="470" x2="210" y2="470" stroke="rgba(255,255,255,0.18)" strokeDasharray="2 4" />
        </g>
        <g>
          <circle cx="352" cy="440" r="14" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={1} />
          <circle cx="352" cy="440" r="6" fill="var(--apt-white)" fillOpacity={0.9} />
          <line x1="338" y1="440" x2="300" y2="440" stroke="rgba(255,255,255,0.18)" strokeDasharray="2 4" />
        </g>
      </svg>

          {TAGS.map((tag) => (
        <div
          key={tag.label}
          className="absolute flex max-w-[calc(100%-2rem)] items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1.5 backdrop-blur-sm sm:gap-2 sm:px-3"
          style={tag.style}
        >
          <span className={`size-1.5 shrink-0 rounded-full ${tag.dot}`} />
          <span className="truncate text-[9px] font-semibold uppercase tracking-[0.12em] text-white/80 sm:text-[10px] sm:tracking-[0.14em]">
            {tag.label}
          </span>
          <span className="hidden truncate text-[10px] text-white/45 sm:inline">
            {tag.value}
          </span>
        </div>
      ))}

      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between sm:bottom-8 sm:left-8 sm:right-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/55 sm:text-xs">
          Acapulco, Guerrero
        </p>
      </div>
    </div>
  );
}
