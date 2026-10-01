# 🎨 Design System

> **JusticeFlow** — Clarity. Trust. Efficiency.
>
> This document defines the visual design system, UI components, and user experience guidelines for JusticeFlow. The goal is a modern, government-grade interface that feels trustworthy for police and judiciary work while staying clean and fast. The app currently uses a **claymorphism/glassmorphism** style (see `client/src/index.css`).

---

## 1. Design Principles

| | | |
|:---:|:---:|:---:|
| **⚖️ Trust-First** | **🧹 Minimal & Clean** | **🧩 Consistent** |
| Formal, calm surfaces suited to legal work | Reduce clutter; content over chrome | One unified design language across all four role dashboards |

---

## 2. Color Palette

Primary colors used across the application (defined in `client/src/index.css` and `tailwind.config.js`).

### Navy — Primary Brand

| Token | Hex | Usage |
|---|---|---|
| `--navy-900` | `#1B263B` | Primary brand, sidebar, headings |
| `--navy-800` | `#273A5A` | Primary hover states |
| `--navy-700` | `#324A6D` | Active nav items |
| `--navy-600` | `#3A5A97` | Links, accents |
| `--navy-500` | `#4A6B9F` | Secondary accents |
| `--navy-200` | `#A3B1C6` | Muted text on dark |
| `--navy-50` | `#F4F7FB` | Page background tint |

### Semantic Colors

| Token | Hex | Usage |
|---|---|---|
| `--success` | `#10b981` | Success messages, completed states |
| `--warning` | `#f59e0b` | Warnings, caution states, pending badges |
| `--danger` | `#ef4444` | Error messages, destructive actions |
| `--info` | `#3b82f6` | Information, neutral highlights |
| `--secondary` | `#6366f1` | Secondary actions, AI-related UI |

### App Background

```css
background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 50%, #f0f9ff 100%);
```

---

## 3. Typography

The system font stack is used for reliability (no webfont dependency):

```
-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif
```

| Element | Size | Weight | Notes |
|---|---|---|---|
| Page title | 24–28 px | 700 | Navy-900 |
| Section heading | 18–20 px | 600 | With emoji/icon per page convention |
| Body | 16 px | 400 | `line-height: 1.6` |
| Small / meta | 12–14 px | 400–500 | Muted gray |
| Stat number | 28–36 px | 800 | In stat cards |

---

## 4. UI Components

Standard components to be used throughout the app. All are global classes in `client/src/index.css` — reuse them, don't recreate.

### Buttons

| Class | Style |
|---|---|
| `.btn` | Base: 12×24 padding, radius 12, soft shadow |
| `.btn-primary` | Navy gradient (`--navy-900 → --navy-800`), white text |
| `.btn-secondary` | White surface, border, dark text |
| `.btn-danger` | Red gradient, white text (destructive only) |
| `.btn-ghost` | Transparent, no border |

```jsx
<button className="btn btn-primary">Submit to Court</button>
```

### Cards

`.card` — white surface, radius 16–20, layered soft shadow (claymorphism). Used for stat cards, list items, detail panels.

### Badges

`.badge` base + semantic variants: `.badge-success` (completed), `.badge-warning` (pending), `.badge-danger` (rejected/urgent), `.badge-info`, `.badge-default`.

### Inputs

`.input` — radius 12, soft inset shadow, focus ring in blue. Same class for `input`, `select`, `textarea`.

### Stat Cards

`.stats-grid` — responsive grid of stat cards used on all dashboards (Total / Active / Closed pattern).

---

## 5. Layout & Spacing

| Token | Value |
|---|---|
| Page padding | 24 px |
| Card padding | 20–24 px |
| Grid gap | 16–24 px |
| Radius scale | 8 / 12 / 16 / 20 px |
| Shadows | Soft, layered: `0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -1px rgba(0,0,0,.06)` |

---

## 6. Role Dashboard Patterns

Every role shares the same page anatomy — only the content differs:

```
┌─────────────────────────────────────────────────┐
│  Header: emoji + Title            [Action Btn]  │
├─────────────────────────────────────────────────┤
│  Stats Grid:  Total │ Active │ Pending │ Closed │
├─────────────────────────────────────────────────┤
│  Main Content:                                  │
│   • Officer  → My Cases list + CaseDetails tabs │
│   • SHO      → All Cases table + approvals      │
│   • Clerk    → Incoming cases + validation      │
│   • Judge    → Cases + court actions + briefs   │
└─────────────────────────────────────────────────┘
```

Conventions:

- Page headers lead with a relevant emoji (🚨 police, 🏛️ court, ⚖️ judge).
- Status is always shown as a **badge**, never plain text.
- Empty states use an icon + one-line message + primary action.
- Loading states show a spinner centered in the card; errors use toast notifications.

---

## 7. Motion & Feedback

| Interaction | Feedback |
|---|---|
| Button hover | `translateY(-2px)` + stronger shadow (150 ms ease) |
| Card hover | Shadow deepen (200 ms) |
| Action success | `react-hot-toast` success toast |
| Action failure | `react-hot-toast` error toast (message from `data.message`) |
| Session expiry | Auto-redirect to `/login` with toast |

---

## 8. Accessibility & Responsiveness

- ✅ Minimum contrast 4.5:1 for body text (navy-900 on white passes).
- ✅ Focus ring on all interactive elements (`.btn:focus` blue ring).
- ✅ All forms labeled; icon-only buttons need `aria-label`.
- ✅ Breakpoints: mobile-first — dashboards collapse to single column < 768 px; tables scroll horizontally.
- ✅ Touch targets ≥ 40 px on mobile.
