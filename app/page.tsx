import type { Metadata } from "next";
import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/about/AboutSection";
import { EventsSection } from "@/components/events/EventsSection";
import { ExperienceSection } from "@/components/formats/ExperienceSection";
import { RivieraCinematic } from "@/components/riviera/RivieraCinematic";
import { FinalCTA } from "@/components/cta/FinalCTA";

export const metadata: Metadata = {
  title: "Inicio",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <ExperienceSection />
      <RivieraCinematic />
      <FinalCTA />
    </>
  );
}
