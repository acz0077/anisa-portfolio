# Anisa Portfolio

Personal portfolio for **Anisa Chuzaimatuz Zahro** built with Next.js, TypeScript, Auth.js, Prisma, and PostgreSQL.

## Current features

- responsive portfolio landing page
- Google OAuth registration
- Google OAuth login for existing accounts
- verified Google email check
- duplicate-registration protection
- login rejection for Google accounts that have not registered first
- PostgreSQL user/account/session persistence through Prisma
- protected onboarding flow after registration
- dedicated `Profile` model linked 1:1 with `User`
- onboarding form for full name, age, university, headline, bio, location, GitHub, LinkedIn, and Instagram
- `registrationCompleted` state updated only when profile persistence succeeds
- protected dashboard overview
- editable profile flow from dashboard
- logout action from the dashboard
- automatic redirect for already-authenticated users

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

4. Generate Prisma Client:

   ```bash
   npm run db:generate
   ```

5. Create/update the database tables:

   ```bash
   npm run db:migrate -- --name add-profile-onboarding
   ```

6. Start the application:

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

## Registration and onboarding flow

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
        ↓
Complete personal profile
        ↓
Profile saved + registrationCompleted = true
        ↓
/dashboard
```

## Login flow

```text
/login
   ↓
Continue with Google
   ↓
Verified Google account?
   ├─ no  → login rejected
   └─ yes
        ↓
Account already registered?
   ├─ no  → /register
   └─ yes
        ↓
Create authenticated session
        ↓
/dashboard
   ├─ profile incomplete → /onboarding
   └─ profile complete   → dashboard overview
```

If an authenticated user opens `/login` again, the page automatically routes them to `/onboarding` or `/dashboard` based on their profile completion status.

## Protected routes

- `/onboarding` requires a valid authenticated session.
- completed users visiting `/onboarding` are redirected to `/dashboard` unless they explicitly open `/onboarding?edit=1` from the profile editor.
- `/dashboard` requires an authenticated user with a completed profile.
- incomplete users opening `/dashboard` are redirected back to `/onboarding`.
