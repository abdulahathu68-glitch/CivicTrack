import 'dotenv/config';
import { pool } from './db';
const schema = `
CREATE TABLE IF NOT EXISTS users (
 id BIGSERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 email TEXT NOT NULL UNIQUE,
 password_hash TEXT NOT NULL,
 phone TEXT,
 role TEXT NOT NULL DEFAULT 'citizen' CHECK (role IN ('citizen','officer','admin')),
 approval_status TEXT NOT NULL DEFAULT 'approved' CHECK (approval_status IN ('pending','approved','rejected')),
 department TEXT,
 created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS complaints (
 id BIGSERIAL PRIMARY KEY,
 reference_id TEXT NOT NULL UNIQUE,
 user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 category TEXT NOT NULL,
 title TEXT NOT NULL,
 description TEXT NOT NULL,
 contact_phone TEXT,
 address TEXT,
 latitude DOUBLE PRECISION,
 longitude DOUBLE PRECISION,
 photo_path TEXT,
 status TEXT NOT NULL DEFAULT 'Submitted' CHECK (status IN ('Submitted','Under Review','Assigned','In Progress','Resolved','Rejected')),
 department TEXT,
 officer_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
 created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS complaint_updates (
 id BIGSERIAL PRIMARY KEY,
 complaint_id BIGINT NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
 actor_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
 status TEXT NOT NULL,
 note TEXT NOT NULL DEFAULT '',
 created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS contact_messages (
 id BIGSERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 email TEXT NOT NULL,
 subject TEXT NOT NULL,
 message TEXT NOT NULL,
 created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS complaints_user_id_idx ON complaints(user_id);
CREATE INDEX IF NOT EXISTS complaints_status_idx ON complaints(status);
CREATE INDEX IF NOT EXISTS updates_complaint_idx ON complaint_updates(complaint_id, created_at);
`;
await pool.query(schema);
console.log('CivicTrack database schema is ready.');
await pool.end();
