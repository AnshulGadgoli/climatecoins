import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

// Mock Express app for testing access control
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const JWT_SECRET = 'hackathon_secret_do_not_use_in_prod';

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

app.get('/api/fpo/data', authenticate, authorize(['FPO']), (req, res) => res.json({ data: 'FPO Data' }));
app.get('/api/buyer/data', authenticate, authorize(['BUYER']), (req, res) => res.json({ data: 'Buyer Data' }));
app.get('/api/admin/data', authenticate, authorize(['ADMIN']), (req, res) => res.json({ data: 'Admin Data' }));

describe('Role-based Access Control (RBAC)', () => {
  const generateToken = (role, entity_id) => jwt.sign({ id: 'test', role, entity_id }, JWT_SECRET);

  it('allows FPO to access FPO routes', async () => {
    const res = await request(app)
      .get('/api/fpo/data')
      .set('Cookie', `token=${generateToken('FPO', 'fpo-1')}`);
    expect(res.status).toBe(200);
  });

  it('blocks FPO from accessing Buyer routes (403 Forbidden)', async () => {
    const res = await request(app)
      .get('/api/buyer/data')
      .set('Cookie', `token=${generateToken('FPO', 'fpo-1')}`);
    expect(res.status).toBe(403);
  });

  it('blocks unauthenticated requests (401 Unauthorized)', async () => {
    const res = await request(app).get('/api/fpo/data');
    expect(res.status).toBe(401);
  });

  it('blocks Admin from accessing FPO routes if not authorized explicitly', async () => {
    const res = await request(app)
      .get('/api/fpo/data')
      .set('Cookie', `token=${generateToken('ADMIN', 'admin-1')}`);
    expect(res.status).toBe(403);
  });
});
