import { useState } from "react";
import { collections } from "../data/artContent";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export default function Gallery() {
  const { i18n } = useTranslation();
  const lang = i18n.language as "en" | "fr";
  const { id } = useParams<{ id: string }>();

  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(
    id || null
  );

  const selectedCollection = collections.find(
    (col) => col.id === selectedCollectionId
  );

  const displayedCollections = selectedCollection
    ? [selectedCollection]
    : collections;

  return (
    <section className="gallery-page">
      {displayedCollections.map((col) => (
        <section key={col.id} className="gallery-collection">
          <h2 className="collection-title">{col.title[lang]}</h2>

          <div className="pieces-grid">
            {col.pieces.map((piece) => (
              <div key={piece.id} className="piece-card">
                <img
                  src={piece.image}
                  width="300"
                  height="270"
                  alt={piece.title[lang]}
                />
                <h4>{piece.title[lang]}</h4>
                <p>{piece.description[lang]}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}