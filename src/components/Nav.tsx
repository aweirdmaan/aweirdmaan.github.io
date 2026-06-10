import { useState } from 'react';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/gallery', label: 'Gallery' },
];

interface Props {
  /** Current pathname, passed from the .astro page so we can mark the active link. */
  pathname: string;
}

/** Normalize a path so "/blog" and "/blog/" both match. */
const norm = (p: string) => (p !== '/' && p.endsWith('/') ? p.slice(0, -1) : p);

export default function Nav({ pathname }: Props) {
  const [open, setOpen] = useState(false);
  const current = norm(pathname);

  return (
    <nav className="nav" aria-label="Primary">
      <a href="/" className="nav__brand">
        Amaan<span>Shaikh</span>
      </a>

      <ul className={`nav__links${open ? ' is-open' : ''}`}>
        {LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              aria-current={current === norm(link.href) ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={`nav__burger${open ? ' is-open' : ''}`}
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
