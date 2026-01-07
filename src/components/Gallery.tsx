import { collections } from "../data/artContent";
import { useTranslation } from "react-i18next";

export default function Gallery() {
  const { i18n } = useTranslation();
  const lang = i18n.language as "en" | "fr";

  return (
    <>
      {collections.map((col) => (
        <section
          key={col.id}
          id={col.id}
          className="gallery-collection"
        >
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
    </>
  )
}

