import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
export type SafeUser = { id: number; name: string; email: string; role: string; approval_status: string; department?: string };
declare global { namespace Express { interface Request { user?: SafeUser } } }
export function signToken(user: SafeUser) {
 const secret = process.env.JWT_SECRET;
 if (!secret || secret.length < 24) throw new Error('Set JWT_SECRET to a random value of at least 24 characters.');
 return jwt.sign({ sub: user.id, name: user.name, email: user.email, role: user.role, approval_status: user.approval_status, department: user.department }, secret, { expiresIn: '7d' });
}
export function auth(req: Request, res: Response, next: NextFunction) {
 const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
 if (!token) return res.status(401).json({ error: 'Please sign in to continue.' });
 try {
  const p = jwt.verify(token, process.env.JWT_SECRET || 'missing-secret') as any;
  req.user = { id: Number(p.sub), name: p.name, email: p.email, role: p.role, approval_status: p.approval_status, department: p.department };
  next();
 } catch { return res.status(401).json({ error: 'Your session expired. Please sign in again.' }); }
}
export function roles(...allowed: string[]) {
 return (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || !allowed.includes(req.user.role) || (req.user.role === 'officer' && req.user.approval_status !== 'approved')) return res.status(403).json({ error: 'You do not have permission to perform this action.' });
  next();
 };
}
