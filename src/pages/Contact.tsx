import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage ?? "en";
  const formRef = useRef<HTMLFormElement | null>(null);

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

 const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.currentTarget;
  if (!form) return;

  try {
    await emailjs.sendForm(
      SERVICE_ID,
      TEMPLATE_ID,
      form,
      PUBLIC_KEY
    );

    form.reset(); 
  } catch (err) {
    console.error("Email failed", err);
  }
};

return (
  <section className="contact">
    <div className="contact-inner">
      <header className="contact-header">
        <h2>{t("contact.title")}</h2>
        <p>
          {lang.startsWith("fr")
            ? "Pour les galeries, conservateurs et commissaires d’exposition."
            : "For galleries, curators, and exhibition inquiries."}
        </p>
      </header>

      <form
        ref={formRef}
        className="contact-form"
        onSubmit={sendEmail}
      >
        <div className="form-group">
          <label htmlFor="name">
            {lang.startsWith("fr") ? "Nom" : "Name"}
          </label>
          <input id="name" name="name" type="text" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>

        <div className="form-group">
          <label htmlFor="message">
            {lang.startsWith("fr") ? "Message" : "Message"}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
          />
        </div>

        <button type="submit" className="contact-submit">
          {lang.startsWith("fr") ? "Envoyer" : "Send"}
        </button>
      </form>
    </div>
  </section>
);
}
