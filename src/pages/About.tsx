import { useTranslation } from "react-i18next";
import profileImg from '../assets/profile.jpg';

export default function About() {
  const { t } = useTranslation();

  return (
    <section className="about">
      <img
        src={profileImg}
        alt="Artist Portrait"
        className="profile-circle"
      />
      <div className="about-intro">
      <h1>{t("about.title")}</h1>
      <p>{t("about.bio")}</p>
      </div>
    </section>
  );
}
