import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { z } from 'zod';
import { pool } from './db';
import { auth, roles, signToken } from './auth';

const app = express();
const port = Number(process.env.PORT || 3001);
app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(',') || ['http://localhost:5173'] }));
app.use(express.json({ limit: '1mb' }));
const uploads = path.resolve('uploads'); fs.mkdirSync(uploads, { recursive: true });
const storage = multer.diskStorage({ destination: uploads, filename: (_req, file, cb) => cb(null, crypto.randomUUID() + path.extname(file.originalname).toLowerCase()) });
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: (_req, file, cb) => cb(null, ['image/jpeg','image/png','image/webp'].includes(file.mimetype)) });
app.use('/uploads', express.static(uploads, { dotfiles: 'deny', index: false }));
const safeUser = (u: any) => ({ id: u.id, name: u.name, email: u.email, phone: u.phone, role: u.role, approval_status: u.approval_status, department: u.department });
const statuses = ['Submitted','Under Review','Assigned','In Progress','Resolved','Rejected'];
const refId = () => `CT-${new Date().getFullYear()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
app.get('/api/health', (_req,res) => res.json({ ok:true, service:'CivicTrack API' }));

app.post('/api/auth/signup', async (req,res) => {
 try {
  const body = z.object({ name:z.string().trim().min(2).max(100), email:z.string().email().max(200), password:z.string().min(8).max(100), phone:z.string().max(30).optional() }).parse(req.body);
  const hash = await bcrypt.hash(body.password, 12);
  const q = await pool.query('INSERT INTO users(name,email,password_hash,phone,role,approval_status) VALUES($1,LOWER($2),$3,$4,$5,$6) RETURNING *',[body.name,body.email,hash,body.phone || null,'citizen','approved']);
  const u = safeUser(q.rows[0]); res.status(201).json({ user:u, token:signToken(u) });
 } catch(e:any) { res.status(e?.code === '23505' ? 409 : 400).json({ error:e?.code === '23505' ? 'An account with this email already exists.' : e?.issues?.[0]?.message || 'Could not create account.' }); }
});
app.post('/api/auth/login', async (req,res) => {
 try {
  const b = z.object({email:z.string().email(),password:z.string().min(1)}).parse(req.body);
  const q = await pool.query('SELECT * FROM users WHERE email=LOWER($1)',[b.email]);
  if (!q.rowCount || !(await bcrypt.compare(b.password,q.rows[0].password_hash))) return res.status(401).json({error:'Email or password is incorrect.'});
  const u = safeUser(q.rows[0]);
  if (u.role !== 'citizen' && u.approval_status !== 'approved') return res.status(403).json({error:'Your staff access is not approved yet.'});
  res.json({user:u,token:signToken(u)});
 } catch(e:any) { res.status(400).json({error:e?.issues?.[0]?.message || 'Invalid login request.'}); }
});
app.get('/api/me',auth,async(req,res)=>{ const q=await pool.query('SELECT * FROM users WHERE id=$1',[req.user!.id]); if(!q.rowCount)return res.status(404).json({error:'Account not found.'}); res.json({user:safeUser(q.rows[0])}); });
app.patch('/api/me',auth,async(req,res)=>{
 try { const b=z.object({name:z.string().trim().min(2).max(100),phone:z.string().max(30).optional()}).parse(req.body);
 const q=await pool.query('UPDATE users SET name=$1,phone=$2 WHERE id=$3 RETURNING *',[b.name,b.phone||null,req.user!.id]); res.json({user:safeUser(q.rows[0])});
 } catch(e:any){res.status(400).json({error:e?.issues?.[0]?.message||'Could not update profile.'});}
});
// Bootstrap an initial administrator using a private one-time key. Never expose this key in client code.
app.post('/api/admin/bootstrap',async(req,res)=>{
 const key=process.env.ADMIN_BOOTSTRAP_KEY;
 if(!key || req.header('x-admin-bootstrap-key')!==key) return res.status(403).json({error:'Admin bootstrap key is invalid.'});
 try { const b=z.object({name:z.string().min(2),email:z.string().email(),password:z.string().min(12)}).parse(req.body);
 const hash=await bcrypt.hash(b.password,12);
 const q=await pool.query("INSERT INTO users(name,email,password_hash,role,approval_status) VALUES($1,LOWER($2),$3,'admin','approved') RETURNING *",[b.name,b.email,hash]);
 const u=safeUser(q.rows[0]); res.status(201).json({user:u,token:signToken(u)});
 } catch(e:any){res.status(400).json({error:e?.code==='23505'?'Email already exists.':e?.issues?.[0]?.message||'Bootstrap failed.'});}
});
app.post('/api/staff/request',auth,async(req,res)=>{
 if(req.user!.role!=='citizen')return res.status(400).json({error:'Only citizen accounts can request staff access.'});
 try{const b=z.object({department:z.string().min(2).max(100)}).parse(req.body);
 await pool.query("UPDATE users SET role='officer',department=$1,approval_status='pending' WHERE id=$2",[b.department,req.user!.id]);res.json({message:'Staff access request submitted for admin review. Sign in again after approval.'});
 }catch(e:any){res.status(400).json({error:e?.issues?.[0]?.message||'Request failed.'});}
});

app.post('/api/complaints',auth,upload.single('photo'),async(req,res)=>{
 try{
  const b=z.object({category:z.string().min(2).max(80),title:z.string().trim().min(5).max(160),description:z.string().trim().min(10).max(5000),contact_phone:z.string().max(30).optional(),address:z.string().max(500).optional(),latitude:z.coerce.number().min(-90).max(90).optional(),longitude:z.coerce.number().min(-180).max(180).optional()}).parse(req.body);
  const ref=refId(); const q=await pool.query(`INSERT INTO complaints(reference_id,user_id,category,title,description,contact_phone,address,latitude,longitude,photo_path)
  VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,[ref,req.user!.id,b.category,b.title,b.description,b.contact_phone||null,b.address||null,b.latitude??null,b.longitude??null,req.file?'/uploads/'+req.file.filename:null]);
  await pool.query('INSERT INTO complaint_updates(complaint_id,actor_id,status,note) VALUES($1,$2,$3,$4)',[q.rows[0].id,req.user!.id,'Submitted','Complaint received successfully.']);
  res.status(201).json({complaint:q.rows[0]});
 }catch(e:any){res.status(400).json({error:e?.issues?.[0]?.message||'Could not submit complaint.'});}
});
app.get('/api/complaints/mine',auth,async(req,res)=>{
 const q=await pool.query('SELECT * FROM complaints WHERE user_id=$1 ORDER BY created_at DESC',[req.user!.id]);res.json({complaints:q.rows});
});
app.get('/api/complaints/track/:reference',async(req,res)=>{
 const ref=String(req.params.reference||'').trim().toUpperCase();
 const q=await pool.query('SELECT id,reference_id,category,title,description,address,latitude,longitude,status,department,created_at,updated_at FROM complaints WHERE reference_id=$1',[ref]);
 if(!q.rowCount)return res.status(404).json({error:'No complaint found for that reference ID.'});
 const updates=await pool.query('SELECT u.status,u.note,u.created_at,usr.name AS actor_name FROM complaint_updates u LEFT JOIN users usr ON usr.id=u.actor_id WHERE u.complaint_id=$1 ORDER BY u.created_at',[q.rows[0].id]);
 res.json({complaint:q.rows[0],updates:updates.rows});
});
app.get('/api/complaints/:id',auth,async(req,res)=>{
 const q=await pool.query('SELECT * FROM complaints WHERE id=$1',[req.params.id]);if(!q.rowCount)return res.status(404).json({error:'Complaint not found.'});
 const c=q.rows[0];if(req.user!.role==='citizen'&&Number(c.user_id)!==req.user!.id)return res.status(403).json({error:'You can only view your own complaints.'});
 if(req.user!.role==='officer'&&c.department&&req.user!.department!==c.department)return res.status(403).json({error:'This complaint is outside your department.'});
 const u=await pool.query('SELECT status,note,created_at,actor_id FROM complaint_updates WHERE complaint_id=$1 ORDER BY created_at',[c.id]);res.json({complaint:c,updates:u.rows});
});
app.get('/api/officer/complaints',auth,roles('officer','admin'),async(req,res)=>{
 const {status,category,search}=req.query;const values:any[]=[];const where:string[]=[];
 if(req.user!.role==='officer'&&req.user!.department){values.push(req.user!.department);where.push(`department=$${values.length}`);}
 if(status){values.push(status);where.push(`status=$${values.length}`);}
 if(category){values.push(category);where.push(`category=$${values.length}`);}
 if(search){values.push(`%${String(search).slice(0,100)}%`);where.push(`(title ILIKE $${values.length} OR reference_id ILIKE $${values.length} OR address ILIKE $${values.length})`);}
 const q=await pool.query('SELECT * FROM complaints '+(where.length?'WHERE '+where.join(' AND '):'')+' ORDER BY created_at DESC LIMIT 250',values);res.json({complaints:q.rows});
});
app.patch('/api/complaints/:id/status',auth,roles('officer','admin'),async(req,res)=>{
 try{const b=z.object({status:z.enum(['Under Review','Assigned','In Progress','Resolved','Rejected']),note:z.string().max(2000).default(''),department:z.string().max(100).optional(),officer_id:z.coerce.number().optional()}).parse(req.body);
 const old=await pool.query('SELECT * FROM complaints WHERE id=$1',[req.params.id]);if(!old.rowCount)return res.status(404).json({error:'Complaint not found.'});
 if(req.user!.role==='officer'&&old.rows[0].department&&old.rows[0].department!==req.user!.department)return res.status(403).json({error:'You cannot update another department’s complaint.'});
 const q=await pool.query('UPDATE complaints SET status=$1,department=COALESCE($2,department),officer_id=COALESCE($3,officer_id),updated_at=NOW() WHERE id=$4 RETURNING *',[b.status,b.department??null,b.officer_id??null,req.params.id]);
 await pool.query('INSERT INTO complaint_updates(complaint_id,actor_id,status,note) VALUES($1,$2,$3,$4)',[req.params.id,req.user!.id,b.status,b.note]);res.json({complaint:q.rows[0]});
 }catch(e:any){res.status(400).json({error:e?.issues?.[0]?.message||'Could not update complaint.'});}
});
app.get('/api/admin/overview',auth,roles('admin'),async(_req,res)=>{
 const [stats,staff,departments]=await Promise.all([
 pool.query("SELECT COUNT(*)::int AS total,COUNT(*) FILTER(WHERE status='Submitted')::int AS submitted,COUNT(*) FILTER(WHERE status='In Progress')::int AS in_progress,COUNT(*) FILTER(WHERE status='Resolved')::int AS resolved FROM complaints"),
 pool.query("SELECT id,name,email,role,approval_status,department,created_at FROM users WHERE role IN ('officer','admin') ORDER BY created_at DESC"),
 pool.query("SELECT DISTINCT department FROM users WHERE department IS NOT NULL UNION SELECT DISTINCT department FROM complaints WHERE department IS NOT NULL")
 ]);res.json({stats:stats.rows[0],staff:staff.rows,departments:departments.rows.map(x=>x.department)});
});
app.get('/api/admin/complaints',auth,roles('admin'),async(_req,res)=>{const q=await pool.query('SELECT c.*,u.name AS citizen_name,u.email AS citizen_email FROM complaints c JOIN users u ON u.id=c.user_id ORDER BY c.created_at DESC LIMIT 500');res.json({complaints:q.rows});});
app.patch('/api/admin/staff/:id',auth,roles('admin'),async(req,res)=>{
 try{const b=z.object({approval_status:z.enum(['approved','rejected','pending']),department:z.string().max(100).optional()}).parse(req.body);
 const q=await pool.query("UPDATE users SET approval_status=$1,department=COALESCE($2,department) WHERE id=$3 AND role='officer' RETURNING id,name,email,role,approval_status,department",[b.approval_status,b.department??null,req.params.id]);if(!q.rowCount)return res.status(404).json({error:'Officer not found.'});res.json({staff:q.rows[0]});
 }catch(e:any){res.status(400).json({error:e?.issues?.[0]?.message||'Could not update staff.'});}
});
app.post('/api/contact',async(req,res)=>{
 try{const b=z.object({name:z.string().min(2).max(100),email:z.string().email(),subject:z.string().min(3).max(160),message:z.string().min(10).max(4000)}).parse(req.body);
 await pool.query('INSERT INTO contact_messages(name,email,subject,message) VALUES($1,$2,$3,$4)',[b.name,b.email,b.subject,b.message]);res.status(201).json({message:'Thanks. Your message has been received.'});
 }catch(e:any){res.status(400).json({error:e?.issues?.[0]?.message||'Could not send message.'});}
});
app.get('/api/stats',async(_req,res)=>{
 try{const q=await pool.query("SELECT COUNT(*)::int AS total,COUNT(*) FILTER(WHERE status='Resolved')::int AS resolved,COUNT(*) FILTER(WHERE status IN ('Submitted','Under Review'))::int AS awaiting,COUNT(*) FILTER(WHERE status='In Progress')::int AS in_progress FROM complaints");res.json(q.rows[0]);}catch{res.json({total:0,resolved:0,awaiting:0,in_progress:0});}
});
app.use((err:any,_req:any,res:any,_next:any)=>{console.error(err);res.status(500).json({error:'Unexpected server error. Check the server logs.'});});
app.listen(port,()=>console.log(`CivicTrack API listening on http://localhost:${port}`));
