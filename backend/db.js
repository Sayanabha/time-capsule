const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'capsule.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS businesses (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT,
    category TEXT,
    description TEXT,
    status TEXT DEFAULT 'open',
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS memories (
    id TEXT PRIMARY KEY,
    business_id TEXT NOT NULL,
    author TEXT,
    story TEXT,
    image_url TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (business_id) REFERENCES businesses(id)
  );
`);

module.exports = db;