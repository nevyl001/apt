import { SectionHeading } from "@/components/apt/SectionHeading";

const FORMATS = [
  {
    name: "Retas",
    description:
      "Encuentros casuales y frecuentes para jugar, medirte y sumar actividad sin la presión de un cuadro eliminatorio.",
  },
  {
    name: "Torneo Express",
    description:
      "Competencia de formato corto, ideal para categorías específicas, con partidos concentrados en una sola jornada.",
  },
  {
    name: "Liga",
    description:
      "Temporada regular con jornadas programadas a lo largo de varias semanas y una tabla que se actualiza tras cada fecha.",
  },
  {
    name: "Americano",
    description:
      "Formato rotativo donde cada jugador se enfrenta a distintas parejas durante el evento, sumando puntos individuales.",
  },
  {
    name: "Duelo 2v2",
    description:
      "Enfrentamiento directo entre dos parejas, pensado para retos puntuales entre jugadores de nivel similar.",
  },
  {
    name: "Formatos personalizados",
    description:
      "Dinámicas propias de APT, diseñadas para necesidades específicas de la comunidad y sus sedes.",
  },
];

export function CompetitionFormats() {
  return (
    <section className="apt-container py-20 lg:py-28">
      <SectionHeading
        eyebrow="Formas de competir"
        title="UNA COMUNIDAD, DIFERENTES FORMAS DE COMPETIR"
        align="center"
        className="mx-auto"
      />

      <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {FORMATS.map((format) => (
          <div key={format.name} className="bg-white p-7 sm:p-8">
            <h3 className="font-display text-lg font-bold text-navy-deep">
              {format.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {format.description}
            </p>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-xl text-center text-sm leading-relaxed text-muted">
        Si APT utiliza una modalidad propia, Riviera App puede adaptarse
        para integrarla al sistema.
      </p>
    </section>
  );
}
