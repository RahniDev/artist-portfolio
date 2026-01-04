import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language ?? "en";
  const isFrench = currentLang.startsWith("fr");

  const toggleLanguage = () => {
    i18n.changeLanguage(isFrench ? "en" : "fr");
  };

  return (
    <header className="navbar">
      <nav className="navbar-inner">
        <NavLink to="/" className="navbar-logo">
          A.
        </NavLink>

        <ul className="navbar-links">
          <li>
            <NavLink to="/" end>
              {t("navbar.home")}
            </NavLink>
          </li>
          <li>
            <NavLink to="/about">
              {t("navbar.about")}
            </NavLink>
          </li>
          <li>
            <NavLink to="/gallery">
              {t("navbar.gallery")}
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact">
              {t("navbar.contact")}
            </NavLink>
          </li>
        </ul>

        <button
          className="lang-toggle"
          onClick={toggleLanguage}
          aria-label="Toggle language"
        >
          {isFrench ? "EN" : "FR"}
        </button>
      </nav>
    </header>
  );
}