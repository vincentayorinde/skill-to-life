# NextSkill

**Discover your next tech career skill.**

[![Version](https://img.shields.io/badge/version-1.0.0-blue)](CHANGELOG.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Open Source](https://img.shields.io/badge/open%20source-yes-brightgreen)](https://github.com/vincentayorinde/nextskill)

NextSkill is a free, open-source career assessment platform for anyone figuring out their path in tech. Answer 10 questions and discover which of 26 tech career paths fits how you think and work — with salary data, learning roadmaps, and independent paths included.

---

## Features

- **10-question career assessment** — weighted scoring engine across 26 tech paths
- **26 tech career paths** — frontend, backend, data, AI, security, cloud, design, and more
- **Full learning roadmaps** — 5–6 structured steps per career with real free resource links
- **Honest salary data** — UK GBP ranges for junior, mid, senior, and lead levels
- **Entrepreneurship paths** — freelance, consulting, and product paths for every career
- **Shareable result cards** — download PNG cards in square and story formats
- **Google OAuth and saved results** — sign in to save and revisit results over time
- **Anonymous mode** — complete the assessment and get results without an account
- **Open source and free** — no paywalls, no upsells

---

## Tech stack

| Layer    | Technology                               |
| -------- | ---------------------------------------- |
| Frontend | Angular 21, Tailwind CSS, TypeScript     |
| Backend  | NestJS 11, Passport (JWT + Google OAuth) |
| Database | PostgreSQL + Prisma 5                    |
| Monorepo | Nx, pnpm workspaces                      |
| Testing  | Vitest (frontend), Jest (backend)        |
| CI       | GitHub Actions                           |

---

## Local development

### Prerequisites

- Node.js 22+
- pnpm 9+
- PostgreSQL 14+ running locally on port 5432

### Install

```sh
git clone https://github.com/vincentayorinde/nextskill.git
cd nextskill
pnpm install
```

### Environment setup

```sh
cp apps/api/.env.example apps/api/.env
```

Edit `apps/api/.env` and fill in:

| Variable               | Description                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| `DATABASE_URL`         | PostgreSQL connection string e.g. `postgresql://postgres:password@localhost:5432/nextskill` |
| `JWT_SECRET`           | Random string 32+ characters                                                                |
| `GOOGLE_CLIENT_ID`     | From [Google Cloud Console](https://console.cloud.google.com/) → OAuth 2.0 Client ID        |
| `GOOGLE_CLIENT_SECRET` | From same OAuth 2.0 credential                                                              |
| `GOOGLE_CALLBACK_URL`  | `http://localhost:3000/api/auth/google/callback`                                            |
| `FRONTEND_URL`         | `http://localhost:4200`                                                                     |

For Google OAuth, add `http://localhost:3000/api/auth/google/callback` as an authorised redirect URI in Google Cloud Console.

### Database

```sh
createdb nextskill       # Create the local database
pnpm db:setup            # Run migrations
pnpm db:studio           # Open Prisma Studio GUI
pnpm db:reset            # Reset and re-migrate
```

### Run

```sh
pnpm dev          # Web + API in parallel
pnpm dev:web      # Angular only (port 4200)
pnpm dev:api      # NestJS only (port 3000)
```

### Other commands

```sh
pnpm build          # Build all projects
pnpm test           # Run all tests
pnpm lint           # Lint all projects
pnpm format         # Format code
pnpm format:check   # Check formatting (used in CI)
```

---

## Project structure

```
nextskill/
├── apps/
│   ├── web/          # Angular frontend
│   └── api/          # NestJS backend
├── libs/
│   ├── shared/
│   │   ├── types/    # Shared TypeScript interfaces + career data
│   │   └── scoring/  # Assessment scoring engine
│   └── ui/           # Angular UI component library
├── docs/             # Contributor guides
└── ...
```

---

## Contributing

Contributions, bug reports, and ideas are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) to get started.

Good first issues are labelled [`good first issue`](https://github.com/vincentayorinde/nextskill/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) on GitHub.

---

## Licence

MIT — see [LICENSE](LICENSE).

Built by [Vincent Ayorinde](https://github.com/vincentayorinde).
