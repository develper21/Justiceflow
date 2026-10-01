# 📋 Product Requirements Document (PRD)

> **JusticeFlow** — AI-Powered Police-to-Court Case Management System

---

| Field | Value |
|---|---|
| **Version** | 1.0 |
| **Date** | October 1, 2026 |
| **Author** | Team JusticeFlow |
| **Status** | Draft |
| **Target Launch** | MVP (v1.0) |

---

## 1. Product Overview

JusticeFlow is a web application designed to modernize how Indian police stations and courts manage criminal cases — from FIR registration to final judgment. It replaces manual registers, phone calls and physical file transfers with a single digital workflow that both police and judiciary share, with AI assistance for section suggestions, document drafting, OCR and case readiness.

---

## 2. Problem Statement

Criminal case management today is fragmented:

- FIRs, investigation records and court files live in **separate paper registers** with no shared state.
- Case handover from police station to court happens **physically**, with no tracking of where a case is or who holds it.
- Officers spend hours **drafting charge sheets and reports** by hand; clerks re-type documents.
- There is **no audit trail** — disputes over "who did what, when" are common.
- Judges receive **bulky paper bundles** with no concise brief before hearings.

---

## 3. Goals

- Provide a **single source of truth** for every case, shared by police and court in real time.
- Enforce the **legal workflow as a state machine** — cases move only through valid stages.
- Give each role a **focused dashboard**: Officer, SHO, Court Clerk, Judge.
- Cut document preparation time with **AI-assisted drafting, OCR and section suggestions**.
- Maintain a **complete, tamper-evident audit trail** for every action.

---

## 4. Target Users

| User | Role | Primary Needs |
|---|---|---|
| Police Officer | `POLICE` | Register FIRs, record investigation, upload evidence, complete investigation |
| Station House Officer | `SHO` | Assign cases, approve warrants, submit case files to court |
| Court Clerk | `COURT_CLERK` | Intake submitted cases, validate documents, schedule actions |
| Judge | `JUDGE` | Review briefs, record hearings/judgments, close or reopen cases |

---

## 5. Core Features (MVP)

| # | Feature | Description |
|---|---|---|
| 1 | **Authentication** | JWT login, role-based access, protected routes |
| 2 | **FIR Registration** | Create FIR with sections applied, optional document upload; auto-creates Case |
| 3 | **Case Assignment** | SHO assigns FIRs to officers with reason (audit logged) |
| 4 | **Investigation Module** | Events, evidence (file upload), witnesses, accused management |
| 5 | **Document Management** | Charge sheets, evidence/witness lists, remand applications — draft → finalize |
| 6 | **Court Submission** | SHO submits to a court; clerk intake with acknowledgement number |
| 7 | **Court Actions** | Cognizance, charges framed, hearings, judgments, sentences |
| 8 | **Bail Management** | Bail applications linked to accused with type and grounds |
| 9 | **Document Requests** | Police request warrants/orders → SHO approves → Court issues PDF |
| 10 | **Case Reopen** | Police request with reason → Judge approves/rejects |
| 11 | **Timeline & Audit** | Unified case timeline plus complete audit logs |
| 12 | **AI Features** | Semantic search, RAG chat, OCR (multilingual), section suggestions, legal NER, document drafts, case readiness, case briefs |

---

## 6. Non-Goals (v1)

- e-Filing for citizens / public portal
- Video-conferencing hearings
- Integration with CCTNS or state-specific systems
- Multi-language UI (AI OCR is multilingual; the UI is English)
- Mobile native apps (responsive web only)

---

## 7. Success Metrics

| Metric | Target |
|---|---|
| Median FIR → court submission time | Reduced by 40% |
| Charge sheet preparation time | Reduced by 50% with AI drafts |
| Cases with complete evidence checklist at submission | > 90% |
| Audit coverage (actions logged) | 100% of state changes |

---

## 8. Release Plan

| Milestone | Scope |
|---|---|
| **M1 — Foundation** | Repo, CI, Prisma schema, auth, RBAC |
| **M2 — Police Workflow** | FIR, assignment, investigation, documents |
| **M3 — Court Workflow** | Submission, intake, actions, bail, closure |
| **M4 — AI Layer** | ai-poc service, search/chat, enhanced suite, features |
| **M5 — Polish & Docs** | Design system, docs, Postman collections, deployment |

---

## 9. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Sensitive PII in case data | RBAC + org isolation + audit logs; no public access |
| AI service downtime | All AI routes fail gracefully (fallbacks), core workflow is AI-independent |
| File storage limits | Cloudinary with type/size validation |
| Workflow misuse (invalid state jumps) | Server-side state machine validation on every transition |
