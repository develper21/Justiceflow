# 🏛️ System Architecture

> **JusticeFlow** — AI-Powered Police-to-Court Case Management System
>
> This document describes the overall system architecture, technology stack, folder structure, data flow, and key design decisions for the JusticeFlow application.

---

## 1. High-Level Architecture

JusticeFlow follows a classic three-tier architecture: a React SPA talks to an Express REST API, which owns a PostgreSQL database and delegates AI work to a sidecar service.

```
┌──────────────┐   HTTPS/JSON   ┌──────────────────┐   Prisma ORM   ┌──────────────┐
│     User     │ ─────────────► │  Express REST    │ ─────────────► │  PostgreSQL  │
│ (Web Browser)│ ◄───────────── │  API (server/)   │ ◄───────────── │  (Database)  │
└──────────────┘                └────────┬─────────┘                └──────────────┘
                                         │  HTTP proxy
                                         ▼
                                ┌──────────────────┐
                                │   ai-poc Python  │
                                │  Service (:8001) │
                                └──────────────────┘
```

- **Client (React 19 + Vite)** — role-based dashboards, file uploads, charts; stores JWT in localStorage.
- **Server (Express + TypeScript)** — auth, RBAC, validation, workflow state machine, Cloudinary uploads, PDFKit reports.
- **ai-poc (FastAPI)** — embeddings, semantic search, RAG chat, OCR, legal NER, document drafts. The Express API only proxies to it; the core workflow works even when it is down.

---

## 2. Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 19, Vite 7 | SPA framework and dev/build tooling |
| Language | TypeScript | Type-safe code on client and server |
| Styling | Tailwind CSS 4 | Utility-first styling + design system in [DESIGN.md](DESIGN.md) |
| Routing | React Router 7 | Client-side routes and protected layouts |
| Charts | Recharts | Dashboard analytics |
| Backend | Express 4, tsx | REST API and dev runner |
| Database | PostgreSQL + Prisma 5 | Persistence and type-safe ORM |
| Auth | JWT (jsonwebtoken) + bcrypt | Stateless auth, password hashing |
| Validation | express-validator | Route-level input validation |
| Uploads | Multer + Cloudinary | Evidence/FIR/document file storage |
| PDF | PDFKit | Closure reports and issued documents |
| AI | ai-poc (FastAPI) | Search, chat, OCR, NER, drafts |
| Logging | Winston | Server-side structured logs |
| Testing | Jest + Supertest | Backend unit/integration tests |

---

## 3. Folder Structure

```
JusticeFlow/
├── client/                     # React frontend
│   ├── postman/                #   Postman collection for frontend calls
│   │   └── postman.json
│   └── src/
│       ├── api/                # One module per backend resource (axios)
│       ├── components/         # Shared + AI components
│       ├── context/            # AuthContext (session state)
│       ├── hooks/              # Reusable hooks (useDebounce…)
│       ├── pages/              # auth/ police/ sho/ court/ judge/ ai/
│       ├── routes/             # Protected + role-based route guards
│       ├── types/              # Shared TypeScript types
│       └── utils/              # Helpers (PDF export…)
├── server/                     # Express backend
│   ├── postman/                #   Postman collection for all server routes
│   │   └── postman.json
│   ├── prisma/                 # schema.prisma, migrations, seed
│   └── src/
│       ├── config/             # env + cloudinary config
│       ├── middleware/         # auth, role, validation, upload, error
│       ├── modules/            # Feature modules (see §4)
│       ├── prisma/             # Prisma client singleton
│       ├── services/           # Cross-cutting (fileUpload, ai-enhanced)
│       └── utils/              # ApiError, asyncHandler, helpers
├── ai-poc/                     # Python FastAPI AI service
└── Docs/                       # PRD, ARCHITECTURE, RULES, DESIGN, TASKS, MEMORY
```

---

## 4. Backend Module Layout

Every feature module follows the same pattern — `routes → controller → service → Prisma`:

```
modules/
├── auth/               # /api/auth — login, me
├── organization/       # /api/police-stations, /courts, /officers
├── fir/                # /api/firs — create (multipart), get
├── case/               # /api/cases — my/all/:id, assign, archive,
│                       #   complete-investigation, judicial-close,
│                       #   can-close, + case-archive, judicial-closure
├── investigation/      # events, evidence, witnesses, accused
├── document/           # create/list/finalize documents
├── court/              # submit-to-court, intake, court-actions
├── bail/               # bail applications
├── document-requests/  # warrant workflow: request→approve→issue
├── case-reopen/        # police request → judge approve/reject
├── audit/              # per-case audit logs
├── timeline/           # unified case timeline
├── search/             # global search
├── closure-report/     # PDFKit closure report generate/get
├── analytics/          # dashboard stats
└── ai/                 # index/search/chat/ocr/draft, enhanced/*,
                        #   case-readiness, document-validate, case-brief
```

---

## 5. Request Pipeline

```
Request
  │
  ├─► helmet (security headers)
  ├─► cors (origin whitelist, credentials)
  ├─► express.json / urlencoded (10 MB limit)
  ├─► multer (multipart routes only)
  ├─► express-validator (per-route validators)
  ├─► authenticate (JWT → req.user)          [protected routes]
  ├─► role middleware (isPolice / isSHO / isCourtClerk / isJudge / requireRole)
  ├─► controller (asyncHandler)
  ├─► service (business rules + Prisma)
  └─► errorHandler → uniform { success: false, error } response
```

---

## 6. Data Flow — Case Lifecycle (State Machine)

The case state machine is enforced server-side in `CurrentCaseState` (see `schema.prisma → CaseState`):

```
FIR_REGISTERED
   │  (SHO assigns officer)
   ▼
CASE_ASSIGNED ──► UNDER_INVESTIGATION
   │                    │  (evidence, witnesses, accused, documents)
   │                    ▼
   │            INVESTIGATION_COMPLETED  ──  CHARGE_SHEET_PREPARED /
   │            CLOSURE_REPORT_PREPARED
   │                    │  (SHO submits to court)
   │                    ▼
   │            SUBMITTED_TO_COURT ──► RETURNED_FOR_DEFECTS ─► RESUBMITTED_TO_COURT
   │                    │  (clerk intake)
   │                    ▼
   │            COURT_ACCEPTED ──► TRIAL_ONGOING ──► JUDGMENT_RESERVED
   │                    │                                │
   │                    ▼                                ▼
   └────────────► DISPOSED  ◄────────────────  (judicial close)
                    │
                    ▼
                ARCHIVED   (reopen requests can resurrect archived cases)
```

Every transition:

1. is validated against the current state,
2. is written atomically in a Prisma transaction,
3. appends to `CaseStateHistory`,
4. creates an `AuditLog` entry.

---

## 7. Key Design Decisions

| Decision | Rationale |
|---|---|
| **JWT in Authorization header** | Stateless; easy to test in Postman; client keeps it in localStorage |
| **RBAC via middleware chain** | Roles change rarely; per-route guards are explicit and auditable |
| **Org isolation in services** | Queries are always scoped by `organizationId` — a station cannot see another station's cases |
| **State machine in DB (`CurrentCaseState` + `CaseStateHistory`)** | Guarantees legal workflow integrity with a full history |
| **Multipart uploads → Cloudinary** | Offloads storage, gives CDN URLs without local disk management |
| **AI as proxy-only sidecar** | `server` never embeds AI logic; failures degrade gracefully to non-AI flow |
| **Postman collections in both `client/` and `server/`** | Server collection covers all routes; client collection mirrors exactly what the UI calls — both testable without the frontend |

---

## 8. Deployment Topology (current targets)

| Component | Platform | Notes |
|---|---|---|
| Server | Render (`render.yaml`, Dockerfile) | Health check at `/health` |
| Client | Static build (Vite) served via CDN/host | `VITE_API_URL` points to the API |
| Database | Managed PostgreSQL | `DATABASE_URL` secret |
| ai-poc | Container (:8001) | Optional at runtime — API degrades gracefully |
