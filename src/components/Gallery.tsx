import { useTranslation } from "react-i18next";
import { collections } from "../data/artContent";
import type { Lang } from "../types.ts";

export default function Gallery() {
    const { i18n } = useTranslation();

    // ✅ SAFE language resolution
    const lang = ((i18n.resolvedLanguage ??
        i18n.language ??
        "en") as string).startsWith("fr")
        ? "fr"
        : "en";

    const typedLang = lang as Lang;

    return (
        <section className="gallery-page">
            {collections.map((col) => (
                <div key={col.id} className="collection">
                    <h3>{col.title[typedLang]}</h3>
                    <p>{col.description[typedLang]}</p>

                    <div className="pieces-grid">
                        {col.pieces.map((piece) => (
                            <div key={piece.id} className="piece-card">
                                <img src={piece.image} alt={piece.title[typedLang]} />
                                <h4>{piece.title[typedLang]}</h4>
                                <p>{piece.description[typedLang]}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
}