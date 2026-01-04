import { FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {

  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>© {new Date().getFullYear()} — All works © the artist</p>

        <div className="footer-social">
          <a
            href="https://instagram.com/sakouji.art"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="instagram"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/sakari"
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
