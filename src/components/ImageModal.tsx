import { useEffect, useRef } from "react";

type ImageModalProps = {
  images: string[];
  titles: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
};

export default function ImageModal({
  images,
  titles,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: ImageModalProps) {
  const startX = useRef<number | null>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onNext, onPrev]);

  // Swipe handling
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const diff = e.changedTouches[0].clientX - startX.current;
    if (diff > 60) onPrev();
    if (diff < -60) onNext();
    startX.current = null;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        {currentIndex > 0 && (
          <button className="modal-nav prev" onClick={onPrev}>
            ‹
          </button>
        )}

        {currentIndex < images.length - 1 && (
          <button className="modal-nav next" onClick={onNext}>
            ›
          </button>
        )}

        <img src={images[currentIndex]} alt={titles[currentIndex]} />

        {/* TITLE */}
        <div className="modal-caption">
          {titles[currentIndex]}
        </div>
      </div>
    </div>
  );
}
