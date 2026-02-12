<p align="center">
<img src="https://img.shields.io/badge/⚖️-JusticeFlow-2563eb?style=for-the-badge&labelColor=2563eb" alt="JusticeFlow" />
</p>

<h1 align="center">JusticeFlow - AI-Powered Case Management System</h1>

<p align="center">
<strong>🚀 Revolutionizing Police-to-Court Case Handover with Artificial Intelligence</strong>
</p>

<p align="center">
<a href="https://youtu.be/QFKmyBJX93Y">
    <img src="https://img.shields.io/badge/▶️_Watch_Demo-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube Demo" />
</a>
</p>

<p align="center">
<img src="https://img.shields.io/badge/Hackathon-Hack_The_Winter-gold?style=flat-square" alt="Hackathon" />
<img src="https://img.shields.io/badge/Domain-Governance-blue?style=flat-square" alt="Domain" />
<img src="https://img.shields.io/badge/Impact-High-brightgreen?style=flat-square" alt="Impact" />
<img src="https://img.shields.io/badge/Innovation-Cutting_Edge-orange?style=flat-square" alt="Innovation" />
</p>

<p align="center">
<img src="https://img.shields.io/badge/Node.js-≥18.0.0-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js" />
<img src="https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
<img src="https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Python-3.8+-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python" />
<img src="https://img.shields.io/badge/FastAPI-Latest-009688?style=flat-square&logo=fastapi&logoColor=white" alt="FastAPI" />
<img src="https://img.shields.io/badge/PostgreSQL-Latest-336791?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</p>

---

## 📋 Table of Contents

<details>
<summary>Click to expand</summary>

- [🎯 Overview](#-overview)
- [✨ Feature Highlights](#-feature-highlights)
- [🏗️ System Architecture](#️-system-architecture)
- [🔄 Data Flow Diagrams](#-data-flow-diagrams)
- [🤖 AI-Powered Features](#-ai-powered-features)
- [📊 Case Lifecycle](#-case-lifecycle)
- [👥 User Roles & Permissions](#-user-roles--permissions)
- [🛠️ Tech Stack](#️-tech-stack)
- [📦 Installation](#-installation)
- [🗄️ Database Schema](#️-database-schema)
- [📡 API Documentation](#-api-documentation)
- [🔐 Security Features](#-security-features)
- [📱 Mobile Responsiveness](#-mobile-responsiveness)
- [🧪 Testing](#-testing)
- [🚀 Deployment](#-deployment)
- [📂 Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

</details>

---

## 🎯 Overview

**JusticeFlow** is a comprehensive, AI-powered Case Management System designed to digitize and streamline the entire lifecycle of criminal cases in the Indian judicial system — from FIR registration to final judgment.

### 🌟 Why JusticeFlow?

```mermaid
graph LR
    A[📋 Manual FIRs] -->|Before| B[❌ Paper-based chaos]
    C[⚖️ JusticeFlow] -->|After| D[✅ Digital efficiency]
    
    B --> E[Lost documents]
    B --> F[Delayed justice]
    B --> G[No transparency]
    
    D --> H[Secure storage]
    D --> I[Fast processing]
    D --> J[Complete audit trail]
    
    style A fill:#ffcccc
    style B fill:#ff6666
    style C fill:#ccffcc
    style D fill:#66ff66
```

### 🏆 Key Achievements

| Metric | Value |
|--------|-------|
| **Total Features** | 26+ |
| **AI Models Integrated** | 7 |
| **API Endpoints** | 60+ |
| **Database Tables** | 23 |
| **Lines of Code** | ~25,000+ |
| **Languages Supported** | 11 (OCR) |
| **Cost** | 100% FREE |

---

## ✨ Feature Highlights

### 🔥 Core Features

<table>
<tr>
<td width="50%">

#### 🚔 Police Module
- ✅ Digital FIR Registration
- ✅ Case Assignment & Tracking
- ✅ Investigation Management
- ✅ Evidence Upload & Management
- ✅ Witness & Accused Records
- ✅ Document Generation (Charge Sheet, etc.)
- ✅ Document Request System
- ✅ Bail Tracking

</td>
<td width="50%">

#### ⚖️ Court Module
- ✅ Case Intake & Review
- ✅ Submission Acknowledgment
- ✅ Cognizance & Charges Recording
- ✅ Trial Progress Tracking
- ✅ Hearing Management
- ✅ Judgment & Sentencing
- ✅ Case Archival
- ✅ Reopen Request Handling

</td>
</tr>
</table>

### 🤖 AI-Powered Features (26 Total)

```mermaid
flowchart TB
    subgraph OCR["📄 OCR & Extraction"]
        O1[Intelligent OCR]
        O2[Multilingual Support]
        O3[PII Redaction]
        O4[Entity Extraction]
    end
    
    subgraph DOC["📝 Document Intelligence"]
        D1[Charge Sheet Drafting]
        D2[Document Validation]
        D3[Template Generation]
        D4[Case Brief Generator]
    end
    
    subgraph LEGAL["⚖️ Legal AI"]
        L1[Section Suggester]
        L2[Section Explainer]
        L3[Precedent Matcher]
        L4[Legal NER]
    end
    
    subgraph SEARCH["🔍 Search & Discovery"]
        S1[Semantic Search]
        S2[RAG Chatbot]
        S3[Query Expansion]
        S4[Reranking]
    end
    
    subgraph ROLE["👥 Role-Based AI"]
        R1[Case Readiness Checker]
        R2[Document Validator]
        R3[AI Insight Pane]
    end
    
    AI((🤖 AI Core)) --> OCR
    AI --> DOC
    AI --> LEGAL
    AI --> SEARCH
    AI --> ROLE
    
    style AI fill:#6366f1,stroke:#4338ca,color:#fff
    style OCR fill:#e0f2fe,stroke:#0284c7,color:#0c4a6e
    style DOC fill:#fef3c7,stroke:#d97706,color:#78350f
    style LEGAL fill:#d1fae5,stroke:#059669,color:#064e3b
    style SEARCH fill:#fce7f3,stroke:#db2777,color:#831843
    style ROLE fill:#ede9fe,stroke:#7c3aed,color:#4c1d95
```

### 🎨 UI/UX Features

| Feature | Description |
|---------|-------------|
| 📱 **Mobile Responsive** | Works on all devices (phones, tablets, desktops) |
| 🔔 **Real-Time Notifications** | Instant alerts with unread count |
| 📊 **Analytics Dashboard** | Charts, stats, and trends |
| ⏱️ **Timeline Visualization** | Visual case journey with icons |
| 🔍 **Advanced Search** | AI-powered semantic search |
| 📄 **Document Preview** | In-browser document viewing |
| 🎯 **Drag & Drop** | Evidence upload with preview |
| ⚡ **Skeleton Loaders** | Smooth loading states |

---

## 🏗️ System Architecture

### High-Level Architecture

```mermaid
graph TB
    subgraph "🖥️ Client Layer"
        A[React 19 SPA<br/>Vite + TypeScript + TailwindCSS]
    end

    subgraph "🔌 API Gateway"
        B[Express.js Server<br/>JWT Auth + RBAC]
    end

    subgraph "🤖 AI Service"
        C[FastAPI Server<br/>Python + ML Models]
    end

    subgraph "💾 Data Layer"
        D[(PostgreSQL<br/>Prisma ORM)]
        E[(FAISS<br/>Vector Index)]
        F[☁️ Cloudinary<br/>File Storage]
    end

    A -->|REST API| B
    B -->|Proxy| C
    B --> D
    B --> F
    C --> E
    C --> D

    style A fill:#61dafb,stroke:#333,color:#000
    style B fill:#68a063,stroke:#333,color:#fff
    style C fill:#009688,stroke:#333,color:#fff
    style D fill:#336791,stroke:#333,color:#fff
    style E fill:#ff6b6b,stroke:#333,color:#fff
    style F fill:#3448c5,stroke:#333,color:#fff
```

### Detailed Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│  React 19 │ TypeScript │ TailwindCSS │ Vite │ Recharts │ React Router       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Pages     │  │ Components  │  │   Context   │  │   Hooks     │         │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ HTTPS / REST
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              BACKEND LAYER                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  Express.js │ TypeScript │ Prisma │ JWT │ Helmet │ Winston                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ Middleware  │──│ Controllers │──│  Services   │──│   Prisma    │         │
│  │ Auth/RBAC   │  │   Routes    │  │   Logic     │  │   Client    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘  └──────┬──────┘         │
└────────────────────────────────────────────────────────────┼────────────────┘
                        │                                 │
                        │ HTTP Proxy                      │
                        ▼                                 ▼
┌──────────────────────────────────────────┐    ┌────────────────────────────┐
│            AI-POC SERVICE                │    │      PostgreSQL DB         │
├──────────────────────────────────────────┤    ├────────────────────────────┤
│  FastAPI │ Python │ ML Models            │    │  23 Tables │ 13 Enums      │
│  ┌────────────┐  ┌────────────┐          │    │  Full Audit Trail          │
│  │    OCR     │  │    NER     │          │    └────────────────────────────┘
│  │ Tesseract  │  │   spaCy    │          │
│  └────────────┘  └────────────┘          │    ┌────────────────────────────┐
│  ┌────────────┐  ┌────────────┐          │    │       Cloudinary           │
│  │   FAISS    │  │Transformers│          │    ├────────────────────────────┤
│  │  Search    │  │   LLM      │          │    │  Evidence │ Documents      │
│  └────────────┘  └────────────┘          │    │  Secure CDN Storage        │
└──────────────────────────────────────────┘    └────────────────────────────┘
```

---

## 🔄 Data Flow Diagrams

### Level-0 DFD (Context Diagram)

```mermaid
flowchart TB
    subgraph External["External Entities"]
        PO[👮 Police Officer]
        SHO[👨‍✈️ SHO]
        CC[📋 Court Clerk]
        JG[⚖️ Judge]
    end

    subgraph System["⚖️ JusticeFlow CMS"]
        NS[Case Management<br/>+ AI Services]
    end

    PO -->|FIR, Evidence, Investigation| NS
    SHO -->|Assignment, Submission| NS
    CC -->|Acknowledgment, Review| NS
    JG -->|Judgment, Orders| NS

    NS -->|Case Status, Notifications| PO
    NS -->|Pending Actions, Reports| SHO
    NS -->|Submissions, Documents| CC
    NS -->|Case Briefs, Timeline| JG

    style NS fill:#1a365d,stroke:#333,color:#fff
    style PO fill:#3498db,stroke:#333,color:#fff
    style SHO fill:#e74c3c,stroke:#333,color:#fff
    style CC fill:#2ecc71,stroke:#333,color:#fff
    style JG fill:#f39c12,stroke:#333,color:#fff
```

### Level-1 DFD (Process Decomposition)

```mermaid
flowchart LR
    subgraph P1["1️⃣ FIR Management"]
        P1A[Register FIR]
        P1B[Create Case]
    end

    subgraph P2["2️⃣ Investigation"]
        P2A[Record Events]
        P2B[Collect Evidence]
        P2C[Add Witnesses]
    end

    subgraph P3["3️⃣ Documents"]
        P3A[Generate Charge Sheet]
        P3B[Prepare Evidence List]
        P3C[Validate Documents]
    end

    subgraph P4["4️⃣ Court Process"]
        P4A[Submit to Court]
        P4B[Court Review]
        P4C[Trial & Judgment]
    end

    subgraph AI["🤖 AI Services"]
        AI1[OCR Extract]
        AI2[NER Process]
        AI3[Draft Generate]
        AI4[Semantic Search]
    end

    P1A --> P1B --> P2A
    P2A --> P2B --> P2C --> P3A
    P3A --> P3B --> P3C --> P4A
    P4A --> P4B --> P4C

    AI1 -.-> P1A
    AI2 -.-> P2B
    AI3 -.-> P3A
    AI4 -.-> P4B
```

### AI Processing Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant AI_POC
    participant FAISS

    User->>Frontend: Upload FIR Document
    Frontend->>Backend: POST /api/ai/ocr-extract
    Backend->>AI_POC: Forward file
    AI_POC->>AI_POC: OCR (Tesseract)
    AI_POC->>AI_POC: NER (spaCy)
    AI_POC->>AI_POC: PII Redaction
    AI_POC-->>Backend: Entities + Redacted Text
    Backend-->>Frontend: Extraction Result
    Frontend-->>User: Auto-fill Form

    User->>Frontend: Generate Charge Sheet
    Frontend->>Backend: POST /api/ai/generate-draft
    Backend->>AI_POC: Case Data
    AI_POC->>AI_POC: LLM Generation
    AI_POC-->>Backend: Draft Document
    Backend-->>Frontend: Document Preview
    Frontend-->>User: Review & Edit

    User->>Frontend: Search Similar Cases
    Frontend->>Backend: POST /api/ai/search
    Backend->>AI_POC: Query
    AI_POC->>FAISS: Vector Search
    FAISS-->>AI_POC: Similar Docs
    AI_POC->>AI_POC: Rerank Results
    AI_POC-->>Backend: Ranked Results
    Backend-->>Frontend: Search Results
    Frontend-->>User: Display Cases
```

---

## 🤖 AI-Powered Features

### Feature Matrix

| # | Feature | Technology | Role Access | Status |
|---|---------|------------|-------------|--------|
| 1 | Intelligent OCR | Tesseract + pdfplumber | All | ✅ |
| 2 | Multilingual OCR | 11 Indian Languages | All | ✅ |
| 3 | Named Entity Recognition | spaCy NLP | All | ✅ |
| 4 | Legal Domain NER | Custom Legal Model | All | ✅ |
| 5 | PII Redaction | Regex + NER | All | ✅ |
| 6 | Charge Sheet Drafting | HuggingFace + FLAN-T5 | Police/SHO | ✅ |
| 7 | Legal Co-Pilot Chatbot | RAG + FAISS | All | ✅ |
| 8 | Section Suggester | BM25 + IPC/BNS DB | Police/SHO | ✅ |
| 9 | Section Explainer | Legal Database | All | ✅ |
| 10 | Precedent Matcher | FAISS + Embeddings | All | ✅ |
| 11 | Query Expansion | Legal Synonyms | All | ✅ |
| 12 | Search Reranking | Cross-Encoder | All | ✅ |
| 13 | Case Readiness Checker | Rule Engine | SHO Only | ✅ |
| 14 | Document Validator | Compliance Checker | Clerk Only | ✅ |
| 15 | Case Brief Generator | LLM Synthesis | Judge Only | ✅ |
| 16 | Keyword Suggester | TF-IDF + Legal Terms | All | ✅ |
| 17 | Advanced Document Gen | Jinja2 Templates | Police/SHO | ✅ |

### AI Architecture

```mermaid
graph TB
    subgraph Input["📥 Input Layer"]
        I1[Document Upload<br/>PDF/Image]
        I2[Text Input]
        I3[Search Query]
    end

    subgraph Processing["⚙️ Processing Pipeline"]
        P1[OCR Module<br/>Tesseract + Multilingual]
        P2[NER Module<br/>spaCy + Legal NER]
        P3[Embedding Module<br/>Sentence Transformers]
    end

    subgraph AI["🧠 AI Intelligence"]
        A1[FAISS Index<br/>Vector Search]
        A2[LLM Generation<br/>HuggingFace + Local]
        A3[Reranker<br/>Cross-Encoder]
        A4[Section Matcher<br/>BM25 Ranking]
    end

    subgraph Output["📤 Output Layer"]
        O1[Extracted Entities]
        O2[Generated Documents]
        O3[Search Results]
        O4[Section Suggestions]
    end

    I1 --> P1
    I2 --> P2
    I3 --> P3

    P1 --> P2
    P2 --> P3
    P3 --> A1

    P2 --> A2
    A1 --> A3
    P2 --> A4

    A1 --> O3
    A2 --> O2
    A3 --> O3
    A4 --> O4
    P2 --> O1

    style Input fill:#e3f2fd
    style Processing fill:#fff3e0
    style AI fill:#f3e5f5
    style Output fill:#e8f5e9
```

### Multilingual OCR Support

| Language | Script | Status |
|----------|--------|--------|
| English | Latin | ✅ |
| Hindi | Devanagari | ✅ |
| Bengali | Bengali | ✅ |
| Tamil | Tamil | ✅ |
| Telugu | Telugu | ✅ |
| Marathi | Devanagari | ✅ |
| Gujarati | Gujarati | ✅ |
| Kannada | Kannada | ✅ |
| Malayalam | Malayalam | ✅ |
| Punjabi | Gurmukhi | ✅ |
| Odia | Odia | ✅ |

---

## 📊 Case Lifecycle

### 16-State Case State Machine

```mermaid
stateDiagram-v2
    [*] --> FIR_REGISTERED: Register FIR
    
    FIR_REGISTERED --> CASE_ASSIGNED: SHO Assigns
    CASE_ASSIGNED --> UNDER_INVESTIGATION: Start Investigation
    
    UNDER_INVESTIGATION --> INVESTIGATION_PAUSED: Pause
    INVESTIGATION_PAUSED --> UNDER_INVESTIGATION: Resume
    
    UNDER_INVESTIGATION --> INVESTIGATION_COMPLETED: Complete
    
    INVESTIGATION_COMPLETED --> CHARGE_SHEET_PREPARED: Evidence Found
    INVESTIGATION_COMPLETED --> CLOSURE_REPORT_PREPARED: No Evidence
    
    CHARGE_SHEET_PREPARED --> SUBMITTED_TO_COURT: SHO Submits
    CLOSURE_REPORT_PREPARED --> SUBMITTED_TO_COURT: SHO Submits
    
    SUBMITTED_TO_COURT --> COURT_ACCEPTED: Court Accepts
    SUBMITTED_TO_COURT --> RETURNED_FOR_DEFECTS: Court Returns
    
    RETURNED_FOR_DEFECTS --> RESUBMITTED_TO_COURT: Fix & Resubmit
    RESUBMITTED_TO_COURT --> COURT_ACCEPTED: Court Accepts
    
    COURT_ACCEPTED --> TRIAL_ONGOING: Trial Begins
    TRIAL_ONGOING --> JUDGMENT_RESERVED: Reserve Judgment
    JUDGMENT_RESERVED --> DISPOSED: Deliver Judgment
    
    DISPOSED --> ARCHIVED: Archive Case
    DISPOSED --> APPEALED: File Appeal
    
    ARCHIVED --> [*]
```

### Case Flow Visualization

```mermaid
flowchart TD
    A[👮 Police registers FIR] --> B[📋 Case auto-created]
    B --> C[👨‍✈️ SHO assigns case]
    C --> D[🔍 Investigation phase]
    
    D --> E{Evidence found?}
    E -->|Yes| F[📝 Prepare Charge Sheet]
    E -->|No| G[📄 Prepare Closure Report]
    
    F --> H[✅ Document Validation]
    G --> H
    
    H --> I{All documents ready?}
    I -->|No| J[⚠️ Fix missing items]
    J --> H
    I -->|Yes| K[📤 SHO submits to Court]
    
    K --> L[📋 Court Clerk reviews]
    L --> M{Accepted?}
    M -->|No| N[🔙 Return for defects]
    N --> D
    M -->|Yes| O[⚖️ Court accepts case]
    
    O --> P[👨‍⚖️ Trial phase]
    P --> Q[📜 Judgment delivered]
    Q --> R[📁 Case archived]

    style A fill:#3498db,color:#fff
    style O fill:#2ecc71,color:#fff
    style Q fill:#f39c12,color:#fff
    style R fill:#95a5a6,color:#fff
```

---

## 👥 User Roles & Permissions

### Role Hierarchy

```mermaid
graph TD
    J[⚖️ JUDGE<br/>Highest Authority]
    CC[📋 COURT_CLERK<br/>Court Operations]
    SHO[👨‍✈️ SHO<br/>Station Head]
    P[👮 POLICE<br/>Investigating Officer]
    
    J --> CC
    SHO --> P
    
    style J fill:#f39c12,stroke:#333,color:#000
    style CC fill:#2ecc71,stroke:#333,color:#fff
    style SHO fill:#e74c3c,stroke:#333,color:#fff
    style P fill:#3498db,stroke:#333,color:#fff
```

### Permission Matrix

| Feature | POLICE | SHO | COURT_CLERK | JUDGE |
|---------|:------:|:---:|:-----------:|:-----:|
| Register FIR | ✅ | ✅ | ❌ | ❌ |
| Assign Cases | ❌ | ✅ | ❌ | ❌ |
| Upload Evidence | ✅ | ✅ | ❌ | ❌ |
| Create Documents | ✅ | ✅ | ❌ | ❌ |
| Submit to Court | ❌ | ✅ | ❌ | ❌ |
| Accept Submission | ❌ | ❌ | ✅ | ✅ |
| Record Court Actions | ❌ | ❌ | ✅ | ✅ |
| Deliver Judgment | ❌ | ❌ | ❌ | ✅ |
| Approve Reopen | ❌ | ❌ | ❌ | ✅ |
| Case Readiness Check | ❌ | ✅ | ❌ | ❌ |
| Document Validation | ❌ | ❌ | ✅ | ❌ |
| Generate Case Brief | ❌ | ❌ | ❌ | ✅ |

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI Framework |
| TypeScript | 5.9.3 | Type Safety |
| Vite | 7.2.4 | Build Tool |
| TailwindCSS | 4.1.18 | Styling |
| React Router | 7.11.0 | Routing |
| Axios | 1.13.2 | HTTP Client |
| Recharts | 2.15.1 | Charts & Analytics |
| React Hot Toast | 2.6.0 | Notifications |
| jsPDF | 3.0.4 | PDF Generation |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | ≥18.0.0 | Runtime |
| Express.js | 4.21.2 | Web Framework |
| TypeScript | 5.7.2 | Type Safety |
| Prisma | 5.22.0 | ORM |
| PostgreSQL | Latest | Database |
| JWT | 9.0.2 | Authentication |
| Bcrypt | 6.0.0 | Password Hashing |
| Cloudinary | 2.8.0 | File Storage |
| PDFKit | 0.17.2 | PDF Generation |
| Winston | 3.17.0 | Logging |
| Helmet | 8.0.0 | Security Headers |

### AI-POC

| Technology | Version | Purpose |
|------------|---------|---------|
| FastAPI | Latest | API Framework |
| Python | ≥3.8 | Runtime |
| pytesseract | Latest | OCR Engine |
| pdfplumber | Latest | PDF Parsing |
| spaCy | Latest | NER & NLP |
| FAISS | Latest | Vector Search |
| sentence-transformers | Latest | Embeddings |
| HuggingFace | Latest | LLM API |
| Jinja2 | Latest | Templating |
| langdetect | Latest | Language Detection |

---

## 📦 Installation

### Prerequisites

- **Node.js** ≥ 18.0.0
- **Python** ≥ 3.8
- **PostgreSQL** ≥ 14.0
- **Tesseract OCR** (for AI features)

### Quick Start (3 Terminals)

#### Terminal 1: Backend

```bash
cd backend
npm install
cp .env.example .env  # Configure your variables
npm run db:generate
npm run db:migrate
npm run db:seed  # Optional: Add sample data
npm run dev
```

#### Terminal 2: Frontend

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

#### Terminal 3: AI Service

```bash
cd ai-poc
pip install -r requirements.txt
python -c "import spacy; spacy.cli.download('en_core_web_sm')"
uvicorn main:app --host 0.0.0.0 --port 8001 --reload
```

### Environment Variables

#### Backend (.env)

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/justiceflow"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Server
PORT=5000
NODE_ENV=development
```

#### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

#### AI-POC (.env)

```env
HUGGINGFACE_HUB_API_TOKEN=your-token  # Optional
MODEL_NAME=google/flan-t5-small
AI_SERVICE_PORT=8001
```

### Access Points

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000 |
| AI Service | http://localhost:8001 |
| API Docs (Swagger) | http://localhost:8001/docs |
| Prisma Studio | `npm run db:studio` |

---

## 🗄️ Database Schema

### Entity Relationship Overview

```mermaid
erDiagram
    User ||--o{ Fir : registers
    User ||--o{ CaseAssignment : assigns
    PoliceStation ||--o{ Fir : has
    Court ||--o{ CourtSubmission : receives
    
    Fir ||--|| Case : creates
    Case ||--|| CurrentCaseState : has
    Case ||--o{ CaseStateHistory : tracks
    Case ||--o{ InvestigationEvent : records
    Case ||--o{ Evidence : contains
    Case ||--o{ Witness : has
    Case ||--o{ Accused : involves
    Case ||--o{ Document : generates
    Case ||--o{ CourtSubmission : submitted
    Case ||--o{ CourtAction : receives
    
    CourtSubmission ||--|| Acknowledgement : receives
    Accused ||--o{ BailRecord : applies
```

### Database Statistics

| Category | Count |
|----------|-------|
| **Tables** | 23 |
| **Enums** | 13 |
| **Relations** | 50+ |
| **Indexed Fields** | 35+ |

### Core Tables

| Table | Purpose |
|-------|---------|
| `users` | All system users with roles |
| `police_stations` | Police station registry |
| `courts` | Court registry |
| `firs` | First Information Reports |
| `cases` | Case records |
| `current_case_states` | Current state tracking |
| `case_state_history` | State transition history |
| `investigation_events` | Investigation activities |
| `evidence` | Evidence files & metadata |
| `witnesses` | Witness records |
| `accused` | Accused persons |
| `documents` | Legal documents |
| `court_submissions` | Submissions to court |
| `court_actions` | Court proceedings |
| `case_briefs` | AI-generated briefs |
| `case_readiness_checks` | Readiness analysis |
| `document_validations` | Validation records |

---

## 📡 API Documentation

### Authentication

All protected routes require JWT token:

```http
Authorization: Bearer <your_jwt_token>
```

### Core Endpoints

#### 🔐 Authentication
```http
POST   /api/auth/register     # Register new user
POST   /api/auth/login        # Login
GET    /api/auth/me           # Get current user
```

#### 📋 FIR Management
```http
POST   /api/firs              # Register FIR
GET    /api/firs              # List FIRs
GET    /api/firs/:id          # Get FIR details
```

#### 📁 Case Management
```http
GET    /api/cases             # List cases
GET    /api/cases/:id         # Get case details
POST   /api/cases/:id/assign  # Assign case
GET    /api/cases/:id/timeline # Get timeline
```

#### 🔍 Investigation
```http
POST   /api/cases/:id/events    # Add event
POST   /api/cases/:id/evidence  # Upload evidence
POST   /api/cases/:id/witnesses # Add witness
```

#### ⚖️ Court Operations
```http
POST   /api/cases/:id/submit    # Submit to court
PUT    /api/submissions/:id/accept # Accept submission
POST   /api/cases/:id/actions   # Record court action
```

### AI Endpoints

#### 📄 Document Processing
```http
POST   /api/ai/ocr-extract              # OCR extraction
POST   /api/ai/generate-draft           # Generate charge sheet
POST   /api/ai/enhanced/multilingual-ocr # Multilingual OCR
POST   /api/ai/enhanced/legal-ner       # Legal entity extraction
```

#### 🔍 Search & Discovery
```http
POST   /api/ai/index                    # Build FAISS index
GET    /api/ai/search                   # Semantic search
POST   /api/ai/chat                     # RAG chatbot
POST   /api/ai/enhanced/advanced-search # Enhanced search
```

#### ⚖️ Legal Intelligence
```http
POST   /api/ai/enhanced/suggest-sections     # Section suggestions
GET    /api/ai/enhanced/section-details/:id  # Section details
POST   /api/ai/enhanced/find-precedents      # Find precedents
GET    /api/ai/enhanced/sections-list        # All sections
```

#### 👥 Role-Based Features
```http
POST   /api/ai/case-readiness          # SHO: Check readiness
POST   /api/ai/document-validate       # Clerk: Validate document
POST   /api/ai/case-brief              # Judge: Generate brief
```

---

## 🔐 Security Features

### Authentication & Authorization

| Feature | Implementation |
|---------|----------------|
| Password Hashing | bcrypt (10 rounds) |
| Token Auth | JWT with expiration |
| Role-Based Access | 4-tier RBAC |
| Session Management | Secure cookies |

### Data Protection

| Feature | Implementation |
|---------|----------------|
| Input Validation | express-validator |
| SQL Injection | Prisma parameterized queries |
| XSS Protection | Input sanitization |
| CSRF Protection | Token validation |
| Security Headers | Helmet.js |
| File Validation | Type & size checks |
| Audit Logging | Complete action trail |

### API Security

| Feature | Implementation |
|---------|----------------|
| Rate Limiting | Request throttling |
| CORS | Whitelisted origins |
| HTTPS | Production enforcement |
| Error Handling | No sensitive data leak |

---

## 📱 Mobile Responsiveness

### Breakpoints

| Device | Breakpoint | Layout |
|--------|------------|--------|
| Mobile | < 640px | Single column, hamburger menu |
| Tablet | 640px - 1024px | Adaptive layout |
| Desktop | > 1024px | Full multi-column layout |

### Mobile Features

- ✅ Hamburger navigation menu
- ✅ Touch-friendly buttons (44px minimum)
- ✅ Responsive tables (card layout on mobile)
- ✅ Full-width forms
- ✅ Safe areas for notched devices
- ✅ Optimized images and assets

---

## 🧪 Testing

### Running Tests

```bash
# Backend tests
cd backend
npm test

# With coverage
npm test -- --coverage
```

### Test Checklist

#### AI Features
- [x] OCR extraction works
- [x] NER identifies entities
- [x] Charge sheet generation
- [x] FAISS index builds
- [x] RAG chatbot responds
- [x] Section suggestions work

#### Core Features
- [x] User authentication
- [x] FIR registration
- [x] Case assignment
- [x] Evidence upload
- [x] Court submission
- [x] State transitions

---

## 🚀 Deployment

### Production Build

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd client
npm run build
# Deploy dist/ folder

# AI-POC
cd ai-poc
uvicorn main:app --host 0.0.0.0 --port 8001
```

### Deployment Platforms

| Platform | Backend | Frontend | Database | AI |
|----------|:-------:|:--------:|:--------:|:--:|
| Railway | ✅ | ✅ | ✅ | ✅ |
| Render | ✅ | ✅ | ✅ | ✅ |
| Vercel | ✅ | ✅ | ❌ | ❌ |
| AWS | ✅ | ✅ | ✅ | ✅ |
| DigitalOcean | ✅ | ✅ | ✅ | ✅ |

---

## 📂 Project Structure

```
JusticeFlow/
├── 📁 backend/                 # Node.js + Express API
│   ├── prisma/                 # Database schema & migrations
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── src/
│       ├── config/             # Configuration
│       ├── middleware/         # Auth, validation, error handling
│       ├── modules/            # Feature modules
│       │   ├── auth/
│       │   ├── case/
│       │   ├── fir/
│       │   ├── investigation/
│       │   ├── document/
│       │   ├── court/
│       │   └── ai/             # AI integration
│       ├── services/           # Business logic
│       └── utils/              # Utilities
│
├── 📁 client/                  # React + Vite Frontend
│   └── src/
│       ├── api/                # API clients
│       ├── components/         # React components
│       │   ├── ai/             # AI feature components
│       │   ├── case/           # Case components
│       │   ├── charts/         # Analytics charts
│       │   └── common/         # Shared components
│       ├── context/            # React Context
│       ├── pages/              # Page components
│       ├── routes/             # Routing
│       └── utils/              # Utilities
│
├── 📁 ai-poc/                  # Python + FastAPI AI Service
│   ├── data/                   # Legal databases (IPC, BNS)
│   ├── templates/              # Document templates
│   ├── utils/                  # AI utilities
│   │   ├── ocr.py
│   │   ├── ner.py
│   │   ├── legal_ner.py
│   │   ├── multilingual_ocr.py
│   │   ├── section_suggester.py
│   │   ├── precedent_matcher.py
│   │   ├── faiss_index.py
│   │   └── generator.py
│   └── main.py                 # FastAPI app
│
├── 📄 ARCHITECTURE.md          # Technical architecture
├── 📄 DFD.md                   # Data flow diagrams
├── 📄 SYSTEM_FLOW.md           # Case workflow
├── 📄 SECURITY.md              # Security policy
├── 📄 ROUND2_IMPLEMENTATION.md # Feature documentation
└── 📄 README.md                # This file
```

---

## 🔮 Future Roadmap

| Phase | Features | Status |
|-------|----------|--------|
| Phase 1 | Core CMS Features | ✅ Complete |
| Phase 2 | AI Integration | ✅ Complete |
| Phase 3 | Advanced AI | ✅ Complete |
| Phase 4 | WebSocket Notifications | 🔮 Planned |
| Phase 5 | Mobile App (React Native) | 🔮 Planned |
| Phase 6 | Blockchain Audit Trail | 🔮 Planned |
| Phase 7 | Voice Assistant | 🔮 Planned |
| Phase 8 | Multi-language UI | 🔮 Planned |

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Code Style

- Follow TypeScript best practices
- Use ESLint and Prettier
- Write meaningful commit messages
- Add tests for new features
- Update documentation

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🏆 Hackathon Info

<table>
<tr>
<td align="center">
<strong>🎯 Hackathon</strong><br/>
Hack The Winter
</td>
<td align="center">
<strong>📂 Domain</strong><br/>
Governance
</td>
<td align="center">
<strong>📅 Date</strong><br/>
January 2026
</td>
</tr>
</table>

---

## 🙏 Acknowledgments

- Inspired by the need for digital transformation in the Indian judicial system
- Built with ❤️ for **Hack The Winter** hackathon
- Thanks to all contributors and supporters

---

<div align="center">

## ⭐ Star this repo if you find it helpful!

<br/>

**Made with ❤️ for a better justice system**

<br/>

[🐛 Report Bug](https://github.com/yourusername/JusticeFlow-CMS/issues) · 
[💡 Request Feature](https://github.com/yourusername/JusticeFlow-CMS/issues) · 
[📺 Watch Demo](https://youtu.be/QFKmyBJX93Y)

</div>
