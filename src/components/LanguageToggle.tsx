import { useTranslation } from "react-i18next";

export default function LangToggle() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language.startsWith("fr") ? "fr" : "en";

  const changeLang = (lang: "en" | "fr") => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="lang-toggle">
      <button
        className={`lang-option ${currentLang === "en" ? "active" : ""}`}
        onClick={() => changeLang("en")}
        aria-pressed={currentLang === "en"}
      >
        EN
      </button>

      <span className="lang-separator">/</span>

      <button
        className={`lang-option ${currentLang === "fr" ? "active" : ""}`}
        onClick={() => changeLang("fr")}
        aria-pressed={currentLang === "fr"}
      >
        FR
      </button>
    </div>
  );
}