<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/vincentayorinde/skill-to-life/main/apps/web/src/assets/logo-full-light.png">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/vincentayorinde/skill-to-life/main/apps/web/src/assets/logo-full.png">
    <img src="https://raw.githubusercontent.com/vincentayorinde/skill-to-life/main/apps/web/src/assets/logo-full.png" alt="Skill to Life" width="240">
  </picture>
</p>

<p align="center"><strong>Turn your skills into a real career path.</strong></p>

<p align="center">
  <a href="CHANGELOG.md"><img src="https://img.shields.io/badge/version-1.0.0-blue" alt="Version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License: MIT"></a>
  <a href="https://github.com/vincentayorinde/skill-to-life"><img src="https://img.shields.io/badge/open%20source-yes-brightgreen" alt="Open Source"></a>
</p>

Skill to Life helps people discover the right tech career path, understand their skill gaps, follow a practical roadmap, improve their CV, and turn learning into real career outcomes. Answer 30 questions to find which of 26 tech career paths fits how you think and work — then upload your CV to get AI-powered gap analysis, personalised next steps, and a shareable result card.

---

## Features

- **30-question career assessment** — weighted scoring engine across 26 tech paths
- **AI CV analysis** — upload your CV and get instant gap analysis, skill signals, and a best-fit path recommendation
- **26 tech career paths** — frontend, backend, data, AI, security, cloud, design, and more
- **Full learning roadmaps** — structured steps per career with real free and paid resource links
- **Multi-region salary data** — UK, US, Canada, Europe, Nigeria, and Global ranges across junior and senior levels
- **Entrepreneurship paths** — freelance, consulting, and product routes for every career
- **Shareable result cards** — a clean, branded card you can post on LinkedIn, X, or Instagram
- **Google Sign-In and saved items** — save careers and resources across sessions
- **User profiles** — public profile page showing your saved careers and assessment history
- **Anonymous mode** — take the assessment and see results without creating an account
- **Open source and free** — no paywalls, no upsells, no tracking

---

## Tech stack

| Layer    | Technology                               |
| -------- | ---------------------------------------- |
| Frontend | Angular 21, Tailwind CSS, TypeScript     |
| Backend  | NestJS 11, Passport (JWT + Google OAuth) |
| Database | PostgreSQL + Prisma 5                    |
| Monorepo | Nx 22, pnpm workspaces                   |
| AI       | Anthropic Claude API (CV analysis)       |
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
git clone https://github.com/vincentayorinde/skill-to-life.git
cd skill-to-life
pnpm install
```

### Environment setup

```sh
cp apps/api/.env.example apps/api/.env
```

Edit `apps/api/.env` and fill in:

| Variable               | Description                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| `DATABASE_URL`         | PostgreSQL connection string e.g. `postgresql://postgres:password@localhost:5432/skill_to_life` |
| `JWT_SECRET`           | Random string 32+ characters                                                                    |
| `GOOGLE_CLIENT_ID`     | From [Google Cloud Console](https://console.cloud.google.com/) → OAuth 2.0 Client ID            |
| `GOOGLE_CLIENT_SECRET` | From same OAuth 2.0 credential                                                                  |
| `GOOGLE_CALLBACK_URL`  | `http://localhost:3000/api/auth/google/callback`                                                |
| `FRONTEND_URL`         | `http://localhost:4200`                                                                         |
| `ANTHROPIC_API_KEY`    | From [console.anthropic.com](https://console.anthropic.com/) — used for CV analysis             |

For Google OAuth, add `http://localhost:3000/api/auth/google/callback` as an authorised redirect URI in Google Cloud Console.

### Database

```sh
createdb skill_to_life       # Create the local database
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
skill-to-life/
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

Good first issues are labelled [`good first issue`](https://github.com/vincentayorinde/skill-to-life/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) on GitHub.

---

## Licence

MIT — see [LICENSE](LICENSE).

Built by [Vincent Olagbemide](https://vincenttechblog.com).
