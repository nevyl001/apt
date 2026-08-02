import { SectionHeading } from "@/components/apt/SectionHeading";
import { MagneticButton } from "@/components/motion/MagneticButton";

export function ComingSoonSection({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="apt-container flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
        align="center"
        className="mx-auto"
      />
      <div className="mt-10">
        <MagneticButton href="/">Volver al inicio</MagneticButton>
      </div>
    </section>
  );
}
