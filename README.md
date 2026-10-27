# CivicTrack — Complete Web App Starter

A responsive civic complaint portal with React + TypeScript, Express API, PostgreSQL persistence, JWT sessions, bcrypt password hashing, OpenStreetMap/Leaflet location picker, citizen complaints and tracking, staff workspace, admin staff approvals, FAQ and contact form.

## Included UI design references\nThe `design-reference/` folder contains the uploaded Stitch HTML screens and screenshots for citizen home, complaint submission/tracking, officer dashboards/workspace, authentication, profile, help, and related CivicTrack screens. These are reference designs; the running React app is implemented in `src/` and does not simply render the static HTML files.\n\n## Requirements
- Node.js 20+
- PostgreSQL 14+ (local or managed)
- Windows PowerShell or terminal

## Run locally on Windows
1. Install Node.js LTS and PostgreSQL.
2. Create a database named `civictrack` in PostgreSQL.
3. Copy `.env.example` to `.env` and fill in `DATABASE_URL`, a long random `JWT_SECRET`, and a private `ADMIN_BOOTSTRAP_KEY`.
4. Open a terminal in this project folder and run `npm install`.
5. Run `npm run db:migrate` to create the schema.
6. Run `npm run dev`.
7. Open the Vite URL printed by the client (usually http://localhost:5173).

## Create the first admin
Call `POST /api/admin/bootstrap` once from a trusted API client with header `x-admin-bootstrap-key: YOUR_ADMIN_BOOTSTRAP_KEY` and JSON body containing `name`, `email`, and a password of at least 12 characters. Never put this key in frontend code. After bootstrap, remove or rotate the key and restart the server. Public signup always creates citizen accounts; users cannot select their own staff/admin role.

## Main features
- Citizen signup/login and editable name/phone profile
- Submit civic complaint with category, description, optional image (JPG/PNG/WebP, max 5 MB), map location, address and generated reference ID
- Track by reference ID, status history and personal complaint list
- Officer queue filtered by department, status changes and public notes
- Admin overview, staff approval/rejection, and complaint overview
- FAQ and persisted Contact Us form
- Mobile-first responsive blue/green CivicTrack design

## API and security notes
- `server/migrate.ts` creates the PostgreSQL tables.
- Passwords are hashed with bcrypt. The browser stores a short-lived JWT in localStorage; for a higher-security production deployment, consider switching to secure HttpOnly cookies, CSRF protection, rate limiting, and email-based password recovery.
- Set `CLIENT_ORIGIN` to your exact frontend origin(s). Configure HTTPS in production.
- Add rate limiting, audit logs, malware scanning for uploads, automated tests, backups, and account recovery email before a public production launch.
- Officer access is department-scoped on complaint list/detail/status endpoints. Admin-only routes verify the server-side role.
- Configure a real email provider before enabling password reset. The UI currently explains this rather than pretending emails are sent.
- The map uses OpenStreetMap's public tile service. Respect tile usage policy; for production/high traffic use a compliant tile provider. Location search/geocoding is not yet configured.
- This is a demo civic-service platform, not an official municipal integration.
- No production credentials are included. Never commit `.env`.

## Deployment
Deploy the Node server and built frontend to a Node-compatible host; configure the PostgreSQL URL and secrets in the host's environment settings. Set `CLIENT_ORIGIN` to the deployed website origin. Run `npm run db:migrate` as a release step. Use a persistent storage provider for uploaded photos before deploying multiple server instances.

## Known remaining hardening work
This starter has real API and PostgreSQL integration points but must be security-reviewed and tested before public production use. Password recovery email, reverse geocoding, email notifications, rate limiting, automated tests, persistent object storage, and stronger cookie-based sessions need configuration/implementation for a production-grade municipal deployment.
