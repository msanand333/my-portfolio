# PRD: shanmuganand.dev — Frontend Portfolio

**Version:** 1.0  
**Stack:** Astro + Vanilla TypeScript + Tailwind CSS v4 + MDX  
**Theme:** Monochrome CLI / Terminal Aesthetic

---

## 1. Overview

A personal portfolio for **Shanmuganand M**, Senior Frontend Engineer. The site positions him as a high-signal, senior-level engineer — not just a "I made some websites" guy. The aesthetic is a hardcore terminal/CLI theme: black backgrounds, white monospace text, blinking cursors, command-line-style interactions. No color. No fluff. Just signal.

Target audience: **Hiring managers & senior engineers** at product-led tech companies.

---

## 2. Design System

### 2.1 Color Palette

**Dark Mode (default):**
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0a0a0a` | Page background |
| `--surface` | `#111111` | Card / section backgrounds |
| `--border` | `#2a2a2a` | Borders, dividers |
| `--text-primary` | `#f0f0f0` | Body text |
| `--text-secondary` | `#888888` | Muted / metadata text |
| `--accent` | `#ffffff` | Highlights, active states |
| `--cursor` | `#f0f0f0` | Blinking cursor elements |
| `--blue` | `#2b7fff` | CTAs, links, active states, key highlights |

**Light Mode (`[data-theme="light"]`):**
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#f5f5f5` | Page background |
| `--surface` | `#ebebeb` | Card / section backgrounds |
| `--border` | `#d0d0d0` | Borders, dividers |
| `--text-primary` | `#0a0a0a` | Body text |
| `--text-secondary` | `#666666` | Muted / metadata text |
| `--accent` | `#000000` | Highlights, active states |
| `--cursor` | `#0a0a0a` | Blinking cursor elements |
| `--blue` | `#2b7fff` | CTAs, links, active states — unchanged |

> **Rule:** `--blue` is the **only** token that stays constant across both modes. Everything else flips. The toggle should feel like switching between a dark terminal and a terminal in a sunlit room — not a generic light mode. Scanline overlay persists in both modes but is more subtle in light.

### 2.4 Theme Toggle

- Rendered as `[ dark ]` / `[ light ]` in the nav top-right — monospace text button, no icons
- Theme persisted via `localStorage` key `theme`
- Applied via `data-theme` attribute on `<html>`
- Default: **dark**
- Transition: `transition: background 0.3s ease, color 0.3s ease` on `body`

### 2.2 Typography

- **Display / Headings:** `JetBrains Mono` or `IBM Plex Mono` — monospace only
- **Body:** `Geist Mono` (Vercel's mono — fits the vibe)
- **No serif. No sans-serif. Everything is monospace.** This is a CLI, not a brochure.

### 2.3 UI Patterns

- Cursor blink animations on section headers
- Command-prompt prefixes (`>_`, `$`, `~/`) on interactive elements
- Scanline overlay (subtle CSS texture) on hero section
- Underline hover states — no background fills
- Section separators: `---` or `═══` ASCII-style dividers
- Loading states mimic terminal output (character-by-character reveal)

---

## 3. Site Architecture

```
/                    → Hero + Nav (all sections summarized)
/about               → Full about: bio, focus areas, contact
/experience          → Full work history, detailed bullets
/projects            → All projects from GitHub
/blog                → All blog posts (listing)
/blog/[slug]         → Individual blog post
```

Single-page with anchor navigation for the **summary view**. Skills and Contact live only on the homepage — no dedicated pages. `[ view all → ]` CTAs exist only for About, Experience, Projects, and Blog. Astro handles routing; all interactivity is vanilla TypeScript.

### Dedicated Page Specs

**`/about`**

- Extended bio (2–3 paragraphs, still terminal-toned)
- Focus areas: Design Systems, Performance, Developer Tooling, AI integrations
- Work authorization: U.S. Permanent Resident
- Languages, interests, approach to engineering
- Inline contact links (email, LinkedIn, GitHub)

**`/experience`**

- Full timeline with all bullet points expanded by default
- Each role has full context, stack used, and measurable impact
- No accordion — show everything

**`/projects`**

- Full list of GitHub repos (beyond the 3 featured on homepage)
- Same card format, expanded grid
- Filter by stack/language (optional — Phase 3)
- Links to GitHub and live demos

**`/blog`**

- List of all blog posts, sorted by date (newest first)
- Each post as a card: title, date, short excerpt, `[ read → ]` link
- Terminal-style: `$ cat posts --sort=date`
- No pagination for now — all posts on one page

**`/blog/[slug]`**

- Full blog post rendered from MDX
- Post title, date, estimated read time
- MDX body rendered with terminal-appropriate typography
- `[ ← back to blog ]` navigation link at top and bottom

---

## 4. Pages & Sections

### 4.1 Hero Section

**Goal:** Immediate impression. Establish identity + vibe in under 3 seconds.

**Layout:**

```
┌──────────────────────────────┬─────────────┐
│  > shanmuganand.m_           │   [avatar]  │
│  Senior Frontend Engineer    │    pixel    │
│  Indianapolis · Open to work │   char ↑   │
│                              │             │
│  [ view work ] [ resume ]    │             │
└──────────────────────────────┴─────────────┘
```

Two-column layout: text left, pixel avatar right. On mobile: avatar sits above text, centered.

**Avatar spec:**

- Minecraft-style pixel character rendered as an inline SVG
- `shape-rendering: crispEdges` — no antialiasing, keep it pixel-perfect
- Dark shirt with `--blue` (#2b7fff) accent detail to tie into the palette
- Subtle idle float animation (CSS `@keyframes` — slow sine-wave translateY, ~3s loop)
- Character wears dark clothes matching the site's monochrome CLI vibe
- Pixel grid: 64×96 base units, rendered at 2–3× scale
- Optional: slight pixel shadow beneath character feet for depth

**Interactions:**

- Name types out character-by-character on load (typewriter effect, ~80ms/char)
- Cursor blinks after name finishes typing
- Avatar floats in from the right on load (fade + slide, 600ms, after name starts typing)
- Subtle scanline CSS effect over the hero background
- `view work` scrolls to Experience; `download resume` triggers PDF download
- `[ about me → ]` CTA links to `/about`

**Astro implementation:** All hero animations (typewriter, avatar float-in) handled via vanilla TypeScript in an Astro `<script>` tag. No islands, no framework.

---

### 4.2 Navigation

**Style:** Fixed top bar, full-width, monospace. Minimal.

```
shanmuganand.m          about  experience  projects  skills  contact  [ dark ]
```

- `[ dark ]` / `[ light ]` toggle on far right — switches theme, persists to localStorage
- No hamburger menu on mobile — use a bottom drawer or a `[menu]` text toggle
- Active section highlighted with `>` prefix
- Scrollspy to update active nav item

---

### 4.3 About Section

**Anchor:** `#about`

**Content:**

```
> about_

Full-stack capable, frontend-obsessed engineer with 5+ years building
scalable UIs, design systems, and developer tooling.

Currently: Open to Senior Frontend / Staff roles
Previously: BigID, Full Creative
Location: Indianapolis, USA (U.S. Permanent Resident)
Languages: English, Tamil, Hindi, German (basic)
```

Short. Terminal-style. No paragraphs of fluff.

---

### 4.4 Experience Section

**Anchor:** `#experience`

Display as a vertical timeline — but styled like a terminal log, not a traditional resume timeline.

**Entry format:**

```
$ history --company="BigID"

  [Aug 2024 – Nov 2025]  Senior Software Engineer
  Chennai, India

  Built the AI Suggestions feature and Data-Driven Questions engine,
  shipped compliance tooling, and migrated CRA to Vite — cutting build
  time by 80%.
```

**Each company is a "command" with a 1–2 line plain-English summary below it.** No bullets on the homepage. No expand/collapse accordion. Keep it scannable.

Companies to include:

1. **BigID** — Senior Software Engineer (Aug 2024 – Nov 2025)
2. **Full Creative** — Frontend Engineer (Mar 2021 – Jul 2024)
3. **Full Creative** — Junior Web Developer (Nov 2019 – Feb 2021)
4. **Doodleblue Innovations** — Intern (Sep–Oct 2018)

> Full bullet-point detail lives exclusively on `/experience`. The homepage just teases.

Section footer: `[ view full experience → ]` (links to `/experience`, styled in `--blue`)

---

### 4.5 Projects Section

**Anchor:** `#projects`

**Source:** GitHub repos only. No work experience items here. This section is purely personal/open-source projects pulled from your GitHub profile.

**Homepage:** Show 3 pinned/featured repos. User must curate these in GitHub (pin the right repos, write good READMEs).

**Card format:**

```
┌─────────────────────────────────────────┐
│ > repo-name                             │
│                                         │
│   Short description from GitHub.        │
│                                         │
│   Stack: React · TypeScript · Node.js  │
│   ★ 42  ·  🍴 8                         │
│                                         │
│   [ github ↗ ]   [ live demo ↗ ]       │
└─────────────────────────────────────────┘
```

Cards use ASCII-style borders. Hover state: border changes from `--border` to `--accent`.

> **Action required before launch:** Pin 3–6 repos on your GitHub profile that you want featured. Add a clear description and topic tags to each.

Section footer: `[ view all projects → ]` (links to `/projects`, styled in `--blue`)

---

### 4.6 Skills Section

**Anchor:** `#skills`

Render as a structured terminal output — NOT a tag cloud or progress bars (those are cringe).

```
$ skills --list

  FRONTEND
  ─────────────────────────────────────────
  React.js · TypeScript · JavaScript · Next.js
  HTML5 · CSS · SCSS · Tailwind · Webpack
  Performance Optimization · Accessibility (WCAG)

  UI / DESIGN
  ─────────────────────────────────────────
  Figma · Storybook · Design Systems

  TESTING
  ─────────────────────────────────────────
  Cypress · Jest · RTL · Chromatic

  BACKEND / INFRA
  ─────────────────────────────────────────
  Node.js · REST APIs · GraphQL · MongoDB
  Docker · Kubernetes · CI/CD · Vercel

  OTHER
  ─────────────────────────────────────────
  WebRTC · SEO · GenAI · Prompt Engineering
  State Management · Markdoc
```

> No `view all` CTA on this section — skills are fully displayed inline on the homepage.

---

### 4.7 Contact Section

**Anchor:** `#contact`

```
> contact_

  // email     msanand0110@gmail.com
  // phone      +1 (765) 356-5725
  // linkedin   linkedin ↗
  // github     github ↗
```

Simple links only — no form. Email uses `mailto:`, phone uses `tel:`. Clicking opens the user's default mail/phone app directly.

No backend, no third-party service, no complexity. Can add a form later if needed.

---

### 4.8 Footer

Terminal status bar at the bottom of every page — inspired directly by Sangeeth's site:

```
$ whoami → shanmuganand.m  //  status: ONLINE  //  uptime: [time on page]
```

- `status: ONLINE` is static — it's a static site, it's always up 💀
- `uptime` ticks up in seconds since page load via vanilla TS `setInterval`
- Sits flush at the bottom, full width, monospace — ties the CLI aesthetic together across all pages

---

## 5. Technical Architecture

### 5.1 Stack

| Layer      | Choice                            | Reason                                                      |
| ---------- | --------------------------------- | ----------------------------------------------------------- |
| Framework  | Astro 4.x                         | Static-first, near-zero JS output, perfect for portfolios   |
| Scripting  | Vanilla TypeScript                | No framework overhead, Astro handles TS natively            |
| Styling    | Tailwind CSS v4                   | CSS-native design tokens, no config file needed             |
| Content    | Astro Content Collections + MDX   | Type-safe content management for experience & projects      |
| Validation | Zod                               | Schema validation for all content frontmatter               |
| Animations | Native CSS + IntersectionObserver | Zero bundle cost, no library dependency                     |
| Deployment | Cloudflare Pages                  | Global edge CDN, generous free tier, great for static Astro |
| Analytics  | Cloudflare Web Analytics          | Already included, zero extra setup, no cookies              |
| DNS        | Cloudflare (via Namespace domain) | Point Namespace nameservers to Cloudflare                   |

> **No React. No Framer Motion.** All interactivity (scrollspy, theme toggle, typewriter, contact form, scroll animations) handled via vanilla TypeScript in Astro `<script>` tags. This keeps the JS bundle near-zero and Lighthouse scores in the 95–100 range.

### 5.2 Tailwind v4 — CSS-Native Design Tokens

No `tailwind.config.ts` needed. All design tokens live in `src/styles/global.css`:

```css
@import "tailwindcss";

/* Tailwind v4 design tokens */
@theme {
  --font-family-mono: "JetBrains Mono", "IBM Plex Mono", monospace;
  --color-blue: #2b7fff;
}

/* Dark mode (default) */
:root {
  --color-bg: #0a0a0a;
  --color-surface: #111111;
  --color-border: #2a2a2a;
  --color-primary: #f0f0f0;
  --color-muted: #888888;
  --color-accent: #ffffff;
}

/* Light mode */
.light {
  --color-bg: #f5f5f5;
  --color-surface: #ebebeb;
  --color-border: #d0d0d0;
  --color-primary: #0a0a0a;
  --color-muted: #666666;
  --color-accent: #000000;
}
```

Theme toggle adds/removes `light` class on `<html>`. Components just use `bg-[var(--color-bg)]` etc — they never need to know which theme is active.

### 5.3 Astro Script Strategy

| Feature           | Implementation                                                            |
| ----------------- | ------------------------------------------------------------------------- |
| Typewriter (hero) | Vanilla TS in `<script>` on hero component                                |
| Theme toggle      | Vanilla TS, toggles `light` class on `<html>`, persists to `localStorage` |
| Scroll animations | `IntersectionObserver` in global `<script>`                               |
| Scrollspy (nav)   | `IntersectionObserver` in nav component `<script>`                        |

### 5.4 Project Structure

```
src/
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   └── ui/
│       ├── Card.astro
│       ├── Badge.astro
│       └── Section.astro
├── content/
│   ├── config.ts          ← Zod schemas
│   ├── experience/
│   │   ├── bigid.mdx
│   │   ├── full-creative-senior.mdx
│   │   ├── full-creative-junior.mdx
│   │   └── doodleblue.mdx
│   └── projects/
│       ├── project-one.mdx
│       ├── project-two.mdx
│       └── project-three.mdx
├── layouts/
│   └── Layout.astro       ← theme toggle, <head>, global scripts
├── pages/
│   ├── index.astro        ← homepage
│   ├── about/
│   │   └── index.astro
│   ├── experience/
│   │   └── index.astro
│   └── projects/
│       └── index.astro
├── styles/
│   └── global.css         ← Tailwind v4 + design tokens
└── utils/
    └── content.ts         ← helper fns for collection queries
public/
└── resume.pdf
```

> **Rule:** build `<Card>`, `<Section>`, `<Badge>` reusable components from day one — don't write one-off styles per section. abstract early.

### 5.5 Content Collections (MDX + Zod)

All dynamic content lives in `src/content/` as MDX files — not hardcoded in components. This means updating experience or projects requires zero component changes.

**Directory structure:**

```
src/
└── content/
    ├── config.ts         ← Zod schemas for all collections
    ├── experience/
    │   ├── bigid.mdx
    │   ├── full-creative-senior.mdx
    │   ├── full-creative-junior.mdx
    │   └── doodleblue.mdx
    └── projects/
        ├── project-one.mdx
        ├── project-two.mdx
        └── project-three.mdx
```

**`config.ts` — Zod schemas:**

```ts
import { defineCollection, z } from "astro:content";

const experience = defineCollection({
  schema: z.object({
    company: z.string(),
    role: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    summary: z.string(), // shown on homepage
    stack: z.array(z.string()),
    order: z.number(), // controls sort order
  }),
});

const projects = defineCollection({
  schema: z.object({
    name: z.string(),
    description: z.string(),
    stack: z.array(z.string()),
    github: z.string().url(),
    live: z.string().url().optional(),
    stars: z.number().optional(),
    forks: z.number().optional(),
    featured: z.boolean().default(false), // true = show on homepage
    order: z.number(),
  }),
});

export const collections = { experience, projects };
```

**Example MDX entry — `experience/bigid.mdx`:**

```mdx
---
company: BigID
role: Senior Software Engineer
location: Chennai, India
startDate: Aug 2024
endDate: Nov 2025
summary: Built the AI Suggestions feature and Data-Driven Questions engine, shipped a modular compliance framework, and migrated CRA to Vite — cutting build time by 80%.
stack: [React, TypeScript, Node.js, Cypress, Vite]
order: 1
---

## What I did

Full bullet-point detail here in MDX — rendered only on `/experience` page.

- Engineered AI Suggestions feature → +30% user efficiency, -20% task time
- Architected Data-Driven Questions engine → +25% insights speed
- Designed modular compliance framework → -60% manual effort
- Cypress E2E coverage 85–90% integrated into CI → -35% regressions
- CRA → Vite migration → -80% build time, 3× dev refresh, -20 vulnerabilities
```

**Homepage** queries only `summary` from frontmatter — no MDX body rendered. **`/experience` page** renders the full MDX body with all bullet points. Same file, two different views.

**Draft support:** add `draft: z.boolean().default(false)` to schema — filter drafts in production queries, show everything in dev.

**Draft support:**

```ts
// utils/content.ts
export async function getPublishedExperience() {
  return getCollection("experience", ({ data }) =>
    import.meta.env.PROD ? !data.draft : true,
  );
}
```

Shows all entries in dev, hides drafts in prod. Flip `draft: false` in frontmatter when ready to publish — no code changes needed.

**`getStaticPaths` for dynamic routes (`/projects/[slug]`):**

```ts
export async function getStaticPaths() {
  const projects = await getCollection("projects");
  return projects.map((project) => ({
    params: { slug: project.slug },
    props: { project },
  }));
}
```

> **Rule:** content editors (future you) should never touch a `.astro` component to update a job title or add a project. MDX files only.

No libraries for this — native `IntersectionObserver` API only. Keeps bundle lean.

**Global pattern:**

```ts
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target); // fire once
      }
    });
  },
  { threshold: 0.15 },
);
```

**Per-section animations:**

| Section    | Animation                                           |
| ---------- | --------------------------------------------------- |
| Hero       | Typewriter (JS) — no observer needed                |
| About      | Fade up + slight blur clear on enter                |
| Experience | Entries stagger in top-to-bottom (150ms delay each) |
| Projects   | Cards slide in from left, staggered                 |
| Skills     | Category groups fade in sequentially                |
| Contact    | Form fades up as a unit                             |

**CSS classes (driven by observer):**

```css
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}
.reveal.in-view {
  opacity: 1;
  transform: translateY(0);
}
```

Stagger via `animation-delay` set inline as a CSS custom property (`--delay: 150ms`) per child element.

> **Rule:** Animations should feel like terminal output loading — sequential, purposeful, not floaty.

- Lighthouse score: **95+** across all metrics (this is a frontend engineer's portfolio — it better be fast)
- LCP < 1.5s
- CLS = 0
- No layout shift on font load (use `font-display: swap` + preload)

### 5.4 SEO

- OG tags with custom preview image
- Structured data (JSON-LD Person schema)
- Sitemap via `@astrojs/sitemap`
- `robots.txt`

---

## 6. Responsive Behavior

| Breakpoint          | Behavior                                        |
| ------------------- | ----------------------------------------------- |
| Mobile (< 768px)    | Single column, stacked sections, simplified nav |
| Tablet (768–1024px) | Two-column skills, nav visible                  |
| Desktop (> 1024px)  | Full layout as designed                         |

Terminal aesthetic **must hold** across all breakpoints. No breaking the CLI illusion on mobile.

---

## 7. Content Checklist

Before launch, ensure the following are ready:

- [ ] Professional headshot (optional — CLI theme can skip this entirely)
- [ ] Resume PDF (downloadable)
- [ ] GitHub profile cleaned up (pinned repos, READMEs)
- [ ] LinkedIn URL confirmed
- [ ] Project descriptions written (case study format)
- [ ] Domain acquired (e.g., `shanmuganand.dev` or `msanand.dev`)

---

## 8. Phased Delivery

| Phase  | Scope                                | ETA    |
| ------ | ------------------------------------ | ------ |
| **P0** | Hero + Nav + About + Experience      | Week 1 |
| **P1** | Skills + Contact + Deploy            | Week 2 |
| **P2** | Projects section + case studies      | Week 3 |
| **P3** | Blog listing + individual post pages | Week 4 |
| **P4** | Polish — animations, perf, SEO       | Week 5 |

---

## 9. Non-Goals

- No React or any UI framework — vanilla TS only
- No Framer Motion or animation libraries — native CSS + IntersectionObserver only
- No 3D / WebGL (keeps scope tight, keeps perf high)
- No CMS (static MDX files are fine for now)
- No GitHub API integration for now — manually curate project data (Phase 3 candidate)

---

_PRD generated for Shanmuganand M — Senior Frontend Engineer_  
_Stack: Astro + Vanilla TypeScript + Tailwind CSS v4 + MDX | Theme: Monochrome CLI | Hosted on Cloudflare Pages_
