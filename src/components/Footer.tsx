import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>© {new Date().getFullYear()} Sakari De-Meis. {t("copyright")}</p>

        <div className="footer-social">
          <a
            href="https://instagram.com/sakari.art"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="instagram"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/sakari-developer"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
