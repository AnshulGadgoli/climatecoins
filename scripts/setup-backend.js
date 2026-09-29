const fs = require('fs');
const path = require('path');

const serverDir = path.join(__dirname, '../server');
if (!fs.existsSync(serverDir)) fs.mkdirSync(serverDir, { recursive: true });

// Basic SQLite setup
const dbJs = `
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(path.join(__dirname, 'climatecoins.db'));

db.pragma('journal_mode = WAL');

// Initial Schema
db.exec(\`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    entity_id TEXT
  );

  CREATE TABLE IF NOT EXISTS audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    action TEXT,
    details TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS farmers (
    id TEXT PRIMARY KEY,
    fpo_id TEXT,
    name TEXT,
    father_spouse TEXT,
    village TEXT,
    mandal TEXT,
    district TEXT,
    phone TEXT,
    aadhaar_last4 TEXT,
    bank_upi TEXT,
    language TEXT,
    consent_status TEXT,
    land_rights_status TEXT
  );

  CREATE TABLE IF NOT EXISTS farms (
    id TEXT PRIMARY KEY,
    farmer_id TEXT,
    survey_no TEXT,
    ownership TEXT,
    lease_years INTEGER,
    area NUMERIC,
    soil_type TEXT,
    soil_ph NUMERIC,
    organic_carbon NUMERIC,
    irrigation_source TEXT,
    rainfall_zone TEXT,
    current_crop TEXT,
    previous_crop TEXT,
    crop_rotation TEXT,
    fertilizer_type TEXT,
    tillage TEXT,
    residue_management TEXT,
    organic_manure TEXT,
    cover_crop TEXT,
    land_use_now TEXT,
    land_use_5yr TEXT,
    tree_cover_5yr NUMERIC,
    forest_after_2000 TEXT,
    other_scheme TEXT,
    income_bracket TEXT,
    polygon TEXT,
    eligibility_status TEXT,
    eligibility_reason TEXT,
    cluster_id TEXT,
    project_id TEXT
  );
\`);

export default db;
`;

fs.writeFileSync(path.join(serverDir, 'db.ts'), dbJs);

const serverTs = `
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './db.js';
import { z } from 'zod';

const app = express();
app.use(helmet());
app.use(cors({ origin: 'http://localhost:5174', credentials: true }));
app.use(express.json());
app.use(cookieParser());

const JWT_SECRET = 'hackathon_secret_do_not_use_in_prod';

// Auth Middleware
const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};

const logAudit = (userId, action, details) => {
  const stmt = db.prepare('INSERT INTO audit_logs (user_id, action, details) VALUES (?, ?, ?)');
  stmt.run(userId, action, JSON.stringify(details));
};

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = jwt.sign({ id: user.id, role: user.role, entity_id: user.entity_id }, JWT_SECRET, { expiresIn: '1d' });
  logAudit(user.id, 'LOGIN', { username });
  
  res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'lax' });
  res.json({ id: user.id, role: user.role, entity_id: user.entity_id });
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true });
});

// FPO: Get own farmers
app.get('/api/fpo/farmers', authenticate, authorize(['FPO']), (req, res) => {
  const farmers = db.prepare('SELECT * FROM farmers WHERE fpo_id = ?').all(req.user.entity_id);
  // Masking Bank details
  const masked = farmers.map(f => ({ ...f, bank_upi: '****' + f.bank_upi.slice(-4) }));
  res.json(masked);
});

// Simple catch-all for now
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
`;

fs.writeFileSync(path.join(serverDir, 'index.ts'), serverTs);
console.log('Backend setup complete.');
