# my-portfolio

> Personal portfolio of **Shanmuganand M** — Senior Frontend Engineer.  
> Built with a CLI/terminal aesthetic using Astro 5, MDX, and vanilla CSS.

## 🛠 Tech Stack

| Technology                     | Purpose                                         |
| :----------------------------- | :---------------------------------------------- |
| [Astro 5](https://astro.build) | Static site framework                           |
| Vanilla CSS                    | Styling (component-scoped `<style>` blocks)     |
| MDX                            | Rich content for experience, projects, and blog |
| TypeScript                     | Type-safe utilities & content config            |
| JetBrains Mono                 | Monospace typeface                              |
| Cloudflare Pages               | Hosting & deployment                            |

## 📁 Project Structure

```
my-portfolio/
├── public/            # Static assets (avatar.svg, robots.txt)
├── src/
│   ├── components/    # Reusable Astro components (Header, Footer, Card, Badge, Section)
│   ├── content/       # MDX content collections (experience, projects, blog)
│   ├── data/          # Static data files (skills.ts)
│   ├── layouts/       # Base page layout (Layout.astro)
│   ├── pages/         # All routes (index, about, experience, projects, blog)
│   ├── styles/        # Global CSS (design tokens, animations)
│   └── utils/         # Content query utilities
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 🧞 Commands

All commands are run from the root of the project:

| Command        | Action                                            |
| :------------- | :------------------------------------------------ |
| `pnpm install` | Install dependencies                              |
| `pnpm dev`     | Start local dev server at `localhost:4321`        |
| `pnpm build`   | Type-check and build production site to `./dist/` |
| `pnpm preview` | Preview the production build locally              |

## ✨ Features

- **Terminal / CLI aesthetic** — monospace fonts, scanline overlay, `>` active indicators
- **Dark / Light theme** — system-aware toggle with no flash on load
- **Content Layer** — experience, projects, and blog powered by MDX collections
- **Scroll animations** — fade-in and slide-left via `IntersectionObserver`
- **Fully static** — zero JavaScript frameworks, fast Core Web Vitals
