# Contributing to TimeCapsule

Glad you're here. This is a small project with a straightforward purpose: help communities remember the places that shaped them. Contributions should serve that purpose or make the codebase less of a headache to work in. Both are welcome.

---

## Before you open a PR

- Check open issues first. Someone may already be working on it.
- For anything bigger than a bug fix, open an issue and describe what you want to build. Saves everyone time.
- Keep PRs focused. One thing at a time.

---

## Setup
```bash
git clone https://github.com/Sayanabha/time-capsule.git
cd time-capsule

cd backend && npm install
cd ../frontend && npm install
```

Run backend and frontend in separate terminals. See the README for the full commands.

---

## What's worth contributing

Good bets:

- **Map view** for browsing businesses by location
- **Search and filter** on the home page
- **Admin panel** to manage submissions without touching SQLite directly
- **Email notifications** when a business you contributed to closes
- **Better mobile layout** -- it works, it just doesn't sing
- **Tests** -- there are none, which is embarrassing

Things that probably won't get merged:

- User accounts and authentication (adds complexity fast, limited payoff for a community tool)
- Monetization features
- Anything that makes the UI busier

---

## Code style

No linter config yet, so just match what's already there. Inline styles in React components (it's intentional, not an oversight), vanilla Express routes, no ORM. If you find it odd, you'll get used to it.

---

## Submitting

1. Fork the repo
2. Create a branch: `git checkout -b your-feature-name`
3. Make your changes
4. Open a PR with a clear description of what changed and why

That's it. No CLA, no contributor license, no hoops.

---

## Questions

Open an issue tagged `question`. Response time is human-paced, not SLA-paced.