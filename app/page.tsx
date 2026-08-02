import type { Metadata } from "next";
import {
  getCommunityRanking,
  getCommunityStats,
  getNationalRankingPreview,
  getUpcomingEvents,
} from "@/lib/data";
import { HeroSection } from "@/components/hero/HeroSection";
import { StatsRail } from "@/components/stats/StatsRail";
import { UpcomingEvents } from "@/components/events/UpcomingEvents";
import { RankingPreview } from "@/components/ranking/RankingPreview";
import { RivieraAppSection } from "@/components/riviera/RivieraAppSection";
import { CompetitionFormats } from "@/components/formats/CompetitionFormats";
import { IdentityComparison } from "@/components/identity/IdentityComparison";
import { CommunityCTA } from "@/components/cta/CommunityCTA";

export const metadata: Metadata = {
  title: "Inicio",
};

export default async function HomePage() {
  const [stats, events, aptRanking, nationalRanking] = await Promise.all([
    getCommunityStats(),
    getUpcomingEvents(),
    getCommunityRanking(),
    getNationalRankingPreview(),
  ]);

  return (
    <>
      <HeroSection />
      <StatsRail stats={stats} />
      <UpcomingEvents events={events} />
      <RankingPreview aptRanking={aptRanking} nationalRanking={nationalRanking} />
      <RivieraAppSection />
      <CompetitionFormats />
      <IdentityComparison />
      <CommunityCTA />
    </>
  );
}
