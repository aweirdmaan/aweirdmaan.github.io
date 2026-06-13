import { useEffect, useState } from 'react';
import { RowsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/rows.css';
import type { Photo } from '../data/gallery';

interface Props {
  photos: Photo[];
}

/**
 * Justified "tiles" gallery (react-photo-album rows layout) with a click-to-enlarge
 * lightbox. One combined gallery — no portrait/landscape distinction.
 */
export default function PhotoGallery({ photos }: Props) {
  const [index, setIndex] = useState<number | null>(null);
  const isOpen = index !== null;

  const close = () => setIndex(null);
  const prev = () => setIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
  const next = () => setIndex((i) => (i === null ? i : (i + 1) % photos.length));

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
      <RowsPhotoAlbum
        photos={photos}
        targetRowHeight={240}
        spacing={10}
        sizes={{ size: '940px', sizes: [{ viewport: '(max-width: 940px)', size: '100vw' }] }}
        onClick={({ index: i }) => setIndex(i)}
        render={{
          // Blur-up: show the tiny LQIP as a blurred backdrop; fade the real image in on load.
          image: (props, { photo }) => (
            <div
              className="blurup"
              style={{
                backgroundImage: `url(${(photo as Photo).lqip})`,
                width: '100%',
                height: '100%',
              }}
            >
              <img
                {...props}
                ref={(el) => {
                  // Cached images may finish before onLoad attaches — reveal immediately.
                  if (el?.complete) el.classList.add('is-loaded');
                }}
                onLoad={(e) => e.currentTarget.classList.add('is-loaded')}
              />
            </div>
          ),
        }}
      />

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
            src={photos[index].large}
            alt={photos[index].alt}
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
