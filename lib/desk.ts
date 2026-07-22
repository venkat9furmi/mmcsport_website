export type DeskItem = {
  lang: string;
  what: string;
  client: string;
};

const MOCK_DESK_ITEMS: DeskItem[] = [
  { lang: "DE", what: "Matchday preview · Bundesliga 27", client: "DFB" },
  { lang: "IT", what: "Live commentary · Serie A", client: "Inter Milan" },
  { lang: "FR", what: "Website article · Premier League", client: "Man City" },
  { lang: "ID", what: "Localised artwork · matchday", client: "AC Milan" },
  { lang: "AR", what: "Community reply queue", client: "UEFA" },
  { lang: "JP", what: "Subtitles · player interview", client: "Bundesliga" },
  { lang: "PT-BR", what: "Social carousel · squad news", client: "Inter Milan" },
  { lang: "ES", what: "Voice-over script · magazine", client: "UEFA" },
  { lang: "EN", what: "Live commentary · UCL", client: "UEFA" },
  { lang: "ZH", what: "Trend post · transfer window", client: "Man City" },
];

// Mocked for now; swap the body for a real fetch once an API exists.
export async function getDeskFeed(): Promise<DeskItem[]> {
  return MOCK_DESK_ITEMS;
}
