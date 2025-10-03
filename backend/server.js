// backend/server.js
import express from 'express';
import cors from 'cors';
import sql from 'mssql';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Database config
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER, // e.g. "ecomserver123.database.windows.net"
  database: process.env.DB_NAME,
  options: { encrypt: true } // required for Azure
};

// --- API Routes ---

// Health check
app.get('/api/health', (req, res) => res.send('Backend running'));

// Get products
app.get('/api/products', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM Products');
    res.json(result.recordset);
  } catch (err) {
    console.error('DB error', err);
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// --- Serve React frontend ---

// ES module __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'build')));

// Send all other requests to React index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// --- Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
