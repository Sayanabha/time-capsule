import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Archive() {
  const [closed, setClosed] = useState([])

  useEffect(() => {
    axios.get('/api/businesses').then(r =>
      setClosed(r.data.filter(b => b.status === 'closed'))
    )
  }, [])

  return (
    <main style={{ maxWidth: '720px', margin: '0 auto', padding: '4rem 2rem' }}>
      <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1rem' }}>
        Community Archive
      </p>
      <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: '0.75rem' }}>
        Places we remember.
      </h1>
      <p style={{ color: 'var(--muted)', marginBottom: '3rem', maxWidth: '420px' }}>
        These businesses have closed. Their capsules are now open — a permanent record of community memory.
      </p>

      {closed.length === 0 && (
        <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '4rem 0' }}>
          No closed businesses yet.
        </p>
      )}

      {closed.map(b => (
        <Link to={`/business/${b.id}`} key={b.id}>
          <div
            style={{
              borderBottom: '1px solid var(--border)',
              padding: '1.5rem 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.15rem', marginBottom: '0.25rem' }}>{b.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{b.address || b.category}</div>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--warm)', letterSpacing: '0.05em' }}>View →</div>
          </div>
        </Link>
      ))}
    </main>
  )
}