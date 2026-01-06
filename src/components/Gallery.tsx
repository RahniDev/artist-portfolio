import { collections } from "../data/artContent";
import { useTranslation } from "react-i18next";

export default function Gallery() {
  const { i18n } = useTranslation();
  const lang = i18n.language as "en" | "fr";

  return (
    <section className="gallery-page">
      {collections.map((col) => (
        <div key={col.id} className="collection">
          <h3>{col.title[lang]}</h3>
       
          <div className="pieces-grid">
            {col.pieces.map((piece) => (
              <div key={piece.id} className="piece-card">
                <img
                  src={piece.image}
                  width='300px'
                  height='270px'
                  alt={piece.title[lang]}
                />
                <h4>{piece.title[lang]}</h4>
                <p>{piece.description[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}