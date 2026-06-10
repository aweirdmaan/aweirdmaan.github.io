// Photos are generated from Cloudinary at build time → src/data/gallery.json
// (see scripts/fetch-gallery.mjs). That file is gitignored; regenerate with `npm run gallery`.
import photosData from './gallery.json';

export interface SrcSetEntry {
  src: string;
  width: number;
  height: number;
}

export interface Photo {
  /** Display URL (~1280w, optimized). */
  src: string;
  /** High-resolution URL for the lightbox. */
  large: string;
  /** Original dimensions — drive the justified layout's aspect ratios. */
  width: number;
  height: number;
  alt: string;
  srcSet: SrcSetEntry[];
}

export const photos: Photo[] = photosData as Photo[];
