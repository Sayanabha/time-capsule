const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));

app.use('/api/businesses', require('./routes/businesses'));
app.use('/api/memories', require('./routes/memories'));

// Try multiple possible paths for the frontend dist
const possiblePaths = [
  path.join(__dirname, '../frontend/dist'),
  path.join(__dirname, '../../frontend/dist'),
  path.join(process.cwd(), 'frontend/dist'),
];

const frontendDist = possiblePaths.find(p => fs.existsSync(p));

if (frontendDist) {
  console.log('Serving frontend from:', frontendDist);
  app.use(express.static(frontendDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
} else {
  console.warn('Frontend dist not found. Checked:', possiblePaths);
  app.get('*', (req, res) => {
    res.status(404).send('Frontend not built. Dist folder not found.');
  });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));