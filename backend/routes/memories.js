const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => cb(null, uuidv4() + path.extname(file.originalname)),
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// Get memories for a business
router.get('/:businessId', (req, res) => {
  const memories = db.prepare(
    'SELECT * FROM memories WHERE business_id = ? ORDER BY created_at DESC'
  ).all(req.params.businessId);
  res.json(memories);
});

// Add a memory
router.post('/:businessId', upload.single('image'), (req, res) => {
  const { author, story } = req.body;
  const id = uuidv4();
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;
  db.prepare(
    'INSERT INTO memories (id, business_id, author, story, image_url) VALUES (?, ?, ?, ?, ?)'
  ).run(id, req.params.businessId, author, story, image_url);
  res.json({ id, business_id: req.params.businessId, author, story, image_url });
});

module.exports = router;