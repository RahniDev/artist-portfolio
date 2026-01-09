import { Link } from "react-router-dom";
import { collections } from "../data/artContent";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "en" | "fr";

  return (
    <section className="home">
      <div className="hero">
        <h1>Sakari De-Meis</h1>
        <p className="subtitle">{t("home.subtitle")}</p>

        <div className="collections">
          {collections.map((col) => {
            const coverImage = col.pieces[0]?.image;

            return (
              <Link
                key={col.id}
                to={`/gallery/${col.id}`}
                className="collection-card"
                style={{ backgroundImage: `url(${coverImage})` }}
              >
                <div className="collection-overlay">
                  <h3>{col.title}</h3>
                  <span className="collection-cta">
                    {lang.startsWith("fr")
                      ? "Voir la série"
                      : "View series"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}