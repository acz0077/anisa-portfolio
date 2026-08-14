# Anisa Portfolio

Personal portfolio for **Anisa Chuzaimatuz Zahro** built with Next.js, TypeScript, Auth.js, Prisma, and PostgreSQL.

## Current features

- responsive portfolio landing page
- Google OAuth registration
- verified Google email check
- duplicate-registration protection
- PostgreSQL user/session persistence through Prisma
- post-registration onboarding entry page
- separate Google provider path prepared for login flow

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and fill in:

   ```env
   DATABASE_URL="..."
   AUTH_SECRET="..."
   AUTH_GOOGLE_ID="..."
   AUTH_GOOGLE_SECRET="..."
   ```

3. Generate an Auth.js secret if needed:

   ```bash
   npx auth secret
   ```

4. Create the database tables:

   ```bash
   npx prisma migrate dev --name init-auth
   ```

5. Start the application:

   ```bash
   npm run dev
   ```

## Google OAuth configuration

Create a Google OAuth 2.0 Web Application credential and add these development redirect URIs:

```text
http://localhost:3000/api/auth/callback/google-register
http://localhost:3000/api/auth/callback/google-login
```

When deployed, add the same callback paths using the production domain, for example:

```text
https://your-domain.com/api/auth/callback/google-register
https://your-domain.com/api/auth/callback/google-login
```

Never commit Google client secrets, `AUTH_SECRET`, or `DATABASE_URL` to GitHub.

## Registration flow

```text
/register
   ↓
Register with Google
   ↓
Verified Google account?
   ├─ no  → registration rejected
   └─ yes
        ↓
Already registered?
   ├─ yes → /login
   └─ no
        ↓
Create User + Account + Session
        ↓
/onboarding
```

The next development stage is completing onboarding and activating the dedicated Google login flow.
