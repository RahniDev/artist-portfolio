import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  return (
    <section className="about">
      <img
        src="/profile.jpg"
        alt="Artist Portrait"
        className="profile-circle"
      />
      <h2>{t("about.title")}</h2>
      <p>{t("about.bio")}</p>
    </section>
  );
}
