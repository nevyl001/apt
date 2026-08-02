export interface PlayerRanking {
  playerId: string;
  rivieraId: string;
  name: string;
  avatarUrl?: string;
  category: string;
  position: number;
  previousPosition?: number;
  points: number;
  rating?: number;
  matchesPlayed: number;
  communityName: string;
}

export type RankingScope = "apt" | "national" | "most_active" | "best_evolution";

export interface PlayerProfile {
  playerId: string;
  rivieraId: string;
  name: string;
  avatarUrl?: string;
  community: string;
  category: string;
  dominantHand: "derecha" | "izquierda";
  side: "drive" | "reves";
  matchesPlayed: number;
  eventsPlayed: number;
  points: number;
  rating?: number;
  localPosition: number;
  nationalPosition: number;
  recentForm: ("W" | "L")[];
}

export interface MatchResult {
  id: string;
  eventName: string;
  date: string;
  category: string;
  players: string[];
  score: string;
}
