import { useState } from "react";
import { collections } from "../data/artContent";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import ImageModal from "../components/ImageModal";

export default function Gallery() {
  const { i18n } = useTranslation();
  const lang = i18n.language as "en" | "fr";
  const { id } = useParams<{ id: string }>();

  const selectedCollection = collections.find(col => col.id === id);
  if (!selectedCollection) return null;

  const images = selectedCollection.pieces.map(p => p.image);
  const titles = selectedCollection.pieces.map(p => p.title);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  return (
    <section className="gallery-page">
      <h2 className="collection-title">
        {selectedCollection.title}
      </h2>
      <p className="series-text">
        {lang.startsWith("fr") ? "La série" : "Series"}
      </p>

      <div className="pieces-grid">
        {selectedCollection.pieces.map((piece, index) => (
          <div
            key={piece.id}
            className="piece-card"
            onClick={() => setCurrentIndex(index)}
          >
            <div className="piece-image">
              <img
                src={piece.image}
                alt={piece.title}
              />
            </div>
            <h4>{piece.title}</h4>
            <p>{piece.description[lang]}</p>
          </div>
        ))}
      </div>

      {currentIndex !== null && (
        <ImageModal
          images={images}
          titles={titles}
          currentIndex={currentIndex}
          onClose={() => setCurrentIndex(null)}
          onNext={() =>
            setCurrentIndex(i => Math.min(i! + 1, images.length - 1))
          }
          onPrev={() =>
            setCurrentIndex(i => Math.max(i! - 1, 0))
          }
        />
      )}
    </section>
  );
}