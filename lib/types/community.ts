export interface Community {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  city: string;
  state: string;
  rivieraCommunityId: string;
}

export interface CommunityStat {
  id: string;
  label: string;
  value: number | null;
  suffix?: string;
}
