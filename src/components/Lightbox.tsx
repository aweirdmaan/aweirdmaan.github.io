import { useEffect, useState } from 'react';

export interface GalleryItem {
  src: string;
  alt: string;
}

interface Props {
  items: GalleryItem[];
}

/**
 * Renders the masonry gallery and an overlay lightbox. Clicking a figure opens
 * the enlarged image; Escape, clicking the backdrop, or the arrows navigate/close.
 */
export default function Lightbox({ items }: Props) {
  const [index, setIndex] = useState<number | null>(null);
  const isOpen = index !== null;

  const close = () => setIndex(null);
  const prev = () => setIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length));
  const next = () => setIndex((i) => (i === null ? i : (i + 1) % items.length));

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  return (
    <>
      <div className="masonry">
        {items.map((item, i) => (
          <figure key={item.src} onClick={() => setIndex(i)}>
            <img src={item.src} alt={item.alt} loading="lazy" />
          </figure>
        ))}
      </div>

      {isOpen && (
        <div className="lb" role="dialog" aria-modal="true" onClick={close}>
          <button className="lb__close" aria-label="Close" onClick={close}>
            &times;
          </button>
          <button
            className="lb__nav lb__prev"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            &#8249;
          </button>
          <img
            className="lb__img"
            src={items[index].src}
            alt={items[index].alt}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="lb__nav lb__next"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            &#8250;
          </button>
        </div>
      )}
    </>
  );
}
