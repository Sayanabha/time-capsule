import { Link } from 'react-router-dom'
import { api } from '../api'

const S = {
  card: (closed) => ({
    border: '1px solid var(--border)',
    padding: '1.75rem',
    background: closed ? '#faf7f2' : 'white',
    transition: 'transform 0.2s, box-shadow 0.2s',
    position: 'relative',
    overflow: 'hidden',
  }),
  ribbon: (closed) => ({
    position: 'absolute',
    top: '1rem',
    right: '-0.25rem',
    background: closed ? 'var(--closed)' : 'var(--open)',
    color: 'white',
    fontSize: '0.65rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    padding: '0.2rem 0.75rem',
  }),
  category: { fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.5rem' },
  name: { fontSize: '1.3rem', marginBottom: '0.4rem' },
  address: { fontSize: '0.85rem', color: 'var(--muted)' },
  footer: { marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  footerLink: { fontSize: '0.8rem', color: 'var(--warm)', letterSpacing: '0.03em' },
  deleteBtn: { background: 'none', border: 'none', fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer', padding: 0 },
}

export default function BusinessCard({ business, onDeleted }) {
  const closed = business.status === 'closed'

  const handleDelete = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!confirm(`Delete "${business.name}"? This cannot be undone.`)) return
    await api.delete(`/api/businesses/${business.id}`)
    onDeleted()
  }

  return (
    <Link to={`/business/${business.id}`}>
      <div
        style={S.card(closed)}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.07)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
      >
        <div style={S.ribbon(closed)}>{closed ? 'Closed' : 'Open'}</div>
        <div style={S.category}>{business.category || 'Local Business'}</div>
        <h2 style={S.name}>{business.name}</h2>
        <div style={S.address}>{business.address}</div>
        <div style={S.footer}>
          <span style={S.footerLink}>{closed ? '📦 View memories' : '✦ Add your memory'}</span>
          <button style={S.deleteBtn} onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </Link>
  )
}