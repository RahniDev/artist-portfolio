import type { Lang } from "../types.ts";

export type LocalizedText = Record<Lang, string>;

export interface ArtPiece {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  image: string;
}

export interface ArtCollection {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  pieces: ArtPiece[];
}

export const collections: ArtCollection[] = [
  {
    id: "spirit-series",
    title: {
      en: "Spirit Series",
      fr: "Série Spirituelle"
    },
    description: {
      en: "Explores transcendence & soul",
      fr: "Explore la transcendance et l'âme"
    },
    pieces: [
      {
        id: "awakening",
        title: {
          en: "Awakening",
          fr: "Éveil"
        },
        description: {
          en: "Watercolour on paper, 2025",
          fr: "Aquarelle sur papier, 2025"
        },
        image: "../assets/profile.jpg"
      }
    ]
  }
];