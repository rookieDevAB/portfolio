# Abhay Soni — Interactive Brutalist Portfolio

A high-performance, responsive developer portfolio featuring a modern bold brutalist design, custom cursor tracking spotlights, letter scrambling text effects, typing animations, scroll reveals, and magnetic buttons.

---

## ⚡ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Library**: React 18+
- **Styling**: Vanilla CSS (Global Stylesheet)
- **Fonts**: Google Fonts (`Barlow`, `Barlow Condensed`, `IBM Plex Mono`) optimized natively via `next/font/google`
- **Icons**: Tabler Icons (`@tabler/icons-react`)
- **Package Manager**: npm

---

## 📁 Project Structure

```text
├── .agents/                    # AI Agent local workspace skills & metadata
├── src/
│   ├── app/
│   │   ├── globals.css         # Central styling & design system variables
│   │   ├── layout.js           # Root layout config & Google font imports
│   │   └── page.js             # Main landing page composition & reveal observer
│   └── components/
│       └── sections/
│           ├── Navbar.js       # Navigation header with logo hover scramble
│           ├── AboutSection.js # Spotlight tracking, headline scramble, counters, bio typing
│           ├── ProjectsSection.js # Selected work rows with hover marquee loops
│           ├── SkillsSection.js   # Technical skills grid & B.Tech education details
│           ├── ExperienceSection.js # Professional timeline & magnetic Resume CTA
│           └── Footer.js       # Footer copy & metadata
├── public/                     # Static files & assets
├── package.json                # Project dependencies and script runner configurations
└── jsconfig.json               # Path aliases config (@/*)
```

---

## 🎨 Interactive Animations & Core Custom Effects

### 1. Interactive Spotlight Grid
- A cursor-following radial gold gradient spotlight overlays the dark sections (`#about`, `#contact`) on desktop mice movement.

### 2. Scramble Text Hover Effect
- Moving the mouse cursor over the logo or hero title runs a letter scrambling effect, randomizing characters before settling back into the original spelling.

### 3. Typing Bio Simulation
- Types out the about bio character-by-character with a realistic speed variation and a blinking cursor.

### 4. Stats Counter Intersection Observer
- Scopes statistics box numbers (`3+ AI Projects`, `9.0 SGPA`, etc.) and counts them up dynamically once they enter the user's viewport.

### 5. Hover Marquee Slide
- Hovering over a project row slides in a colored panel featuring an infinite-scrolling marquee tag text loop.

### 6. Magnetic Resume Button
- Moving the mouse near the Resume CTA translates the button offset dynamically to pull the cursor's focus.

---

## 🚀 Getting Started

### Installation
Clone the repository, navigate into the project folder, and install all dependencies:
```bash
npm install
```

### Run Local Development Server
Start the Next.js local compilation server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### Build for Production
Compile the optimized production bundles:
```bash
npm run build
```
The static files will be exported to the `.next/` directory ready for staging deployment.

---

## Changelog

- 2026-07-04 — Responsive and layout improvements: updated `src/app/globals.css` to improve mobile responsiveness, fluid spacing, and typography across sections (About, Projects, Skills, Experience, Footer).
- 2026-07-04 — Project links and accessibility: added direct GitHub links and anchor wrappers in `src/components/sections/ProjectsSection.js` so each project row opens the corresponding repository in a new tab with proper `rel` attributes.
- 2026-07-04 — Minor accessibility and layout tweaks: improved flex/grid fallbacks, ensured wrap behavior on narrow viewports, and tuned spacing variables for consistent appearance.

### How to verify

1. Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

2. Open http://localhost:3000 and verify:
- Projects open in new tabs when clicked.
- Layout adapts correctly on mobile widths.

