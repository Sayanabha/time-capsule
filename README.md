# TimeCapsule

Live at: https://time-capsule-986i.onrender.com/

Every neighborhood has a story. Most of it dies when the shops close.

TimeCapsule lets residents attach memories, photos, and stories to local businesses while they're still open. When a place shuts down for good, the capsule opens -- and what was private becomes a permanent piece of community history.

Think of it as a slow-motion oral history project, except nobody has to show up to a town hall.

---

## What it does

- Register local businesses (cafes, bookshops, barbershops, whatever matters)
- Drop in a memory: a story, a photo, a name, a feeling
- Mark a business as permanently closed
- Watch the capsule open -- all memories go public
- Browse the archive of places that no longer exist but aren't forgotten

---

## Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: SQLite via better-sqlite3 (no setup, no config, no excuses)
- **File uploads**: Multer

---

## Getting started

You need Node.js installed. That's it.
```bash
# Clone the repo
git clone https://github.com/Sayanabha/time-capsule.git
cd time-capsule

# Start the backend
cd backend && npm install && npm start

# In a new terminal, start the frontend
cd frontend && npm install && npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and start adding places.

The backend runs on port 4000. Visiting it directly in the browser will return nothing useful -- that's expected. The API lives at `/api/businesses` and `/api/memories/:id`.

---

## Project structure
```
time-capsule/
├── backend/
│   ├── server.js         Entry point
│   ├── db.js             SQLite setup
│   ├── routes/
│   │   ├── businesses.js
│   │   └── memories.js
│   └── uploads/          Where photos go
└── frontend/
    └── src/
        ├── pages/        Home, BusinessPage, Archive
        └── components/   Cards, forms, navbar
```

---

## License

MIT. Use it, fork it, deploy it for your neighborhood.