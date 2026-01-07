import { useTranslation } from "react-i18next";
import { collections } from "../data/artContent";

export default function Home() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "en" | "fr";

  return (
    <section className="home">
      <div className="hero">
        <h1>Sakari</h1>
        <p>{t("heroSubtitle")}</p>
        <div className="collections">
          {collections.map((col) => (
            <a
              key={col.id}
              href={`/gallery#${col.id}`}
              className="collection-card"
            >
              <h3>{col.title[lang]}</h3>
              <span className="collection-cta">
                {lang.startsWith("fr") ? "Voir la collection" : "View collection"}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
