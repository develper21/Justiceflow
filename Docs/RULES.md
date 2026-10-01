# 📜 Development Rules

> **JusticeFlow** — Project Guidelines for AI & Human Collaboration
>
> This document defines the development rules, coding standards, and best practices for the JusticeFlow application. These rules ensure consistency, maintainability, security, and quality. Both AI assistants and human contributors must follow these guidelines.

---

## 1️⃣ General Principles

These rules apply to the entire project.

- ✅ Follow the project documentation ([PRD.md](PRD.md), [ARCHITECTURE.md](ARCHITECTURE.md), [DESIGN.md](DESIGN.md)) before making changes.
- ✅ Keep the code clean, readable and well-structured.
- ✅ Prioritize simplicity and maintainability.
- ✅ Do not duplicate logic. Reuse existing components, utilities or services.
- ✅ Make small, focused changes instead of large, risky edits.
- ✅ Do not modify unrelated files.
- ✅ Write self-explanatory code with meaningful variable and function names.
- ✅ Run typecheck/tests before considering work done.

---

## 2️⃣ Technology & Coding Standards

Rules related to the tech stack and coding style.

| Area | Rule |
|---|---|
| 🟦 **Language** | Use TypeScript everywhere (client + server). Avoid `any` unless absolutely necessary |
| 🏗️ **Backend** | Follow the module pattern: `*.routes.ts → *.controller.ts → *.service.ts`. Controllers never touch Prisma directly |
| ⚛️ **Frontend** | React function components only. Data fetching goes through `client/src/api/*` modules — never call `axios` inline in components |
| 🎨 **Styling** | Use Tailwind CSS and follow the design system in [DESIGN.md](DESIGN.md). Reuse global classes (`.btn`, `.card`, `.badge`, `.input`) before adding new CSS |
| 🚨 **Errors** | Throw `ApiError` in services; let `errorHandler` format responses. Never send raw stack traces |
| ✅ **Validation** | Every mutating route uses express-validator + `validate` middleware. Validate on the server even if the client validates |
| 🔐 **Auth & RBAC** | Every protected route chains `authenticate` + a role guard (`isPolice`, `isSHO`, `isCourtClerk`, `isJudge`, `requireRole`). Services re-check organization isolation |
| 🧬 **Database** | Only Prisma Client. Never write raw SQL outside `prisma.$queryRaw` with parameters. Schema changes require a migration — never `db push` on shared DBs |
| 📦 **Dependencies** | Use stable, well-maintained packages. Ask before adding any new dependency |
| 📁 **File Naming** | Routes: `x.routes.ts`, controllers: `x.controller.ts`, services: `x.service.ts`; React pages in PascalCase (`CaseDetails.tsx`) |
| 🧪 **Testing** | New backend features need Jest coverage (`*.spec.ts`). Keep `npm test` green |

---

## 3️⃣ Project Structure

Follow the defined folder structure in [ARCHITECTURE.md](ARCHITECTURE.md) to keep the codebase organized and scalable.

- ✅ Place reusable UI components in `client/src/components/`.
- ✅ Feature-specific code stays inside its page/feature folder (`pages/police/`, `pages/sho/`, `pages/court/`, `pages/judge/`).
- ✅ Backend feature code lives in `server/src/modules/<feature>/` — one module per resource.
- ✅ Common utilities should be in `server/src/utils/` or `client/src/utils/`.
- ✅ Types and interfaces should be placed in `client/src/types/` or alongside their module.
- ✅ Do not create new folders without a clear purpose.

---

## 4️⃣ Workflow Rules

How work is planned, executed and shipped.

- ✅ Check [TASKS.md](TASKS.md) and claim/update your task before starting.
- ✅ One branch per task; small, reviewable PRs.
- ✅ Never commit `.env`, secrets, or generated build output.
- ✅ Commits follow the repo style: short imperative subject (e.g., "Update SHO CaseDetails page with claymorphism design").
- ✅ After changing any route, update the relevant Postman collection (`server/postman/postman.json` or `client/postman/postman.json`).
- ✅ Update [MEMORY.md](MEMORY.md) when you complete a phase or learn something important.

---

## 5️⃣ Security Rules (non-negotiable)

- 🚫 Never log or return passwords, tokens or personal data in responses.
- 🚫 Never trust `req.body` types — validate and coerce everything.
- 🚫 Never store files locally; always upload to Cloudinary via `fileUpload.service`.
- 🚫 Never bypass the case state machine — every transition goes through its service.
- 🚫 Never write audit logs client-side; services create them server-side.
- 🚫 No secrets in code. Use environment variables (see `.env.example`).

---

## 6️⃣ AI-Specific Rules

JusticeFlow integrates an AI sidecar; extra care applies.

- ✅ All AI calls go through `server/src/modules/ai/` or `server/src/services/ai-enhanced.service.ts` — the frontend never talks to ai-poc directly.
- ✅ Every AI route must fail gracefully (fallback response) — the core workflow must work when ai-poc is down.
- ✅ AI output is a suggestion; state changes still require human action through normal routes.
- ✅ Do not send more case data to ai-poc than the feature needs.

---

## 7️⃣ Definition of Done

A task is complete when **all** of these are true:

- ✅ Code builds with no TypeScript errors (`tsc -b` client, `npm run build` server).
- ✅ Lint passes (`npm run lint`).
- ✅ Relevant tests pass (`npm test`).
- ✅ Route changes are reflected in the Postman collection and tested there.
- ✅ Documentation ([TASKS.md](TASKS.md), [MEMORY.md](MEMORY.md)) updated when applicable.
