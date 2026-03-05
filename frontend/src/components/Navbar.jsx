import { Link, useLocation } from 'react-router-dom'

const S = {
  nav: {
    borderBottom: '1px solid var(--border)',
    padding: '1.25rem 2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'var(--cream)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logoWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    textDecoration: 'none',
  },
  icon: {
    width: '32px',
    height: '32px',
    background: 'var(--ink)',
    borderRadius: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    flexShrink: 0,
  },
  wordmark: {
    fontFamily: 'Playfair Display, serif',
    fontSize: '1.1rem',
    letterSpacing: '-0.01em',
    color: 'var(--ink)',
    lineHeight: 1,
  },
  sub: {
    fontSize: '0.6rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--muted)',
    display: 'block',
    marginTop: '2px',
  },
  links: { display: 'flex', gap: '2rem', fontSize: '0.875rem', letterSpacing: '0.05em' },
  link: (active) => ({
    color: active ? 'var(--warm)' : 'var(--muted)',
    fontWeight: active ? 500 : 300,
    textTransform: 'uppercase',
    transition: 'color 0.2s',
  }),
}

export default function Navbar() {
  const { pathname } = useLocation()
  return (
    <nav style={S.nav}>
      <Link to="/" style={S.logoWrap}>
        <div style={S.icon}>📦</div>
        <div>
          <div style={S.wordmark}>TimeCapsule</div>
          <span style={S.sub}>Community Archive</span>
        </div>
      </Link>
      <div style={S.links}>
        <Link to="/" style={S.link(pathname === '/')}>Businesses</Link>
        <Link to="/archive" style={S.link(pathname === '/archive')}>Archive</Link>
      </div>
    </nav>
  )
}