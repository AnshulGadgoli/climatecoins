import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(path.join(__dirname, '../server/climatecoins.db'));

// Initial Schema
db.exec(`
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
`);

// Clear existing
db.exec('DELETE FROM users; DELETE FROM farmers; DELETE FROM farms; DELETE FROM audit_logs;');

const insertUser = db.prepare('INSERT INTO users (id, username, password, role, entity_id) VALUES (?, ?, ?, ?, ?)');
const insertFarmer = db.prepare('INSERT INTO farmers (id, fpo_id, name, father_spouse, village, mandal, district, phone, aadhaar_last4, bank_upi, language, consent_status, land_rights_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
const insertFarm = db.prepare('INSERT INTO farms (id, farmer_id, survey_no, ownership, lease_years, area, soil_type, soil_ph, organic_carbon, irrigation_source, rainfall_zone, current_crop, previous_crop, crop_rotation, fertilizer_type, tillage, residue_management, organic_manure, cover_crop, land_use_now, land_use_5yr, tree_cover_5yr, forest_after_2000, other_scheme, income_bracket, polygon, eligibility_status, eligibility_reason, cluster_id, project_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

const defaultPassword = bcrypt.hashSync('demo123', 10);

// Admin
insertUser.run('u-admin', 'admin', defaultPassword, 'ADMIN', 'admin-1');

// Verifiers
insertUser.run('u-v1', 'verifier1', defaultPassword, 'VERIFIER', 'ver-1');
insertUser.run('u-v2', 'verifier2', defaultPassword, 'VERIFIER', 'ver-2');

// Buyers
insertUser.run('u-b1', 'buyer1', defaultPassword, 'BUYER', 'buy-1');
insertUser.run('u-b2', 'buyer2', defaultPassword, 'BUYER', 'buy-2');
insertUser.run('u-b3', 'buyer3', defaultPassword, 'BUYER', 'buy-3');

// FPOs
const fpos = ['fpo-1', 'fpo-2', 'fpo-3', 'fpo-4'];
fpos.forEach((fpo, i) => {
  insertUser.run(`u-fpo${i+1}`, fpo, defaultPassword, 'FPO', fpo);
});

// Seed Farmers and Farms
let farmCount = 0;
for (let i = 1; i <= 120; i++) {
  const fpo_id = fpos[i % 4];
  const farmer_id = `farmer-${i}`;
  insertFarmer.run(
    farmer_id, fpo_id, `Farmer ${i}`, `Father ${i}`, 'Demo Village', 'Demo Mandal', 'Demo District',
    '9999999999', '1234', 'UPI1234567890', 'hi', 'CONSENT_GIVEN', 'OWNER'
  );

  // 1-2 farms per farmer
  const numFarms = (i % 2) + 1;
  for (let j = 0; j < numFarms; j++) {
    farmCount++;
    const area = 0.5 + (Math.random() * 3);
    const isEligible = Math.random() > 0.3;
    insertFarm.run(
      `farm-${farmCount}`, farmer_id, `SURVEY-${farmCount}`, 'OWN', 0, area,
      'Black Cotton', 7.0, 0.8, 'Borewell', 'Medium', 'Cotton', 'Wheat', 'Yes',
      'Urea', 'Reduced', 'Incorporated', 'FYM', 'Cowpea',
      'Agriculture', 'Agriculture', 5, 'No', 'None', 'Low',
      '{}', isEligible ? 'ELIGIBLE' : (Math.random() > 0.5 ? 'NEEDS REVIEW' : 'REJECTED'),
      isEligible ? '' : 'Tree cover exceeded 20%', null, null
    );
  }
}

console.log('Seeded successfully!');
