import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import LanguageToggle from "./LanguageToggle";

export default function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <nav className="navbar-inner">
        <NavLink to="/" className="navbar-logo" onClick={() => setOpen(false)}>
          SK
        </NavLink>

        {/* Links */}
        <ul className={`navbar-links ${open ? "open" : ""}`}>
          <li>
            <NavLink to="/" onClick={() => setOpen(false)}>
              {t("navbar.home")}
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={() => setOpen(false)}>
              {t("navbar.about")}
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={() => setOpen(false)}>
              {t("navbar.contact")}
            </NavLink>
          </li>       
          </ul>
           <LanguageToggle />
           {/* Hamburger (mobile only) */}
        <button
          className={`hamburger ${open ? "open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
    </header>
  );
}
