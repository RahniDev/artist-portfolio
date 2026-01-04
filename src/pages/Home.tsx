import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Home() {
  const { t } = useTranslation();

  return (
    <section className="home">
      <div className="hero">
        <h1>{t("artistName")}</h1>
        <p>{t("heroSubtitle")}</p>
        <Link to="/gallery" className="cta">View Collections</Link>
      </div>
    </section>
  );
}
