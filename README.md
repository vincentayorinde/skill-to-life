# NextSkill

NextSkill is an open-source tech career assessment platform that helps people discover their NextSkill, top career matches, learning resources, salary insights, and entrepreneurship paths.

## Design System

The Angular app uses Tailwind CSS with NextSkill design tokens for colours,
typography, spacing, radius, shadows, focus states, and motion. Reusable
standalone Angular UI components live in `libs/ui`.

See `docs/design-system.md` for the current visual direction and component
foundation.

## Local Development

### Prerequisites

- Node.js 22+
- pnpm
- Git
- PostgreSQL 14+ running locally on port 5432

### Setup

```sh
pnpm install
```

### Database setup

1. Create a local PostgreSQL database named `nextskill`:

   ```sh
   createdb nextskill
   ```

2. Copy the API env example and fill in your values:

   ```sh
   cp apps/api/.env.example apps/api/.env
   ```

   Required values in `apps/api/.env`:
   - `DATABASE_URL` — PostgreSQL connection string (default works if using `postgres` user with no password on localhost)
   - `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — create credentials at [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials → OAuth 2.0 Client ID (Application type: Web). Add `http://localhost:3000/api/auth/google/callback` as an authorised redirect URI.
   - `JWT_SECRET` — any random string of 32+ characters

3. Run the database migration:

   ```sh
   pnpm db:setup
   ```

   Other database commands:

   ```sh
   pnpm db:studio   # Open Prisma Studio (GUI)
   pnpm db:reset    # Reset and re-migrate the database
   ```

### Commands

```sh
pnpm dev
pnpm dev:web
pnpm dev:api
pnpm build
pnpm test
pnpm lint
pnpm format:check
```
