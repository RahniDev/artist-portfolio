import { useEffect, useRef, useState } from "react";

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
  const lastTap = useRef<number>(0);
  const imgRef = useRef<HTMLImageElement>(null);

  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [zoomed, setZoomed] = useState(false); // optional full zoom
  const [lensPos, setLensPos] = useState<{ x: number; y: number } | null>(null);
  const zoom = 2; // magnifier zoom factor
  const lensSize = 120;

  const isDesktop = window.matchMedia("(hover: hover)").matches;

  /* ---------------- Keyboard ---------------- */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (!zoomed && e.key === "ArrowRight") onNext();
      if (!zoomed && e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [zoomed, onClose, onNext, onPrev]);

  /* Reset lens when image changes */
  useEffect(() => {
    setLensPos(null);
  }, [currentIndex]);

  /* ---------------- Touch (mobile swipe + optional double-tap zoom) ---------------- */
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    const now = Date.now();
    if (now - lastTap.current < 300) {
      setZoomed((z) => !z);
    }
    lastTap.current = now;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;

    const diff = e.changedTouches[0].clientX - startX.current;
    if (diff > 60) onPrev();
    if (diff < -60) onNext();

    startX.current = null;
  };

  /* ---------------- Mouse ---------------- */
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop || !imgRef.current) return;

    const rect = imgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Only show lens if cursor is over image
    if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
      setLensPos({ x, y });
    } else {
      setLensPos(null);
    }
  };

  const onMouseLeave = () => setLensPos(null);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ position: "relative" }}
      >
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        {!zoomed && currentIndex > 0 && (
          <button className="modal-nav prev" onClick={onPrev}>
            ‹
          </button>
        )}
        {!zoomed && currentIndex < images.length - 1 && (
          <button className="modal-nav next" onClick={onNext}>
            ›
          </button>
        )}

        <img
          ref={imgRef}
          src={images[currentIndex]}
          alt={titles[currentIndex]}
          style={{
            display: "block",
            maxWidth: "90vw",
            maxHeight: "80vh",
            cursor: "none",
          }}
          onMouseEnter={() => setIsHoveringImage(true)}
          onMouseLeave={() => setIsHoveringImage(false)}
        />


        {/* Magnifier Lens */}
        {isDesktop && lensPos && isHoveringImage && imgRef.current && (
          <div
            className="magnifier-lens"
            style={{
              position: "absolute",
              width: lensSize,
              height: lensSize,
              borderRadius: "50%",
              pointerEvents: "none",
              border: "2px solid rgba(255,255,255,0.8)",
              boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
              backgroundImage: `url(${images[currentIndex]})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${imgRef.current.width * zoom}px ${imgRef.current.height * zoom}px`,
              left: lensPos.x - lensSize / 2,
              top: lensPos.y - lensSize / 2,
              backgroundPosition: `-${lensPos.x * zoom - lensSize / 2}px -${lensPos.y * zoom - lensSize / 2}px`,
              zIndex: 10,
            }}
          />
        )}

        <div className="modal-caption">{titles[currentIndex]}</div>
      </div>
    </div>
  );
}