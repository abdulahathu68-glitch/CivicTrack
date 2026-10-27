import 'dotenv/config';
import { Pool } from 'pg';
if (!process.env.DATABASE_URL) console.warn('DATABASE_URL is missing. Set it in .env before using the API.');
export const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.DATABASE_URL?.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined });
