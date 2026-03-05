const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// Get all businesses
router.get('/', (req, res) => {
  const businesses = db.prepare('SELECT * FROM businesses ORDER BY created_at DESC').all();
  res.json(businesses);
});

// Get single business
router.get('/:id', (req, res) => {
  const business = db.prepare('SELECT * FROM businesses WHERE id = ?').get(req.params.id);
  if (!business) return res.status(404).json({ error: 'Not found' });
  res.json(business);
});

// Create business
router.post('/', (req, res) => {
  const { name, address, category, description } = req.body;
  const id = uuidv4();
  db.prepare(
    'INSERT INTO businesses (id, name, address, category, description) VALUES (?, ?, ?, ?, ?)'
  ).run(id, name, address, category, description);
  res.json({ id, name, address, category, description, status: 'open' });
});

// Close a business (opens the capsule)
router.patch('/:id/close', (req, res) => {
  db.prepare('UPDATE businesses SET status = ? WHERE id = ?').run('closed', req.params.id);
  res.json({ success: true });
});
// Delete a business and its memories
router.delete('/:id', (req, res) => {
  db.prepare('DELETE FROM memories WHERE business_id = ?').run(req.params.id)
  db.prepare('DELETE FROM businesses WHERE id = ?').run(req.params.id)
  res.json({ success: true })
})
module.exports = router;