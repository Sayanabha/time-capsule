import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../api'
import MemoryCard from '../components/MemoryCard'
import MemoryForm from '../components/MemoryForm'

export default function BusinessPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [business, setBusiness] = useState(null)
  const [memories, setMemories] = useState([])

  const loadBusiness = () => api.get(`/api/businesses/${id}`).then(data => setBusiness(data))
  const loadMemories = () => api.get(`/api/memories/${id}`).then(data => setMemories(data))

  useEffect(() => { loadBusiness(); loadMemories() }, [id])

  const closeBusiness = async () => {
    if (!confirm(`Mark "${business.name}" as permanently closed? This will open the time capsule.`)) return
    await api.patch(`/api/businesses/${id}/close`)
    loadBusiness()
  }

  if (!business) return <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--muted)' }}>Loading…</div>

  const closed = business.status === 'closed'

  return (
    <main style={{ maxWidth: '720px', margin: '0 auto', padding: '4rem 2rem' }}>
      <button
        onClick={() => navigate('/')}
        style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2.5rem', padding: 0 }}
      >
        ← Back
      </button>

      <div style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{
            fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase',
            padding: '0.25rem 0.6rem',
            background: closed ? 'var(--closed)' : 'var(--open)',
            color: 'white',
          }}>
            {closed ? 'Closed' : 'Open'}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {business.category}
          </span>
        </div>

        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{business.name}</h1>
        {business.address && <p style={{ color: 'var(--muted)', marginBottom: '0.75rem' }}>{business.address}</p>}
        {business.description && <p style={{ fontSize: '0.95rem', lineHeight: '1.7' }}>{business.description}</p>}

        {!closed && (
          <button
            onClick={closeBusiness}
            style={{
              marginTop: '1.5rem',
              background: 'none',
              border: '1px solid var(--closed)',
              color: 'var(--closed)',
              padding: '0.55rem 1.25rem',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Mark as Permanently Closed
          </button>
        )}
      </div>

      {closed && (
        <div style={{
          background: '#fff8f0',
          border: '1px solid #f0d9c0',
          padding: '1.5rem',
          marginBottom: '2rem',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📦</div>
          <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontStyle: 'italic' }}>
            The capsule has opened. These memories are now part of community history.
          </p>
        </div>
      )}

      <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>
        {memories.length} {memories.length === 1 ? 'Memory' : 'Memories'}
      </h2>

      {memories.length === 0 && (
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
          No memories yet. Be the first to leave one.
        </p>
      )}

      {memories.map(m => <MemoryCard key={m.id} memory={m} />)}

      {!closed && <MemoryForm businessId={id} onAdded={loadMemories} />}
    </main>
  )
}