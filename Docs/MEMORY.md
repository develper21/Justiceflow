# 🧠 Project Memory

> **JusticeFlow** — Context, Progress & Important Notes
>
> This document keeps track of the current state of the project, important decisions and things to remember. It helps maintain continuity across development sessions or for new contributors.

---

| 📅 Last Updated | 🧭 Current Phase | 🏷️ Version |
|:---:|:---:|:---:|
| October 1, 2026 | **Phase 7** — Quality & Docs | v1.0-rc |

---

## 🎯 Current Status

- ✅ Project setup completed (React 19 + Vite, Express + TypeScript, Prisma)
- ✅ Git repository initialized with modular backend structure
- ✅ PostgreSQL schema + migrations + seed (4 roles, 2 stations, 2 courts)
- ✅ Authentication (JWT login, `/me`, protected client routes) completed
- ✅ Full police workflow (FIR → investigation → documents) completed
- ✅ Full court workflow (submit → intake → actions → closure) completed
- ✅ Document requests + case reopen workflows completed
- ✅ AI layer (ai-poc sidecar, search/chat, enhanced suite, features) completed
- ✅ Postman collections for server (85 requests) and client (69 requests) created
- 🔄 Working on wiring real AI responses into features endpoints
- 🔄 Full Postman end-to-end run (role-switch flow) in progress

---

## ✅ Completed Milestones

| # | Milestone | Completed On |
|---|---|---|
| M1 | Foundation (repo, CI config, schema, auth, RBAC) | Feb 2026 |
| M2 | Police workflow end-to-end | Mar 2026 |
| M3 | Court workflow end-to-end (closure, reopen) | Apr 2026 |
| M4 | AI layer + enhanced suite | Jun 2026 |
| M5 | Claymorphism UI pass on all dashboards | Sep 2026 |

---

## 🔄 In Progress

| # | Task | Phase | Notes |
|---|---|---|---|
| 6.8 | Real AI responses in features endpoints | 6 | `features.controller` returns placeholders |
| 7.5 | Postman end-to-end run | 7 | Login-as-each-role runner script |

---

## 🧭 Next Up

| # | Task | Phase |
|---|---|---|
| 7.6 | CI pipeline (lint + typecheck + tests) | 7 |
| 8.1 | Environment audit before deploy | 8 |
| 8.2 | Production seed strategy | 8 |
| 8.3 | v1.0 tag & release notes | 8 |

---

## 🏗️ Architecture Quick Facts

- **Monorepo:** `client/` (React 19 + Vite 7 + Tailwind 4), `server/` (Express 4 + Prisma 5), `ai-poc/` (FastAPI :8001).
- **Server:** modular — `modules/<feature>/{routes,controller,service}.ts`; mounted in `src/app.ts`.
- **State machine:** `CaseState` enum (16 states) enforced via `CurrentCaseState` + `CaseStateHistory`; all transitions in services inside Prisma transactions.
- **RBAC:** `authenticate` → role middleware (`isPolice`, `isSHO`, `isCourtClerk`, `isJudge`) → service-level org isolation.
- **Uploads:** Multer → Cloudinary (folders: FIRs, EVIDENCE, …); uploads blocked after court submission.
- **AI:** server only proxies to ai-poc; every AI route degrades gracefully.
- **Docs in this folder** follow the standard set: PRD → ARCHITECTURE → RULES → DESIGN → TASKS → MEMORY.

## ⚠️ Gotchas & Important Notes

- 🚨 `case-reopen` routes previously carried a duplicate `/api` prefix (mounted at `/api` **and** written as `/api/...`) — fixed on Oct 1, 2026. If routes 404 after a merge, check for double prefixes first.
- 🚨 `POST /api/ai/generate-draft` previously never sent a response — fixed on Oct 1, 2026.
- 🔑 Demo login accepts `password123` for all seeded users (auth.service has a demo fast-path). Replace before production.
- 🧾 Route validators on bail (`applicantName`, `applicantRelation`, `grounds`) are stricter than the service fields (`accusedId`, `bailType`) — send both groups in Postman.
- 📤 Evidence uploads are rejected once a case is `SUBMITTED_TO_COURT` (`validatePoliceCanUpload`).
- 🧪 Tests run with `npm test` in `server/` (jest --runInBand). The AI controller spec does not require ai-poc running.
- 🖼️ Client expects `VITE_API_URL=http://localhost:5000/api`; Postman client collection uses the same base.

---

## 🔗 Key References

| Doc | Purpose |
|---|---|
| [PRD.md](PRD.md) | Product scope, users, features |
| [ARCHITECTURE.md](ARCHITECTURE.md) | System design, stack, state machine |
| [RULES.md](RULES.md) | Coding standards & workflow rules |
| [DESIGN.md](DESIGN.md) | Colors, typography, components |
| [TASKS.md](TASKS.md) | Task board by phase |
| `server/postman/postman.json` | All backend routes for testing |
| `client/postman/postman.json` | Every frontend API call mirrored |
