import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageToggle from "./LanguageToggle";

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <header className="navbar">
      <nav className="navbar-inner">
        <NavLink to="/" className="navbar-logo">
          SK
        </NavLink>

        <ul className="navbar-links">
          <li>
            <NavLink to="/" end>
              {t("navbar.home")}
            </NavLink>
          </li>
          <li>
            <NavLink to="/about">{t("navbar.about")}</NavLink>
          </li>
          <li>          </li>
          <li>
            <NavLink to="/contact">{t("navbar.contact")}</NavLink>
          </li>
        </ul>

        <LanguageToggle />
      </nav>
    </header>
  );
}