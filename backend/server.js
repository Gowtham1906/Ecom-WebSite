// backend/server.js
import express from 'express';
import cors from 'cors';
import sql from 'mssql';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

// -------------------- AUTH ROUTES ----------------------

// Signup route
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const pool = await sql.connect(config);

    // Check if username exists
    const existing = await pool.request()
      .input('username', sql.NVarChar, username)
      .query('SELECT * FROM Users WHERE Username = @username');

    if (existing.recordset.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hash = await bcrypt.hash(password, 10);

    await pool.request()
      .input('username', sql.NVarChar, username)
      .input('passwordHash', sql.NVarChar, hash)
      .query('INSERT INTO Users (Username, PasswordHash) VALUES (@username, @passwordHash)');

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const pool = await sql.connect(config);

    const result = await pool.request()
      .input('username', sql.NVarChar, username)
      .query('SELECT * FROM Users WHERE Username = @username');

    const user = result.recordset[0];
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.PasswordHash);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token (expires in 1 hour)
    const token = jwt.sign({ userId: user.Id, username: user.Username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Middleware to protect routes
export const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Example protected route
app.get('/api/profile', authenticate, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}` });
});

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
