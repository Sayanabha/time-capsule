const S = {
  card: {
    border: '1px solid var(--border)',
    padding: '1.5rem',
    background: 'white',
    marginBottom: '1rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.75rem',
  },
  author: { fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontStyle: 'italic' },
  date: { fontSize: '0.75rem', color: 'var(--muted)' },
  story: { fontSize: '0.95rem', lineHeight: '1.8', color: '#333' },
  img: {
    width: '100%',
    maxHeight: '260px',
    objectFit: 'cover',
    marginTop: '1rem',
    display: 'block',
  },
}

export default function MemoryCard({ memory }) {
  const date = new Date(memory.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
  return (
    <div style={S.card}>
      <div style={S.header}>
        <div style={S.author}>{memory.author || 'Anonymous'}</div>
        <div style={S.date}>{date}</div>
      </div>
      <p style={S.story}>{memory.story}</p>
      {memory.image_url && <img src={memory.image_url} alt="memory" style={S.img} />}
    </div>
  )
}