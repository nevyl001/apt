import type { Metadata } from "next";
import { getUpcomingEvents } from "@/lib/data";
import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/about/AboutSection";
import { EventsSection } from "@/components/events/EventsSection";
import { ExperienceSection } from "@/components/formats/ExperienceSection";
import { RivieraCinematic } from "@/components/riviera/RivieraCinematic";
import { FinalCTA } from "@/components/cta/FinalCTA";

export const metadata: Metadata = {
  title: "Inicio",
};

export default async function HomePage() {
  const events = await getUpcomingEvents();

  return (
    <>
      <HeroSection />
      <AboutSection />
      <EventsSection events={events} />
      <ExperienceSection />
      <RivieraCinematic />
      <FinalCTA />
    </>
  );
}
