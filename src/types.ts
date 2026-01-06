export type Lang = "en" | "fr";

export type LocalizedText = Record<Lang, string>;

export type ArtPiece = {
  id: string;
  image: string;
  title: LocalizedText;
  description: LocalizedText;
};

export type ArtCollection = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  pieces: ArtPiece[];
};