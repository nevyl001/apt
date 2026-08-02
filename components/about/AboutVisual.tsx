interface Pillar {
  number: string;
  label: string;
  value: string;
  dot: string;
  style: React.CSSProperties;
}

const PILLAR_TAGS: Pillar[] = [
  {
    number: "01",
    label: "Comunidad",
    value: "Jugadores activos",
    dot: "bg-turquoise",
    style: { top: "10%", left: "6%" },
  },
  {
    number: "02",
    label: "Organización",
    value: "Torneos y ligas",
    dot: "bg-lime",
    style: { top: "44%", left: "6%" },
  },
  {
    number: "03",
    label: "Proyección nacional",
    value: "Riviera Open",
    dot: "bg-white",
    style: { top: "64%", left: "6%" },
  },
];

const COURTS = [
  { x: 40, y: 60, w: 140, h: 100 },
  { x: 230, y: 40, w: 110, h: 80 },
  { x: 210, y: 180, w: 150, h: 100 },
  { x: 420, y: 90, w: 120, h: 90 },
];

/**
 * Composición editorial ancha para "Quiénes somos": red de canchas
 * abstractas conectadas, en el mismo lenguaje visual del hero (CSS + SVG,
 * sin fotografía). Los tres pilares viven como etiquetas sobre la propia
 * pieza en lugar de una grilla de tarjetas aparte.
 */
export function AboutVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-navy-deep">
      <div className="apt-grain" />

      <p
        aria-hidden
        className="font-display pointer-events-none absolute -bottom-10 -right-4 select-none text-[8rem] font-bold leading-none tracking-tighter text-white/[0.05] sm:text-[11rem]"
      >
        APT
      </p>

      <div aria-hidden className="absolute -left-10 top-1/2 size-56 -translate-y-1/2 rounded-full bg-turquoise/15 blur-3xl" />

      <svg
        aria-hidden
        viewBox="0 0 600 300"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {COURTS.map((c, i) => (
          <rect
            key={i}
            x={c.x}
            y={c.y}
            width={c.w}
            height={c.h}
            rx={4}
            fill="none"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth={1.2}
          />
        ))}
        {COURTS.map((c, i) => (
          <line
            key={`net-${i}`}
            x1={c.x}
            y1={c.y + c.h / 2}
            x2={c.x + c.w}
            y2={c.y + c.h / 2}
            stroke="var(--apt-turquoise)"
            strokeOpacity={0.35}
            strokeWidth={1}
          />
        ))}

        {/* Conexiones entre canchas — la red de comunidad */}
        <path
          d="M 110 110 C 160 70, 200 70, 285 80"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeDasharray="2 6"
          strokeWidth={1}
        />
        <path
          d="M 285 120 C 300 160, 300 190, 285 230"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeDasharray="2 6"
          strokeWidth={1}
        />
        <path
          d="M 340 220 C 380 190, 400 150, 430 130"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeDasharray="2 6"
          strokeWidth={1}
        />

        <circle cx="110" cy="110" r="4" fill="var(--apt-lime)" />
        <circle cx="285" cy="80" r="4" fill="var(--apt-lime)" opacity={0.8} />
        <circle cx="285" cy="230" r="4" fill="var(--apt-white)" opacity={0.9} />
        <circle cx="430" cy="130" r="4" fill="var(--apt-turquoise)" />
      </svg>

      {PILLAR_TAGS.map((p) => (
        <div
          key={p.number}
          className="absolute flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 backdrop-blur-sm"
          style={p.style}
        >
          <span className="text-[10px] font-bold text-white/40">{p.number}</span>
          <span className={`size-1.5 shrink-0 rounded-full ${p.dot}`} />
          <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80">
            {p.label}
          </span>
          <span className="hidden whitespace-nowrap text-[10px] text-white/45 sm:inline">
            {p.value}
          </span>
        </div>
      ))}

      <p className="absolute bottom-5 left-6 text-xs font-medium uppercase tracking-[0.16em] text-white/40 sm:bottom-6 sm:left-8">
        Acapulco, Guerrero
      </p>
    </div>
  );
}
