/* ============================================================
   COMPONENT — Lightbox
   Full-screen image viewer with keyboard navigation,
   prev/next arrows, dot indicators, and close button.

   Props:
     images     — array of ProjectImage to display
     startIndex — which image to open first (0-based)
     onClose    — callback to unmount the lightbox
   ============================================================ */

import { useState, useEffect, useCallback } from "react"
import type { ProjectImage } from "../types/project"
import { IconArrowLeft, IconArrowRight, IconClose } from "./Icons"
import "../styles/Lightbox.css"

type LightboxProps = {
  images: ProjectImage[]
  startIndex: number
  onClose: () => void
}

export default function Lightbox({ images, startIndex, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(startIndex)

  /* ── Keyboard navigation ── */
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose()
      if (e.key === "ArrowRight") goNext()
      if (e.key === "ArrowLeft")  goPrev()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [current, images.length]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKey)
    /* Lock body scroll while lightbox is open */
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [handleKey])

  /* ── Navigation helpers ── */
  const goNext = () => setCurrent((c) => (c + 1) % images.length)
  const goPrev = () => setCurrent((c) => (c - 1 + images.length) % images.length)

  const img = images[current]
  const hasMultiple = images.length > 1

  return (
    /* Clicking the backdrop (not the image) closes the lightbox */
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onClick={onClose}
    >
      {/* Stop click propagation so clicking the image doesn't close */}
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>

        {/* ── Close button ── */}
        <button
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close image viewer"
        >
          <IconClose width={18} height={18} />
        </button>

        {/* ── Prev arrow ── */}
        {hasMultiple && (
          <button
            className="lightbox-arrow lightbox-arrow--prev"
            onClick={goPrev}
            aria-label="Previous image"
          >
            <IconArrowLeft width={22} height={22} />
          </button>
        )}

        {/* ── Main image — key forces re-animation on change ── */}
        <img
          key={current}
          className="lightbox-img"
          src={img.src}
          alt={img.alt ?? `Image ${current + 1}`}
        />

        {/* ── Next arrow ── */}
        {hasMultiple && (
          <button
            className="lightbox-arrow lightbox-arrow--next"
            onClick={goNext}
            aria-label="Next image"
          >
            <IconArrowRight width={22} height={22} />
          </button>
        )}

        {/* ── Caption (if provided in data) ── */}
        {img.caption && (
          <p className="lightbox-caption">{img.caption}</p>
        )}

        {/* ── Dot indicators — shown when more than 1 image ── */}
        {hasMultiple && (
          <div className="lightbox-dots" role="tablist" aria-label="Image navigation">
            {images.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to image ${i + 1}`}
                className={`lightbox-dot${i === current ? " lightbox-dot--active" : ""}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        )}

        {/* ── Counter e.g. "3 / 9" ── */}
        {hasMultiple && (
          <span className="lightbox-counter">
            {current + 1} / {images.length}
          </span>
        )}

      </div>
    </div>
  )
}