const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 4000;

// Ensure uploads dir exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));

app.use('/api/businesses', require('./routes/businesses'));
app.use('/api/memories', require('./routes/memories'));

app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));