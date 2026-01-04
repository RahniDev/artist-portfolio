import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  const lang = i18n.resolvedLanguage ?? "en";
  const isFrench = lang.startsWith("fr");

  const toggleLanguage = () => {
    if (!i18n.changeLanguage) {
      console.error("i18n.changeLanguage is not available!");
      return;
    }
    i18n.changeLanguage(isFrench ? "en" : "fr");
  };

  return (
    <button className="lang-toggle" onClick={toggleLanguage}>
      {isFrench ? "EN" : "FR"}
    </button>
  );
}
