# Portfolio Visuals & Web3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a mainframe terminal hero, typing line, cursor glow, card tilt, tech-logo marquee, laptop+phone device mockups with auto-captured media, and a Web3 experiments card to the live portfolio.

**Architecture:** Each motion effect is a small component backed by two shared hooks (`usePrefersReducedMotion`, `useCanHover`) in `src/lib/motion.ts`, so every effect has one tested "hold still" path. Project media is produced by a Node capture script (Playwright + ffmpeg) into `public/media/<id>/` and referenced from `src/data/projects.ts`. Logos come from the `simple-icons` package (tree-shaken imports) plus the official Base mark bundled as an SVG file.

**Tech Stack:** existing (Vite, React 19, TS, Tailwind v4, Vitest) + `simple-icons` 16.x, `playwright` 1.64 (dev, capture only), system ffmpeg at `/opt/homebrew/bin/ffmpeg`.

**Spec:** `docs/superpowers/specs/2026-10-30-portfolio-visuals-design.md` (builds on `docs/superpowers/specs/2026-10-30-portfolio-design.md`)

## Global Constraints

- Under `prefers-reduced-motion: reduce`: terminal shows its final transcript statically; typing line shows its first phrase; glow is static; marquee and drift stop; tilt off; videos don't autoplay (poster shown).
- Pointer-only effects (tilt, glow following) are off when `(hover: hover)` doesn't match; the glow drifts instead.
- Animations use only CSS transform/opacity; at most one `requestAnimationFrame` loop (cursor glow), paused when `document.hidden`.
- Videos: muted, `playsInline`, `loop`, play only while on screen; each ≤ ~600 KB.
- No horizontal scroll at 360px. Beginner-readable code with short "why" comments. Content in `src/data/`.
- Web3 copy must not hype: no "launched", no prices/markets. Never use the Coinbase logo for Base.
- Token data (exact): RAR "RecklessAndRelentless" on Polygon `0x0259ddfBD48e65C22Ca365bc32AFF5B0a5fB9567` → `https://polygonscan.com/token/0x0259ddfBD48e65C22Ca365bc32AFF5B0a5fB9567`; LIL "LonelyInLorain" on Base `0xF3007d8719741Cc361Dc7571120c01CE207fC772` → `https://basescan.org/token/0xF3007d8719741Cc361Dc7571120c01CE207fC772`.

## Review Focus

1. **iPhone performance/battery:** glow loop must stop when the tab is hidden, and videos must pause offscreen. Test in Tasks 3 and 5.
2. **Reduced motion everywhere:** every new component has a reduced-motion test (Tasks 1–6).
3. **Touch devices:** no tilt, no follow-glow without hover; the tilt wrapper must not swallow taps on card links. Tests in Task 3.
4. **Missing media:** a project without `media` must still render its `image` (Web3 card, future projects before capture). Test in Task 4/5.
5. **Phone width:** the hero's two columns stack, and the terminal's long JCL lines wrap inside the window instead of overflowing at 360px. `whitespace-pre-wrap` + `break-all`; manual check in Task 7.

---

### Task 1: Motion hooks + mainframe terminal in a two-column hero

**Files:**
- Create: `src/lib/motion.ts`, `src/lib/motion.test.ts`, `src/components/Terminal.tsx`, `src/components/Terminal.test.tsx`, `src/data/terminal.ts`
- Modify: `src/components/Hero.tsx`, `src/components/Hero.test.tsx`, `src/components/Reveal.tsx` (reuse the hook)

**Interfaces:**
- Produces: `usePrefersReducedMotion(): boolean`, `useCanHover(): boolean` (both read `window.matchMedia`, safe when it's missing → `false`); `type TerminalLine = { text: string; tone: 'prompt' | 'input' | 'jcl' | 'output' | 'success'; typed?: boolean }`; `terminalScript: TerminalLine[]`; `Terminal()` default export.

- [ ] **Step 1: Failing tests.** motion.test: both hooks return `false` without `matchMedia`; return the mocked `matches`. Terminal.test: (a) with reduced motion, every `terminalScript` line's text is in the DOM immediately; (b) container has `role="img"`-free semantics: `aria-label` "Mainframe terminal demo" on a `figure`, and the animated text is `aria-hidden` while a visually-hidden full transcript exists (screen readers get it all at once); (c) with fake timers and motion allowed, after `vi.advanceTimersByTime(30000)` the text `MAXCC=0000` is present. Hero.test: existing tests still pass; add "renders the terminal" (`getByLabelText('Mainframe terminal demo')`).
- [ ] **Step 2:** `npm test` → new tests FAIL (modules missing).
- [ ] **Step 3:** Implement. `terminalScript` = the spec's exact 9 lines; only `submit 'MATT.JCL(HELLO)'` has `typed: true`. Typing 45 ms/char, 420 ms between output lines, 2.5 s pause then loop; timers cleared on unmount. Tone colors: prompt `text-neon-violet`, jcl `text-neon-sky`, success `text-green-400`, else `text-indigo-200`. Window: title bar dots + "z/OS · TSO", `font-mono text-xs sm:text-sm`, `whitespace-pre-wrap break-all`, fixed `min-h` so layout doesn't jump. Hero: `md:grid md:grid-cols-2` with intro left (avatar `size-24 md:size-28`), terminal right; stacked below `md`. Reveal switches to `usePrefersReducedMotion`.
- [ ] **Step 4:** `npm test` → PASS; `npm run build` → 0.
- [ ] **Step 5: Commit** `feat: add mainframe terminal to a two-column hero`.

### Task 2: Typing line under the tagline

**Files:** Create `src/components/TypingLine.tsx`, `src/components/TypingLine.test.tsx`; Modify `src/components/Hero.tsx`

**Interfaces:**
- Consumes: `usePrefersReducedMotion`
- Produces: `TypingLine({ phrases }: { phrases: string[] })`; Hero passes `['building React apps', 'writing COBOL & REXX', 'automating z/OS with Ansible', 'deploying smart contracts']`.

- [ ] **Step 1: Failing tests:** reduced motion → shows `> building React apps` fully, static; motion allowed + fake timers → after enough time the text contains `writing COBOL & REXX`; has `aria-live="off"` and a visually-hidden list of all phrases.
- [ ] **Step 2:** FAIL. **Step 3:** Implement (type 60 ms/char, hold 1.4 s, erase 30 ms/char, next phrase; blinking cursor span). **Step 4:** PASS + build.
- [ ] **Step 5: Commit** `feat: add typing line to hero`.

### Task 3: Cursor glow + card tilt

**Files:** Create `src/components/CursorGlow.tsx`, `src/components/CursorGlow.test.tsx`, `src/components/Tilt.tsx`, `src/components/Tilt.test.tsx`; Modify `src/App.tsx` (mount `CursorGlow` after `GlowBackground`), `src/components/ProjectCard.tsx` (wrap the article in `Tilt`)

**Interfaces:**
- Consumes: `usePrefersReducedMotion`, `useCanHover`
- Produces: `CursorGlow()`, `Tilt({ children, max = 6 }: { children: ReactNode; max?: number })`

- [ ] **Step 1: Failing tests.** CursorGlow: `aria-hidden`, `pointer-events-none`; reduced motion → has class `glow-static` and adds no `pointermove` listener (spy on `window.addEventListener`); canHover false + motion → class `glow-drift`; canHover true → a `pointermove` updates its `style.transform` (after a rAF flush: mock `requestAnimationFrame` to run immediately); when `document.hidden` is true no rAF is scheduled. Tilt: canHover false → no inline transform after a pointermove; canHover true → pointermove at the right edge sets `rotateY(` in style; pointerleave resets; a link inside stays clickable (`userEvent.click` fires its handler).
- [ ] **Step 2:** FAIL. **Step 3:** Implement. Glow: 480px radial gradient `rgba(59,130,246,0.18)`, `fixed` `-z-10`, moved via `translate3d` in a single rAF, eased toward the pointer. `glow-drift` = CSS keyframes in `index.css` (slow 20 s loop); `glow-static` = centered, no animation. Tilt: `perspective(800px) rotateX/rotateY` from pointer position, `transition-transform duration-200`, plus a neon edge highlight via `hover:shadow`.
- [ ] **Step 4:** PASS + build. **Step 5: Commit** `feat: add cursor glow and card tilt`.

### Task 4: Data model, Web3 card, skills

**Files:** Modify `src/data/types.ts`, `src/data/projects.ts`, `src/data/skills.ts`, `src/data/data.test.ts`, `src/components/ProjectCard.tsx`, `src/components/ProjectCard.test.tsx`; Create `public/images/web3-tokens.svg`

**Interfaces:**
- Produces:
  - `type ProjectMedia = { laptopVideo: string; laptopVideoMp4: string; laptopPoster: string; phone: string }` (root-relative paths)
  - `type ProjectLink = { label: string; href: string }`
  - `Project` gains `media?: ProjectMedia` and `links?: ProjectLink[]`. `image`/`imageAlt` stay required (fallback + Web3 graphic).
  - ProjectCard renders `links` (each new-tab, `externalLink`) after Live/Code.

- [ ] **Step 1: Failing tests.** data.test: `every link and media path is valid` (links https; media files exist in `public/`); `the Web3 card lists both token explorers` (project `web3-tokens` links equal the two exact explorer URLs from Global Constraints, labels `RAR on PolygonScan →` / `LIL on BaseScan →`); `skills include Solidity, EVM, Polygon, Base`. ProjectCard.test: renders each `links` entry as a new-tab link; a project with `media` undefined still shows its `image` (Review Focus 4). Replace the 3:1 aspect test with: when `media` is absent, the image is shown inside a 3:1 frame (`aspect-[3/1]`).
- [ ] **Step 2:** FAIL.
- [ ] **Step 3:** Implement. Web3 entry (second in list): title `Web3 experiments: ERC-20 tokens`; description `Personal experiments deploying my own ERC-20 tokens to two EVM networks, RecklessAndRelentless (RAR) on Polygon and LonelyInLorain (LIL) on Base, to learn the contract deploy flow end to end.`; tech `['Solidity', 'ERC-20', 'Polygon', 'Base', 'EVM']`; image `/images/web3-tokens.svg` (hand-drawn neon SVG: two glowing coins labelled RAR and LIL with "POLYGON" / "BASE" captions on `#0a0b1e`, 1500×500); imageAlt `Two neon token coins labelled RAR and LIL`. Append skills `Solidity`, `EVM`, `Polygon`, `Base`.
- [ ] **Step 4:** PASS + build. **Step 5: Commit** `feat: add Web3 experiments card and on-chain skills`.

### Task 5: Capture script + laptop/phone device mockup

**Files:** Create `scripts/capture.mjs`, `src/components/DeviceMockup.tsx`, `src/components/DeviceMockup.test.tsx`, `public/media/tempr-esports/*` (generated); Modify `package.json` (`"capture": "node scripts/capture.mjs"`, devDep `playwright`), `src/components/ProjectCard.tsx`, `src/data/projects.ts` (TEMPR `media` + `image` → its laptop poster), `.gitignore` (nothing new expected)

**Interfaces:**
- Consumes: `ProjectMedia`, `usePrefersReducedMotion`
- Produces: `DeviceMockup({ media, alt }: { media: ProjectMedia; alt: string })`; CLI `npm run capture -- <id> <url>` writing `public/media/<id>/{laptop.webm,laptop.mp4,laptop.jpg,phone.jpg}`.

- [ ] **Step 1: Failing tests** (DeviceMockup): renders a `video` with `muted`, `playsInline`, `loop`, sources webm then mp4, `poster` = laptopPoster; phone `img` with alt containing `on a phone`; with reduced motion → no `autoPlay` and `play()` never called; with motion → mock IntersectionObserver: entering calls `play()`, leaving calls `pause()` (spy on `HTMLMediaElement.prototype.play/pause`) (Review Focus 1).
- [ ] **Step 2:** FAIL.
- [ ] **Step 3:** Implement DeviceMockup: laptop = rounded dark bezel (`border-8 border-slate-800 rounded-t-xl`) on a thin base bar, screen `aspect-[16/10]` with the video `object-cover object-top`; phone = `w-[26%]` `rounded-[1.6rem] border-[5px] border-slate-800` with a notch dot, absolutely positioned bottom-right, overlapping; neon glow shadow. ProjectCard uses DeviceMockup when `project.media` exists, else the 3:1 image. Capture script (no TS import of data; args only): Playwright chromium → laptop context 1440×900 `recordVideo` 1440×900, wait for network idle, smooth-scroll to bottom over ~6 s with `mouse.wheel` steps, back to top; screenshot top as poster; phone context `devices['iPhone 15']` (390×844 @2x) screenshot. ffmpeg: video → scale 960 wide, cap 8 s, `libvpx-vp9 -crf 40 -b:v 0` webm and `libx264 -crf 30 -preset slow -movflags +faststart -an` mp4; poster/phone → JPEG q≈80 (phone resized to 390 wide). Print each output's size; fail with a clear message if ffmpeg is missing. Run it: `npm run capture -- tempr-esports https://0xmattyic333.github.io/wolfeepackk_temprgg/`; confirm both videos ≤ 600 KB (lower quality and rerun if not).
- [ ] **Step 4:** PASS + build. **Step 5: Commit** `feat: add device mockups with auto-captured project media`.

### Task 6: Tech logo marquee

**Files:** Create `src/data/logos.ts`, `src/components/LogoMarquee.tsx`, `src/components/LogoMarquee.test.tsx`, `public/images/logos/base.svg` (official `logo/Basemark/Digital/Base_basemark_white.svg` from github.com/base/brand-kit); Modify `src/components/About.tsx`, `src/index.css` (marquee keyframes), `package.json` (dep `simple-icons`)

**Interfaces:**
- Produces: `type Logo = { name: string; path?: string; src?: string; color: string }` (`path` = simple-icons SVG path, `src` = file); `logos: Logo[]` in order React, TypeScript, Tailwind CSS, Vite, JavaScript, Git, Python, Docker, Ansible, IBM, Solidity, Ethereum, Polygon, Base; `LogoMarquee()`.

- [ ] **Step 1: Failing tests:** every logo name is reachable by accessible name exactly once (visually duplicated track is `aria-hidden`); Base uses `src` `/images/logos/base.svg` and that file exists; reduced motion → track lacks the `animate-marquee` class; the strip is wrapped so it can't widen the page (`overflow-hidden` on the outer element).
- [ ] **Step 2:** FAIL. **Step 3:** Implement with named imports (`siReact`, `siTypescript`, …) so only used icons ship; icons rendered white-ish at 70% opacity, brand color on hover; CSS `@keyframes marquee { to { transform: translateX(-50%) } }` 40 s linear infinite, paused on hover; edge fade via mask-image. Place in About above the skill tags.
- [ ] **Step 4:** PASS + build. **Step 5: Commit** `feat: add tech logo marquee`.

### Task 7: Docs, verification, deploy

**Files:** Modify `README.md` (Add a project → 4 steps incl. `npm run capture -- <id> <url>`; mention motion components and reduced-motion behaviour; folder map adds `src/lib/`, `scripts/`, `public/media/`)

- [ ] **Step 1:** Update README.
- [ ] **Step 2: Verify:** `npm test` all pass; `npm run build` 0; report gzip JS size vs before (was ~69 KB); `npm run preview` and headless-Chrome screenshots at 1280 and in a 360px iframe, with and without `--force-prefers-reduced-motion`: hero two columns at 1280 / stacked at 360, terminal text wraps inside its window, no horizontal overflow, device mockup + Web3 card visible, marquee clipped.
- [ ] **Step 3: Commit** `docs: explain motion components and capture workflow`.
- [ ] **Step 4:** Final whole-branch review, fix pass, then merge to `main`, push, watch the Pages run, confirm the live site serves the new bundle.
