# Abhay Soni — Interactive Grotesque Portfolio

A high-performance, fully fluid developer portfolio with a bold grotesque design language: cursor-tracking spotlights, letter-scramble text, a typing bio, animated counters, hover marquees, magnetic buttons, GSAP scroll-driven reveals, and Lenis smooth scrolling.

---

## ⚡ Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Library**: React 19
- **Styling**: Vanilla CSS — a single fluid global stylesheet (zero media queries; `clamp()` + viewport units throughout)
- **Fonts**: Google Fonts via `next/font/google`
  - `Bricolage Grotesque` — display / headlines
  - `Space Grotesk` — body / UI
  - `Space Mono` — labels / metadata
- **Animation**:
  - `gsap` + `ScrollTrigger` (`@gsap/react`) — scroll reveals & parallax
  - `animejs` (v4) — entrance & accent animations
  - `lenis` — smooth scrolling
- **Icons**: Tabler Icons (`@tabler/icons-react`)
- **Package Manager**: npm

---

## 📁 Project Structure

```text
├── src/
│   ├── app/
│   │   ├── globals.css         # Fluid design system & all styling (no media queries)
│   │   ├── layout.js           # Root layout, font loading, SEO metadata
│   │   └── page.js             # Page composition + GSAP scroll-reveal setup
│   └── components/
│       ├── SmoothScroll.js     # Lenis + GSAP ticker integration (client)
│       └── sections/
│           ├── Navbar.js           # Nav with logo hover scramble + entrance
│           ├── AboutSection.js     # Spotlight, headline scramble, counters, typing bio
│           ├── ProjectsSection.js  # Selected work rows with hover marquee reveals
│           ├── SkillsSection.js    # Technical skills grid & education details
│           ├── ExperienceSection.js# Timeline + magnetic Resume CTA (view & download)
│           └── Footer.js           # Footer copy & metadata
├── public/                     # Static assets (resume.pdf, icons)
├── package.json
└── jsconfig.json               # Path aliases config (@/*)
```

---

## 🎨 Design & Interaction

- **Fully fluid responsiveness** — every size scales with the viewport via `clamp()` and viewport units. There is not a single `@media` breakpoint; the layout reflows by content using intrinsic CSS (auto-fit grids, flex wrapping).
- **One section per screen** — each section fills at least the viewport height (`min-height: 100svh`) and fills its space with content rather than centered whitespace.
- **Interactive spotlight** — a cursor-following radial gradient over the dark sections.
- **Scramble text** — hovering the logo or hero headline randomizes characters before resolving.
- **Typing bio** — the about bio types in character-by-character with a blinking cursor.
- **Animated counters** — stat numbers count up when scrolled into view.
- **Hover marquee reveals** — hovering a project row slides in a colored panel with an infinite-scrolling marquee; the row opens the matching GitHub repository.
- **Magnetic Resume CTA** — the Resume button follows the cursor; the résumé can be **viewed** in-browser and **downloaded** as a PDF.
- **Scroll-driven motion** — GSAP `ScrollTrigger` reveals and parallax, layered with `anime.js` entrance accents, over `lenis` smooth scrolling.
- **Accessibility** — semantic landmarks, a skip link, visible focus states, and full `prefers-reduced-motion` support (all motion is disabled when the user requests it).

---

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### Build for Production
```bash
npm run build
```

---

## Changelog

- 2026-07-11 — Typographic Footer Revamp & Scroll Refactoring:
  - Footer Revamp: Upgraded the footer to a three-column editorial layout grid with direct navigation anchors, social links, and an integrated Resume action.
  - Giant Display CTA: Implemented a massive typographic "LET'S BUILD" scroll-reveal slide-up title with desaturated orange colors and glowing hover highlights.
  - Architecture Polish: Migrated from global DOM reveals to scoped, component-level React states (`isRevealed`) to ensure absolute styling consistency during React re-renders.
  - Touch Scroll Optimization: Disabled Lenis smooth scrolling on mobile/tablet viewports (< 1024px) to prevent scroll clashes with mobile native touch inertia.
  - Ngrok Hydration Resolution: Documented Next.js dev server WebSocket/HMR limitations over ngrok and set standard production build pipelines (`npm run build && npm run start`) for external tunnel previews.
- 2026-07-05 — Visual & Accessibility Polish:
  - Scroll Polish: Fixed Lenis scroll jitter by disabling internal auto RAF (`autoRaf: false`) and aligning with GSAP's ticker loop.
  - Scroll Polish: Changed root `scroll-behavior` to `auto` to prevent browser scroll collision with Lenis, adding a `<noscript>` native fallback.
  - Reveal Transitions: Migrated GSAP batch inline animations to a class addition model (`.visible`) with CSS transitions to avoid conflicts with React state re-renders (e.g. typing bio updates).
  - Text Parallax: Applied `display: inline-block` and hardware acceleration hints to parallax headings.
  - Scramble Polish: Resolved character indexing offsets and `undefined` rendering in the About headline scramble animation.
  - Motion Accessibility: Added `prefers-reduced-motion` checks to bypass the magnetic Resume button hover-tracking coordinates.
  - Color Accessibility: Adjusted metadata, subtitle, and list item colors in Projects and Experience sections to satisfy WCAG AA contrast ratio guidelines (>4.5:1).
  - Keyboard Accessibility: Extended project row reveals and marquees to trigger on keyboard focus (`:focus-visible`).
  - Transition Legibility: Added a `0.3s` opacity transition delay on project rows hover-out to prevent text overlapping the sliding colored marquee panel.
  - Screen Reader Access: Marked the visual typing bio `aria-hidden="true"` and added a static, hidden `.sr-only` biography block to prevent announce disruptions.
- 2026-07-05 — Motion layer: added `lenis` smooth scrolling and migrated scroll reveals to GSAP `ScrollTrigger`, with `anime.js` entrance accents. All motion respects `prefers-reduced-motion`.
- 2026-07-05 — Accessibility & SEO: added `<main>` landmark, a skip link, visible focus styles, and OpenGraph/Twitter metadata.
- 2026-07-05 — Typography & layout: new type system (`Bricolage Grotesque` + `Space Grotesk` + `Space Mono`), fixed vertical rhythm so each section fills the viewport, raised sub-legible font sizes, and fixed contrast on muted text.
- 2026-07-05 — Projects: fixed the hover reveal so the static row content no longer collides with the marquee.
- 2026-07-05 — Experience: wired the Resume button to view and download `public/resume.pdf`.
- 2026-07-04 — Responsive rewrite of `globals.css` for fully fluid spacing and typography across all sections.
- 2026-07-04 — Added direct GitHub links / anchor wrappers to project rows (open in a new tab with proper `rel`).
