# Contributing to Skill to Life

Thanks for taking the time to contribute. Skill to Life is open source and built in public — every improvement, no matter how small, makes it more useful for people figuring out their path in tech.

---

## Before you start

- Read the [Code of Conduct](CODE_OF_CONDUCT.md). It applies to all spaces in this project.
- Check [open issues](https://github.com/vincentayorinde/skill-to-life/issues) before opening a new one — yours might already be tracked.
- For anything large (new feature, architectural change), open an issue first so we can align before you spend time building.

---

## Ways to contribute

| Type               | Examples                                                    |
| ------------------ | ----------------------------------------------------------- |
| Bug report         | Something is broken or behaves unexpectedly                 |
| Feature request    | A missing feature that would help users                     |
| Career data        | Improve a career description, roadmap step, or salary range |
| New career path    | Propose a missing tech path with data to back it up         |
| UI / accessibility | Layout bugs, contrast issues, mobile experience             |
| Tests              | Add unit or integration tests for untested code             |
| Docs               | Fix a README typo, improve setup instructions               |

Good first issues are labelled [`good first issue`](https://github.com/vincentayorinde/skill-to-life/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).

---

## Development setup

See [README.md](README.md#local-development) for full environment setup, database setup, and available commands.

### Quick start

```sh
git clone https://github.com/vincentayorinde/skill-to-life.git
cd skill-to-life
pnpm install
cp apps/api/.env.example apps/api/.env
# fill in .env, then:
pnpm dev
```

---

## Workflow

1. **Fork** the repository and create a branch from `main`.
2. Use a descriptive branch name: `feat/ai-roadmap-step`, `fix/mobile-nav`, `data/ux-designer-salary`.
3. Make your changes. Keep commits focused — one logical change per commit.
4. Run checks locally before pushing:
   ```sh
   pnpm lint
   pnpm test
   pnpm format:check
   ```
5. Open a pull request against `main`. Fill in the PR template — what changed and why.
6. A maintainer will review and may request changes. Respond to feedback promptly.

---

## Commit style

Use conventional commits for clarity in the changelog:

```
feat: add salary region filter to career detail page
fix: restore save career button on career cards
data: update AI Engineer roadmap with LangChain resources
docs: fix broken link in README
```

Prefixes: `feat`, `fix`, `data`, `docs`, `test`, `chore`, `refactor`, `style`.

---

## Adding or editing career data

Career data lives in `libs/shared/types/src/lib/careers/`. Each career has:

- A `CareerPath` entry (title, summary, salary insight, tags, resources)
- An entry in `CAREER_SALARY_DATA` (junior/senior GBP ranges)
- Optionally a `CAREER_ROADMAP` (structured steps with resource links)

When proposing changes to salary data, include a source — job board listings, industry surveys, or similar.

---

## Code style

- Angular 21 standalone components with signals (`signal`, `computed`, `inject`)
- Tailwind utility classes only — no custom CSS files
- No new `npm` / `pnpm` packages without discussion
- No `any` unless unavoidable and commented
- No comments explaining what the code does — only why, if non-obvious

Formatting is handled by Prettier. Run `pnpm format` before committing.

---

## Testing

- Frontend unit tests: `pnpm test` (Vitest)
- Backend tests: `pnpm test` (Jest)
- UI changes should be verified manually in a browser at mobile and desktop widths

---

## Questions

Open a [GitHub Discussion](https://github.com/vincentayorinde/skill-to-life/discussions) or an issue tagged `question`. We're a small project — responses may take a few days.
