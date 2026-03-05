import { useState } from 'react'
import axios from 'axios'

const inp = {
  width: '100%',
  padding: '0.75rem 1rem',
  border: '1px solid var(--border)',
  background: 'var(--cream)',
  fontSize: '0.9rem',
  outline: 'none',
  marginBottom: '0.75rem',
  color: 'var(--ink)',
}

export default function MemoryForm({ businessId, onAdded }) {
  const [form, setForm] = useState({ author: '', story: '' })
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    if (!form.story.trim()) return
    setLoading(true)
    const fd = new FormData()
    fd.append('author', form.author)
    fd.append('story', form.story)
    if (file) fd.append('image', file)
    try {
      await axios.post(`/api/memories/${businessId}`, fd)
      setForm({ author: '', story: '' })
      setFile(null)
      onAdded()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1.25rem', fontSize: '1.1rem' }}>
        Leave a memory
      </h3>
      <input
        style={inp}
        placeholder="Your name (optional)"
        value={form.author}
        onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
      />
      <textarea
        style={{ ...inp, resize: 'vertical', minHeight: '120px' }}
        placeholder="Share a memory, story, or feeling about this place…"
        value={form.story}
        onChange={e => setForm(f => ({ ...f, story: e.target.value }))}
      />
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ fontSize: '0.8rem', color: 'var(--muted)', display: 'block', marginBottom: '0.4rem' }}>
          Add a photo (optional)
        </label>
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
      </div>
      <button
        onClick={submit}
        disabled={loading}
        style={{
          background: 'var(--ink)',
          color: 'var(--cream)',
          border: 'none',
          padding: '0.75rem 2rem',
          fontSize: '0.85rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? 'Saving…' : 'Seal Memory'}
      </button>
    </div>
  )
}