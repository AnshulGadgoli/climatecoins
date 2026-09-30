import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './db.js';

const app = express();
app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Updated to 5173!
app.use(express.json());
app.use(cookieParser());

const JWT_SECRET = 'hackathon_secret_do_not_use_in_prod';

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
