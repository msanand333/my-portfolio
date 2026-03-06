# shanmuganand.dev Portfolio

## Agent Instructions

You are editing the personal portfolio of Shanmuganand M, a Senior Frontend Engineer. Follow these strict rules when modifying or adding to the codebase:

### 1. Technology Stack

- **Framework:** Astro 5.x (Static output mode)
- **Styling:** Vanilla CSS
- **Language:** Vanilla TypeScript + HTML/Astro. **NO React or other UI frameworks.**
- **Content:** MDX via Astro 5 Content Layer API.

### 2. Design System Constraints

This is a monochrome, CLI/terminal-themed portfolio.

- **Colors:** You may ONLY use the tokens defined in `src/styles/global.css`. The primary accent color is `#2b7fff` (blue). No other colors are permitted outside the monochrome scale.
- **Typography:** ONLY Monospace fonts (`JetBrains Mono` primary, `IBM Plex Mono` fallback). NEVER use sans-serif or serif web fonts.
- **UI Patterns:** Use the existing `<Card>`, `<Section>`, and `<Badge>` components.
- **Animations:** Use native CSS transitions/animations or `IntersectionObserver`. **DO NOT** install Framer Motion, GSAP, or any animation libraries. Respect `prefers-reduced-motion`.

### 3. File Structure & Content

- Content lives in `src/content/{experience,projects,blog}/`.
- Data layer config is at `src/content.config.ts`.
- Simple data (like skills) lives in `src/data/skills.ts`.
- When adding MDX content, always verify the Zod schema in `content.config.ts` to ensure required frontmatter fields are present.

### 4. Code Quality

- Prefer semantic HTML (`<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`).
- Keep lighthouse scores high: minimize client-side JavaScript. Only use JS for essential interactivity (theme toggle, mobile menu, scrollspy).
- All new components must support both `data-theme="dark"` and `data-theme="light"`.

### 5. Commands

- Run dev server: `pnpm dev`
- Build for production: `pnpm build`

### 6. Available Skills

Relevant AI agent skills are stored in `.agents/skills/` and should be consulted if modifying Astro 5 Content APIs.
