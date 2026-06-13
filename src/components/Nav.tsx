import { useEffect, useState } from 'react';

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
  // undefined until mounted, so we don't render the wrong icon during SSR/hydration.
  const [theme, setTheme] = useState<string | undefined>(undefined);
  const current = norm(pathname);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme ?? 'light');
  }, []);

  const toggleTheme = () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
    setTheme(next);
  };

  return (
    <nav className="nav" aria-label="Primary">
      <a href="/" className="nav__brand">
        Amaan<span>Shaikh</span>
      </a>

      <div className="nav__right">
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
          className="nav__theme"
          aria-label="Toggle dark mode"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? (
            // Sun — click to go light
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4" />
            </svg>
          ) : (
            // Moon — click to go dark
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
          )}
        </button>

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
      </div>
    </nav>
  );
}
