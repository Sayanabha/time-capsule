import { useState, useEffect } from 'react'
import axios from 'axios'
import BusinessCard from '../components/BusinessCard'

const inp = {
  padding: '0.75rem 1rem',
  border: '1px solid var(--border)',
  background: 'white',
  fontSize: '0.9rem',
  outline: 'none',
  width: '100%',
  color: 'var(--ink)',
}

const fields = [
  { key: 'name', placeholder: 'Business name *' },
  { key: 'address', placeholder: 'Address' },
  { key: 'category', placeholder: 'Category (e.g. Bakery, Bookshop…)' },
]

export default function Home() {
  const [businesses, setBusinesses] = useState([])
  const [form, setForm] = useState({ name: '', address: '', category: '', description: '' })
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  const load = () => axios.get('/api/businesses').then(r => setBusinesses(r.data))

  useEffect(() => { load() }, [])

  const submit = async () => {
    if (!form.name.trim()) return
    setLoading(true)
    try {
      await axios.post('/api/businesses', form)
      setForm({ name: '', address: '', category: '', description: '' })
      setShowForm(false)
      load()
    } finally {
      setLoading(false)
    }
  }

  const open = businesses.filter(b => b.status === 'open')
  const closed = businesses.filter(b => b.status === 'closed')

  return (
    <main style={{ maxWidth: '860px', margin: '0 auto', padding: '4rem 2rem' }}>
      {/* Hero */}
      <div style={{ marginBottom: '4rem' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1rem' }}>
          A living archive
        </p>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', marginBottom: '1.25rem', lineHeight: '1.15' }}>
          Every business holds<br /><em>a thousand stories.</em>
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--muted)', maxWidth: '480px', marginBottom: '2rem' }}>
          Add memories to local businesses before they're gone. When a place closes, its capsule opens — preserving the community's history forever.
        </p>
        <button
          onClick={() => setShowForm(s => !s)}
          style={{
            background: 'none',
            border: '1px solid var(--ink)',
            padding: '0.65rem 1.5rem',
            fontSize: '0.8rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
          }}
        >
          {showForm ? '— Cancel' : '+ Register a Business'}
        </button>
      </div>

      {/* Add Business Form */}
      {showForm && (
        <div style={{ border: '1px solid var(--border)', padding: '2rem', marginBottom: '3rem', background: 'white' }}>
          <h3 style={{ fontFamily: 'Playfair Display', marginBottom: '1.25rem' }}>Register a local business</h3>
          {fields.map(f => (
            <input
              key={f.key}
              style={{ ...inp, marginBottom: '0.75rem' }}
              placeholder={f.placeholder}
              value={form[f.key]}
              onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
            />
          ))}
          <textarea
            style={{ ...inp, resize: 'vertical', minHeight: '80px', marginBottom: '1rem' }}
            placeholder="Brief description (optional)"
            value={form.description}
            onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
          />
          <button
            onClick={submit}
            disabled={loading}
            style={{
              background: 'var(--ink)', color: 'var(--cream)', border: 'none',
              padding: '0.75rem 2rem', fontSize: '0.85rem',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? 'Registering…' : 'Register'}
          </button>
        </div>
      )}

      {/* Open Businesses */}
      {open.length > 0 && (
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1.25rem' }}>
            Open — seal your memories now
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {open.map(b => <BusinessCard key={b.id} business={b} onDeleted={load} />)}
          </div>
        </section>
      )}

      {/* Closed Businesses */}
      {closed.length > 0 && (
        <section>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1.25rem' }}>
            Closed — capsule opened
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {closed.map(b => <BusinessCard key={b.id} business={b} onDeleted={load} />)}
          </div>
        </section>
      )}

      {businesses.length === 0 && (
        <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '4rem 0', fontSize: '0.9rem' }}>
          No businesses yet. Register the first one above.
        </p>
      )}
    </main>
  )
}