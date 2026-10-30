# Developer Portfolio: Design

**Date:** 2026-10-30
**Owner:** Matthew (0xmattyic333)
**Location:** `/Volumes/DevDrv/site` (to become a git repo, published via GitHub Pages)

## Intent and why

A personal developer portfolio, hosted free on GitHub Pages, so that **potential clients** and **fellow developers** can see Matthew's work and get in touch with him.

His positioning hook: **modern web development + IBM Z / mainframe skills** ("I build for the web, and I speak mainframe."). That pairing is rare. It sets him apart from typical web-dev portfolios and should be visible right away.

A second goal, just as important: **Matthew is learning React, TypeScript and Tailwind by building this.** The codebase must be easy for a beginner to read, follow, and extend. Teaching value matters more than cleverness.

The site will grow: he'll add projects as he builds them, so adding a project must be trivial.

## Goals

- One scrolling page that makes his work, credentials, and contact options obvious within seconds.
- A dark neon look that matches the avatar he uses across his socials, so the brand is consistent.
- Credibility: projects link to live sites and code; badges link to Credly for verification.
- Adding a project = adding one entry to a typed data file, then pushing.
- Automated deploy: push to `main` → GitHub Actions builds → GitHub Pages serves it.
- A codebase and README that teach how React + TypeScript + Tailwind + Vite fit together.

## Non-goals

- No blog, CMS, backend, contact form, or server-side anything (GitHub Pages is static only).
- No light/dark toggle: one dark theme, done well.
- No multi-page routing for now (single page with anchor links).

## Anti-goals (failure even if it "works")

- Looks plain or templated (Matthew explicitly rejected the plain version).
- Code that's too clever or abstracted for a beginner to follow and modify.
- Broken or ugly on phones.
- Adding a project requires touching component code.

## Decided (as Matthew decided it)

- **Stack:** React + TypeScript + Tailwind CSS, built with Vite, hosted on GitHub Pages. Chosen for job-market demand; also builds on his prior React + Vite project.
- **Visual direction:** "Dark neon" (mockup D). Deep navy background (~`#0a0b1e`), blurred blue and violet glow blobs, avatar with a glowing blue ring, gradient headline text (blue `#60a5fa` → violet `#a78bfa`), glowing primary button, translucent dark cards with faint blue/violet borders. Colors are drawn from his avatar.
- **Handle shown in top bar:** `0xmattyic333`. Name in hero: "Matthew".
- **Avatar image:** `/Users/0xmattyic333/Downloads/ChatGPT Image Jan 31, 2026, 08_06_18 AM.png` (1024×1024 anime-style portrait, headset, blue/purple neon). Use it as the hero avatar and favicon/social image; resize/optimize for web.
- **Sections, in order** (sticky top nav with anchor links to each):
  1. **Hero:** avatar, eyebrow "WEB DEV · IBM Z", "Hi, I'm Matthew.", gradient tagline "I build for the web, and I speak mainframe.", buttons **See my work** (→ Projects) and **Get in touch** (→ Contact).
  2. **Projects:** grid of cards (image, title, short description, tech tags, Live / Code links), rendered from a data file.
  3. **Certifications:** IBM badges with image, name, skills, "Verify on Credly" link.
  4. **About + skills:** short paragraph + skill tags mixing web and mainframe skills.
  5. **Contact:** GitHub, Discord, Email buttons.
- **Repo name `0xmattyic333.github.io`** (confirmed by Matthew), so the site lives at `https://0xmattyic333.github.io/` (root URL, cleanest for a portfolio). Vite `base` stays `/`; Open Graph/Twitter URLs are absolute under that domain. Checked 2026-10-30: no repo with that name exists yet, so nothing to migrate. Existing project sites like `/wolfeepackk_temprgg/` keep working alongside it.
- **Contact details:**
  - GitHub: `https://github.com/0xmattyic333`
  - Discord: `https://discord.com/users/1429664465091297310`
  - Email: `0xmattyic333@gmail.com` (mailto link)

## Content

**Project 1: TEMPR Esports: WolfeePackk** (placeholder; more to come)
- Live: https://0xmattyic333.github.io/wolfeepackk_temprgg/
- Code: https://github.com/0xmattyic333/wolfeepackk_temprgg (verified public repo)
- Description: Official site for an esports team and streamer: live streams, team roster, weekly stream schedule, YouTube content, merch, and Discord.
- Tech: React, Vite, GitHub Pages, GoatCounter analytics, Open Graph social previews.
- Image: its OG banner, `https://0xmattyic333.github.io/wolfeepackk_temprgg/tempr-banner.png` (download into the repo, don't hotlink).

**Badge 1: IBM Z Xplore – Concepts** (issued by IBM)
- Credly: https://www.credly.com/badges/ec0ccf1b-09aa-4bd9-b675-55939a8fdb3e/public_url
- Image: https://images.credly.com/images/0f3e4162-ab6b-457c-8c0d-835a14680666/linkedin_thumb_image.png
- Skills: data sets, JCL, z/OS commands, USS scripting, Python, IBM Z Open Automation Utilities.

**Badge 2: IBM Z Xplore – Advanced** (issued by IBM)
- Credly: https://www.credly.com/badges/493849b8-9eff-44a1-b8fb-5f0c9902b1e6/public_url
- Image: https://images.credly.com/images/9dde9b48-6cec-4bc4-ab33-ffeac5c681c3/linkedin_thumb_image.png
- Skills: REXX, COBOL, VSAM, TSO, Ansible, Zowe, Docker.

Download badge images into the repo rather than hotlinking.

**Skill tags (initial):** React, TypeScript, Tailwind CSS, Vite, JavaScript, HTML/CSS, Git/GitHub, COBOL, REXX, JCL, VSAM, TSO, USS, Python, Ansible, Zowe, Docker.

## Constraints

- Static output only; must work on GitHub Pages.
- Accessible basics: semantic HTML, alt text, sufficient contrast on the dark background, keyboard-focus styles, respect `prefers-reduced-motion` for any animation.
- Responsive down to ~360px phone width; no horizontal scroll.
- Good link-sharing previews (title, description, Open Graph/Twitter image).

## Calls I made (Claude), for Matthew to check

- **About paragraph:** I'll draft a placeholder in his voice; he edits it.
- **Data-driven content:** projects, badges, skills and contact links live in typed data files (e.g. `src/data/*.ts`) with a TypeScript type for each, so the compiler catches a missing field when he adds a project.
- **Learning aids:** short "why" comments at key spots (not on every line), plus a README section: "How this site works", "Add a project in 3 steps", "How deploy works".
- **Light motion:** subtle fade/slide-in on scroll and a soft glow on hover, disabled under reduced-motion.
- **Analytics:** none for now (he used GoatCounter before; easy to add later).
- **Footer:** small line with © year and "Built with React, TypeScript & Tailwind."

## Next project (separate, after this ships)

Polish Matthew's GitHub profile so it matches the portfolio: a profile README (`0xmattyic333/0xmattyic333` repo) in the dark neon style with avatar, hook, and link to the portfolio; curated pinned repos; clear descriptions/READMEs on pinned repos (starting with TEMPR). Brainstormed separately.

## Left to the builder

- Exact folder structure, component split, Tailwind config details, font choice (a clean modern sans; optionally a monospace accent for the "IBM Z" touches), icon set, and the GitHub Actions workflow specifics, all within the constraints above and keeping the beginner-readability goal first.
