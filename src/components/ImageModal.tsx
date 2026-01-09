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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const [lensPos, setLensPos] = useState<{ x: number; y: number } | null>(null);

  const LENS_SIZE = 120;
  const ZOOM = 2.5;
  const isDesktop = window.matchMedia("(hover: hover)").matches;

  useEffect(() => {
    setLensPos(null);
  }, [currentIndex]);

  /* ---------------- Position calculation ---------------- */
  const updateLensPosition = (clientX: number, clientY: number) => {
    const img = imgRef.current;
    if (!img) return;

    const rect = img.getBoundingClientRect();

    if (
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom
    ) {
      setLensPos(null);
      return;
    }

    setLensPos({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
  };

  /* ---------------- Mouse ---------------- */
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop) return;
    updateLensPosition(e.clientX, e.clientY);
  };

  const onMouseLeave = () => setLensPos(null);

  /* ---------------- Touch ---------------- */
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    if (t) updateLensPosition(t.clientX, t.clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const t = e.touches[0];
    if (t) updateLensPosition(t.clientX, t.clientY);
  };

  const onTouchEnd = () => setLensPos(null);

  /* ---------------- Zoom math ---------------- */
  const img = imgRef.current;
  const scaleX = img ? img.naturalWidth / img.clientWidth : 1;
  const scaleY = img ? img.naturalHeight / img.clientHeight : 1;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        {currentIndex > 0 && (
          <button className="modal-nav prev" onClick={onPrev}>‹</button>
        )}
        {currentIndex < images.length - 1 && (
          <button className="modal-nav next" onClick={onNext}>›</button>
        )}

        <div
          ref={wrapperRef}
          className="modal-image-wrapper"
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <img
            ref={imgRef}
            src={images[currentIndex]}
            alt={titles[currentIndex]}
            draggable={false}
          />

          {lensPos && img && (
            <div
              className="magnifier-lens"
              style={{
                width: LENS_SIZE,
                height: LENS_SIZE,
                left: lensPos.x - LENS_SIZE / 2,
                top: lensPos.y - LENS_SIZE / 2,
                backgroundImage: `url(${images[currentIndex]})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: `${
                  img.naturalWidth * ZOOM
                }px ${img.naturalHeight * ZOOM}px`,
                backgroundPosition: `-${
                  lensPos.x * scaleX * ZOOM - LENS_SIZE / 2
                }px -${
                  lensPos.y * scaleY * ZOOM - LENS_SIZE / 2
                }px`,
              }}
            />
          )}
        </div>

        <div className="modal-caption">{titles[currentIndex]}</div>
      </div>
    </div>
  );
}
