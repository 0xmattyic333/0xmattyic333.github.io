# Developer Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Matthew's single-page dark-neon developer portfolio and deploy it to https://0xmattyic333.github.io/ via GitHub Actions.

**Architecture:** Vite + React + TypeScript single-page app. All content (projects, badges, skills, contact links) lives in typed data files under `src/data/`; one component per page section under `src/components/`, rendered in order by `App.tsx`. Tailwind CSS v4 via its Vite plugin, theme colors defined once in `src/index.css`. Images are local files in `public/`.

**Tech Stack:** Node 26, Vite (latest `create-vite` react-ts template), React, TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), Vitest + @testing-library/react + jsdom, GitHub Actions (`actions/deploy-pages`).

**Spec:** `docs/superpowers/specs/2026-10-30-portfolio-design.md`

## Global Constraints

- Beginner readability first: plain function components, no state libraries, no routing library, no CSS-in-JS. Short "why" comments at key spots only.
- Static output only; Vite `base: '/'`. Site URL: `https://0xmattyic333.github.io/`.
- One dark theme, no toggle. Colors: background `#0a0b1e`, accent blue `#3b82f6`, gradient `#60a5fa` → `#a78bfa`, glow blobs `#2563eb` / `#7c3aed`, muted text `#94a3b8`.
- Top bar handle: `0xmattyic333`. Hero: eyebrow `WEB DEV · IBM Z`, heading `Hi, I'm Matthew.`, tagline `I build for the web, and I speak mainframe.`, buttons `See my work` → `#projects`, `Get in touch` → `#contact`.
- Section ids in order: `hero`, `projects`, `certifications`, `about`, `contact`.
- Contact: GitHub `https://github.com/0xmattyic333`, Discord `https://discord.com/users/1429664465091297310`, Email `mailto:0xmattyic333@gmail.com`.
- External links open in a new tab with `rel="noopener noreferrer"`; mailto does not.
- Every image has meaningful `alt`. Visible keyboard focus styles. All motion disabled under `prefers-reduced-motion: reduce`.
- No horizontal scroll at 360px width.
- No analytics.

## Review Focus

1. **Content hidden when animation can't run.** Reduced-motion users or a missing IntersectionObserver must still see every section. Test in Task 6 (`Reveal`).
2. **A project without a code link or live link.** A future project may be private or not deployed yet. The card should omit that link, not render a dead one. Test in Task 4.
3. **Long strings at phone width.** The email address, long badge names, and long skill tags must wrap rather than overflow. Handled with `break-words` / `flex-wrap`; checked manually at 360px in Task 7.
4. **Bad data entry when adding a project.** Duplicate ids or a non-https link should fail tests rather than ship. Test in Task 2.
5. **Keyboard-only navigation.** Nav links and buttons must show a visible focus ring. Test in Task 3 (focus class present on nav links).

---

### Task 1: Scaffold project, tooling, and git

**Files:**
- Create: Vite react-ts template files at repo root, `vite.config.ts`, `src/index.css`, `src/test/setup.ts`, `src/App.test.tsx`, `.gitignore` (template's, plus `.superpowers/` and `._*`)
- Modify: `src/App.tsx` (strip template content), delete `src/App.css`, `src/assets/react.svg`, `public/vite.svg`

**Interfaces:**
- Produces: `npm test` (vitest run), `npm run build`, `npm run dev`; `App` default export from `src/App.tsx`; Tailwind theme tokens `--color-ink`, `--color-neon`, `--color-neon-violet`, `--color-muted` usable as `bg-ink`, `text-neon`, etc.

- [ ] **Step 1:** `git init -b main` in `/Volumes/DevDrv/site`; scaffold with `npm create vite@latest scaffold -- --template react-ts` in the scratchpad dir, then copy its contents into the repo root (the repo root is not empty).
- [ ] **Step 2:** `npm install`, then `npm install -D tailwindcss @tailwindcss/vite vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event`.
- [ ] **Step 3:** `vite.config.ts`: plugins `[react(), tailwindcss()]`, `base: '/'`, `test: { environment: 'jsdom', setupFiles: './src/test/setup.ts', globals: true }`. Add `"types": ["vitest/globals", "@testing-library/jest-dom"]` to `tsconfig.app.json`. Add `"test": "vitest run"` script.
- [ ] **Step 4:** `src/index.css`: `@import "tailwindcss";` plus `@theme` with the Global Constraints colors (`--color-ink: #0a0b1e`, `--color-neon: #3b82f6`, `--color-neon-sky: #60a5fa`, `--color-neon-violet: #a78bfa`, `--color-muted: #94a3b8`), `html { scroll-behavior: smooth }` inside `@media (prefers-reduced-motion: no-preference)`, body `bg-ink text-slate-200`.
- [ ] **Step 5: Write failing test** `src/App.test.tsx`:

```tsx
it('renders the main landmark', () => {
  render(<App />)
  expect(screen.getByRole('main')).toBeInTheDocument()
})
```

- [ ] **Step 6:** Run `npm test` → FAIL (template has no `<main>`). Replace `App.tsx` with a component returning `<main />`. Run `npm test` → PASS. Run `npm run build` → exits 0.
- [ ] **Step 7: Commit** everything including `docs/` (spec + this plan): `git commit -m "chore: scaffold Vite + React + TS + Tailwind with Vitest"`.

### Task 2: Typed content data and local images

**Files:**
- Create: `src/data/types.ts`, `src/data/projects.ts`, `src/data/badges.ts`, `src/data/skills.ts`, `src/data/contact.ts`, `src/data/data.test.ts`
- Create (downloaded): `public/avatar.png` (spec avatar, resized to 512px with `sips -Z 512`), `public/images/tempr-banner.png`, `public/images/badge-z-xplore-concepts.png`, `public/images/badge-z-xplore-advanced.png` (URLs in the spec's Content section)

**Interfaces:**
- Produces:
  - `type Project = { id: string; title: string; description: string; tech: string[]; image: string; imageAlt: string; liveUrl?: string; codeUrl?: string }`
  - `type Badge = { id: string; name: string; issuer: string; image: string; skills: string[]; verifyUrl: string }`
  - `type ContactLink = { label: 'GitHub' | 'Discord' | 'Email'; href: string }`
  - `projects: Project[]`, `badges: Badge[]`, `skills: string[]`, `contactLinks: ContactLink[]` (named exports from their files)
  - Image paths are root-relative strings, e.g. `'/images/tempr-banner.png'`.

- [ ] **Step 1: Write failing tests** `src/data/data.test.ts`:
  - `project ids are unique` (Set size equals length)
  - `every project and badge URL is https` (liveUrl, codeUrl, verifyUrl when defined start with `https://`)
  - `every image path points into public/` (`fs.existsSync('public' + image)` for projects, badges)
  - `contact links match the spec` (`toEqual` the three exact hrefs from Global Constraints, in order GitHub, Discord, Email)
  - `the first project is TEMPR` (`projects[0].liveUrl === 'https://0xmattyic333.github.io/wolfeepackk_temprgg/'`)
- [ ] **Step 2:** `npm test` → FAIL (modules missing).
- [ ] **Step 3:** Download images; write `types.ts` with a top comment explaining that TypeScript types act as a checklist for new entries; fill the data files with the spec's Content section verbatim (TEMPR title `TEMPR Esports: WolfeePackk`; badge names `IBM Z Xplore – Concepts` / `IBM Z Xplore – Advanced`, issuer `IBM`; skill tags list). `projects.ts` gets a comment block "To add a project: copy an entry, edit it, drop its image in public/images/".
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5: Commit** `feat: add typed portfolio content and images`.

### Task 3: Page shell: background glows, sticky nav, footer, section wrapper

**Files:**
- Create: `src/components/Nav.tsx`, `src/components/Footer.tsx`, `src/components/GlowBackground.tsx`, `src/components/Section.tsx`, `src/components/Nav.test.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Produces: `Section({ id, title, children }: { id: string; title?: string; children: React.ReactNode })` renders `<section id={id} aria-labelledby>` with an `h2` when `title` is given; `navItems: { href: string; label: string }[]` exported from `Nav.tsx`; `focusRing` string constant exported from `src/components/styles.ts` (`'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-sky'`), used by every link/button in later tasks.

- [ ] **Step 1: Write failing tests** `Nav.test.tsx`:
  - `shows the handle` (`getByText('0xmattyic333')`)
  - `links to each section` (links named Projects, Certifications, About, Contact have hrefs `#projects`, `#certifications`, `#about`, `#contact`)
  - `nav links have a focus style` (each link's className contains `focus-visible:outline`)
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implement. Nav: `sticky top-0 z-10`, translucent `bg-ink/70 backdrop-blur`, bottom border `border-slate-400/15`; on narrow screens links wrap below handle (`flex-wrap`), no hamburger. GlowBackground: two `aria-hidden` fixed blurred circles (violet top-right opacity .45, blue left opacity .4, `blur-[90px]`, `pointer-events-none`). Footer: `© {new Date().getFullYear()} 0xmattyic333 · Built with React, TypeScript & Tailwind.` App: `GlowBackground`, `Nav`, `<main>`, `Footer`.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5: Commit** `feat: add page shell with sticky nav and glow background`.

### Task 4: Hero and Projects sections

**Files:**
- Create: `src/components/Hero.tsx`, `src/components/Projects.tsx`, `src/components/ProjectCard.tsx`, `src/components/Hero.test.tsx`, `src/components/ProjectCard.test.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `Section`, `focusRing`, `Project`, `projects`
- Produces: `Hero()`, `Projects({ items }: { items: Project[] })`, `ProjectCard({ project }: { project: Project })`

- [ ] **Step 1: Write failing tests:**
  - Hero: heading `Hi, I'm Matthew.` at level 1; text `I build for the web, and I speak mainframe.`; text `WEB DEV · IBM Z`; link `See my work` href `#projects`; link `Get in touch` href `#contact`; avatar img with alt containing `Matthew`.
  - ProjectCard: renders title, description, every tech tag; `Live site` link has `target="_blank"` and `rel="noopener noreferrer"`; **given a project with no `codeUrl`, there is no link named `Code`** (Review Focus 2); same for missing `liveUrl`.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implement per the dark neon mockup (`.superpowers/brainstorm/5558-1793336177/content/hero-avatar.html`, option D): avatar `rounded-full` with `ring-3 ring-neon` and a blue glow shadow; tagline is gradient text (`bg-gradient-to-r from-neon-sky to-neon-violet bg-clip-text text-transparent`); primary button `bg-neon` with glow shadow, secondary bordered. Hero stacks vertically below `sm`. Cards: `bg-slate-900/70 border border-neon-sky/25 rounded-xl`, hover glow, image `aspect-video object-cover`, grid `sm:grid-cols-2`.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5: Commit** `feat: add hero and data-driven project cards`.

### Task 5: Certifications, About, and Contact sections

**Files:**
- Create: `src/components/Certifications.tsx`, `src/components/About.tsx`, `src/components/Contact.tsx`, `src/components/Sections.test.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `Section`, `focusRing`, `badges`, `skills`, `contactLinks`
- Produces: `Certifications()`, `About()`, `Contact()`

- [ ] **Step 1: Write failing tests** `Sections.test.tsx`:
  - Certifications: both badge names render; each has a `Verify on Credly` link to its `verifyUrl` opening in a new tab; badge img alt equals `${name} badge`.
  - About: every entry of `skills` renders as text.
  - Contact: heading `Let's work together.`; links GitHub, Discord, Email with exact hrefs; Email link has no `target` attribute; email address text `0xmattyic333@gmail.com` is visible.
  - App: sections appear in DOM order `hero, projects, certifications, about, contact` (query `section[id]`).
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implement. About placeholder copy (Matthew edits later; mark with `{/* TODO(Matthew): make this yours */}`): "I'm Matthew, a developer who builds fast, modern websites with React and TypeScript, and who also works on IBM Z mainframes: COBOL, REXX, JCL, and automation with Ansible and Zowe. I like taking an idea from blank page to live site, and I'm always learning something new." Skill tags `flex flex-wrap` pills. Contact email shown with `break-all` (Review Focus 3).
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5: Commit** `feat: add certifications, about, and contact sections`.

### Task 6: Scroll reveal motion and page metadata

**Files:**
- Create: `src/components/Reveal.tsx`, `src/components/Reveal.test.tsx`, `public/favicon.png` (avatar at 64px), `public/og-image.png` (avatar 1024px copy)
- Modify: `src/components/Section.tsx` (wrap children in `Reveal`), `index.html`

**Interfaces:**
- Produces: `Reveal({ children }: { children: React.ReactNode })`

- [ ] **Step 1: Write failing tests** `Reveal.test.tsx` (Review Focus 1):
  - `content is visible immediately when reduced motion is preferred` (mock `matchMedia` → matches true; child has no `opacity-0` class)
  - `content is visible when IntersectionObserver is unavailable` (delete `window.IntersectionObserver`; child not `opacity-0`)
  - `content starts hidden then shows on intersect` (mock IO, trigger entry `isIntersecting: true` → class switches to visible)
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implement with `useRef` + `useEffect` + one `useState(visible)`; initial `visible` is true when reduced motion or no IO. Transition `transition duration-700 opacity-0 translate-y-4` → `opacity-100 translate-y-0`; disconnect after first reveal. `index.html`: `<title>0xmattyic333 · Web Developer & IBM Z</title>`, description `Matthew (0xmattyic333): modern web development with React and TypeScript, plus IBM Z mainframe skills. Projects, certifications, and contact.`, `theme-color #0a0b1e`, favicon + apple-touch-icon `/favicon.png`, canonical and `og:url` `https://0xmattyic333.github.io/`, `og:image`/`twitter:image` `https://0xmattyic333.github.io/og-image.png`, `twitter:card summary_large_image`.
- [ ] **Step 4:** `npm test` → PASS; `npm run build` → 0.
- [ ] **Step 5: Commit** `feat: add accessible scroll reveal and social metadata`.

### Task 7: Deploy workflow, teaching README, and final verification

**Files:**
- Create: `.github/workflows/deploy.yml`, `README.md` (replace template's)

**Interfaces:**
- Consumes: `npm ci`, `npm test`, `npm run build` → `dist/`

- [ ] **Step 1:** `deploy.yml`: on push to `main` + `workflow_dispatch`; permissions `contents: read, pages: write, id-token: write`; concurrency group `pages`; job `build`: checkout, `actions/setup-node` (node 22 LTS or newer, cache npm), `npm ci`, `npm test`, `npm run build`, `actions/upload-pages-artifact` with `path: dist`; job `deploy` needs build, `actions/deploy-pages`. Use the current major versions of each action. Commented line by line (a learning file).
- [ ] **Step 2:** README sections: what this is + live link; "How this site works" (Vite → React components → Tailwind classes → TypeScript types, with the folder map); "Add a project in 3 steps"; "Run it locally" (`npm install`, `npm run dev`, `npm test`); "How deploy works"; "Edit the About text".
- [ ] **Step 3: Verify:** `npm test` all pass; `npm run build` 0; `npm run preview` then in Chrome check at 1280px and 360px: no horizontal scroll (`document.documentElement.scrollWidth <= innerWidth`), all five sections visible, Tab moves through nav with visible focus ring, avatar and badge images load.
- [ ] **Step 4: Commit** `ci: deploy to GitHub Pages; docs: teaching README`.
- [ ] **Step 5: Publish (ask Matthew first; outward-facing):** `gh repo create 0xmattyic333/0xmattyic333.github.io --public --source . --push`; `gh api -X POST repos/0xmattyic333/0xmattyic333.github.io/pages -f build_type=workflow`; watch `gh run watch`; confirm `curl -sI https://0xmattyic333.github.io/` returns 200.
