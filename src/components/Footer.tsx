import { useTranslation } from "react-i18next";

export default function Footer() {
  const { i18n } = useTranslation();
  const lang = i18n.language ?? "en";

  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>© {new Date().getFullYear()} — All works © the artist</p>
        <p className="footer-location">
          {lang.startsWith("fr")
            ? "Présenté pour galeries à Paris et Londres"
            : "Presented for galleries in Paris and London"}
        </p>
      </div>
    </footer>
  );
}