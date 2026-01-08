export type Lang = "en" | "fr";

export type LocalizedText = Record<Lang, string>;

export type ArtPiece = {
  id: string;
  image: string;
  title: string;
  description: LocalizedText;
};

export type ArtCollection = {
  id: string;
  title: string;
  pieces: ArtPiece[];
};
