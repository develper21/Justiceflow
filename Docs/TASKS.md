# ✅ Project Tasks

> **JusticeFlow** — Task Breakdown & Development Plan
>
> This document contains the complete list of tasks for building the JusticeFlow application. Tasks are divided into phases with clear deliverables, priorities and status tracking.

---

| 📚 Total Tasks | ✅ Completed | 🔄 In Progress |
|:---:|:---:|:---:|
| **40** | **34** | **2** |

---

## ✅ Phase 1: Project Setup

Set up the development environment, repository and core configuration.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 1.1 | Initialize repo (client + server + ai-poc) | High | ✅ Completed | Monorepo layout |
| 1.2 | Configure TypeScript on both sides | High | ✅ Completed | Strict mode |
| 1.3 | Set up Vite + Tailwind for client | High | ✅ Completed | Tailwind 4 |
| 1.4 | Configure ESLint & Prettier | Medium | ✅ Completed | eslint.config.js |
| 1.5 | Dockerfile + render.yaml for server | Medium | ✅ Completed | Render deploy target |

---

## 🔐 Phase 2: Database & Authentication

Implement the data model and secure login.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 2.1 | Design Prisma schema (case state machine) | High | ✅ Completed | 16-state `CaseState` enum |
| 2.2 | Migrations + seed script | High | ✅ Completed | 4 demo roles, 2 stations, 2 courts |
| 2.3 | JWT auth (login, `/me`) | High | ✅ Completed | 24h expiry |
| 2.4 | RBAC middleware (POLICE/SHO/CLERK/JUDGE) | High | ✅ Completed | isPolice, isSHO, isCourt… |
| 2.5 | Global error handler + ApiError | High | ✅ Completed | Uniform responses |
| 2.6 | Protected routes on client (AuthContext) | High | ✅ Completed | Token in localStorage |

---

## 🚨 Phase 3: Police Workflow

FIR registration and investigation management.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 3.1 | Create FIR (multipart + Cloudinary) | High | ✅ Completed | Auto-creates Case |
| 3.2 | SHO case assignment with audit | High | ✅ Completed | Reason logged |
| 3.3 | Investigation events CRUD | High | ✅ Completed | Typed events |
| 3.4 | Evidence upload (4 categories) | High | ✅ Completed | Blocked post-submission |
| 3.5 | Witnesses + statement files | High | ✅ Completed | Optional upload |
| 3.6 | Accused management | High | ✅ Completed | Status enum |
| 3.7 | Documents: draft → finalize | High | ✅ Completed | 5 document types |
| 3.8 | Police UI pages (CreateFIR, CaseDetails…) | High | ✅ Completed | Claymorphism pass done |

---

## 🏛️ Phase 4: Court Workflow

Submission, intake, hearings and closure.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 4.1 | Submit-to-court (SHO) + edit lock | High | ✅ Completed | courtId required |
| 4.2 | Clerk intake + acknowledgement no. | High | ✅ Completed | Creates Acknowledgement |
| 4.3 | Returned-for-defects flow | Medium | ✅ Completed | RESUBMITTED state |
| 4.4 | Court actions (cognizance → judgment) | High | ✅ Completed | 7 action types |
| 4.5 | Bail applications | Medium | ✅ Completed | Linked to accused |
| 4.6 | Closure report PDF (PDFKit) | Medium | ✅ Completed | Generate + get URL |
| 4.7 | Judicial close + archive | Medium | ✅ Completed | Judge-only |
| 4.8 | Case reopen (request → judge decision) | Medium | ✅ Completed | Police + judge roles |
| 4.9 | Court/judge UI pages | High | ✅ Completed | Dashboards + details |

---

## 📄 Phase 5: Document Requests & Audit

Warrant workflow and traceability.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 5.1 | Document request (police → SHO → court) | High | ✅ Completed | 5 request types |
| 5.2 | SHO approval queue | High | ✅ Completed | /pending |
| 5.3 | Court issue with PDF upload | High | ✅ Completed | /issue multipart |
| 5.4 | Per-case audit logs | High | ✅ Completed | Role-filtered |
| 5.5 | Unified case timeline | Medium | ✅ Completed | Cross-entity merge |
| 5.6 | Global search | Medium | ✅ Completed | q + limit params |

---

## 🤖 Phase 6: AI Layer

ai-poc integration and AI-assisted features.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 6.1 | ai-poc FastAPI service | High | ✅ Completed | Python sidecar :8001 |
| 6.2 | Index + semantic search proxy | High | ✅ Completed | /api/ai/search |
| 6.3 | RAG chat (+ stats interception) | High | ✅ Completed | /api/ai/chat |
| 6.4 | OCR extract + multilingual OCR | Medium | ✅ Completed | File upload routes |
| 6.5 | Enhanced suite (NER, sections, precedents…) | High | ✅ Completed | 12 enhanced routes |
| 6.6 | Case readiness (SHO), doc validate (clerk), brief (judge) | Medium | ✅ Completed | Role-gated placeholders |
| 6.7 | AI UI components (checker, validator, viewer) | Medium | ✅ Completed | components/ai/* |
| 6.8 | Wire real AI responses into features endpoints | High | 🔄 In Progress | Currently placeholder data |

---

## 🧪 Phase 7: Quality & Documentation

Testing, API collections and docs.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 7.1 | Jest unit tests (auth, AI controller) | Medium | ✅ Completed | jest + supertest |
| 7.2 | Docs: PRD, ARCHITECTURE, RULES, DESIGN | Medium | ✅ Completed | This docs set |
| 7.3 | Server Postman collection (85 requests) | High | ✅ Completed | server/postman/ |
| 7.4 | Client Postman collection (69 requests) | High | ✅ Completed | client/postman/ |
| 7.5 | Full Postman end-to-end run (seed → close) | High | 🔄 In Progress | Role-switch script needed |
| 7.6 | CI pipeline (lint + typecheck + tests) | Medium | ⬜ Pending | GitHub Actions |

---

## 🚀 Phase 8: Release

Final hardening for v1.0.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 8.1 | Environment audit (secrets, CORS origins) | High | ⬜ Pending | Before deploy |
| 8.2 | Production seed strategy | Medium | ⬜ Pending | No demo users in prod |
| 8.3 | v1.0 tag & release notes | Medium | ⬜ Pending | — |

---

> **Legend:** ✅ Completed · 🔄 In Progress · ⬜ Pending
> Update this file whenever a task changes state (see [RULES.md](RULES.md) §4).
