# Portfolio Visuals & Web3: Design

**Date:** 2026-10-30
**Owner:** Matthew (0xmattyic333)
**Builds on:** `docs/superpowers/specs/2026-10-30-portfolio-design.md` (all its constraints still apply)
**Repo:** `/Volumes/DevDrv/site` → https://0xmattyic333.github.io/

## Intent and why

Matthew looked at his live portfolio and found it "mainly text". A developer portfolio should *feel* built by a developer: motion, real visuals of the work, and devices (laptops and phones) showing it. He also has on-chain experience (ERC-20 tokens deployed on Polygon and Base) that the site doesn't mention yet. That experience strengthens the story: **web developer who speaks mainframe, and has shipped on-chain.**

The beginner-readability goal from the original spec still holds. Matthew is learning React/TS/Tailwind from this codebase.

## Goals

1. **Mainframe terminal in the hero (signature piece).** The hero becomes two columns from `md` up: intro on the left (smaller avatar, ~88–112px), a glowing terminal window on the right. The terminal types and "runs" a JCL job, then loops. On phones it stacks below the intro.
2. **Typing line** under the tagline, cycling: "building React apps", "writing COBOL & REXX", "automating z/OS with Ansible", "deploying smart contracts". Matches the GitHub profile banner.
3. **Cursor glow.** A soft blue radial light follows the pointer over the page background. On touch devices (no hover), it slowly drifts on its own instead.
4. **3D tilt on project cards.** Cards lean toward the pointer (max ~6°) with a neon edge highlight. Pointer devices only.
5. **Tech logo marquee.** An infinitely scrolling strip of real tech logos (React, TypeScript, Tailwind, Vite, JavaScript, Git, Python, Docker, Ansible, IBM/Z, Solidity, Ethereum/EVM, Polygon, Base). Pauses on hover. Placed in the About section above the skill tags.
6. **Device mockups on project cards.** Each project card's image becomes a composed scene: a **laptop frame** showing the site at desktop width, with a **phone frame** (iPhone-like proportions) overlapping its bottom-right corner, showing the site at mobile width. The laptop screen shows a **short silent looping scroll-through video** of the site. The phone shows a still.
7. **Web3 experiments card.** A new card in the Projects grid:
   - Title: "Web3 experiments: ERC-20 tokens"
   - Honest framing: personal experiments deploying ERC-20 tokens to two EVM networks, done to learn the deploy flow; no production use case.
   - Tokens (verified on-chain 2026-10-30):
     - **RecklessAndRelentless (RAR)** on **Polygon**: `0x0259ddfBD48e65C22Ca365bc32AFF5B0a5fB9567` → `https://polygonscan.com/token/0x0259ddfBD48e65C22Ca365bc32AFF5B0a5fB9567`
     - **LonelyInLorain (LIL)** on **Base**: `0xF3007d8719741Cc361Dc7571120c01CE207fC772` → `https://basescan.org/token/0xF3007d8719741Cc361Dc7571120c01CE207fC772`
   - Tech tags: Solidity, ERC-20, Polygon, Base, EVM.
   - Visual: a neon-styled graphic (no live-site screenshot exists), e.g. two glowing token "coins" labelled RAR/LIL with network marks. Not a device mockup.
8. **Skills update:** add Solidity, EVM, Polygon, Base to `skills.ts`. Add a "deploying smart contracts" touch to the About text only if it reads naturally (Matthew approved the current About; keep edits minimal).
9. **Repeatable visuals.** One npm script (e.g. `npm run capture`) generates every project's device images and video from its URLs, so adding a project later means: add data entry, run the script, commit. Matthew does not record anything by hand.

## Terminal script (exact content)

```
READY
submit 'MATT.JCL(HELLO)'                         ← typed character by character
//HELLO    JOB  (ACCT),'MATTHEW',CLASS=A
//STEP1    EXEC PGM=HELLOCOB
//SYSOUT   DD   SYSOUT=*
IKJ56250I JOB HELLO(JOB04213) SUBMITTED
$HASP165 HELLO ENDED AT N1 - MAXCC=0000          ← MAXCC in green
HELLO FROM COBOL. I SPEAK MAINFRAME.             ← green
READY
```
Prompt `READY` in violet, JCL in blue, success in green, everything else soft indigo. Window title bar: three dots + "z/OS · TSO". Pause ~2.5s at the end, then clear and loop. Blinking block cursor.

## Non-goals

- No Solana content yet (future project once he has working code).
- No wallet connection, no live on-chain reads in the browser, no token prices.
- No 3D/WebGL libraries, no heavy animation frameworks.
- No sound.

## Anti-goals

- Janky or battery-hungry on his iPhone 17e. Animations must be cheap (CSS transforms/opacity, one `requestAnimationFrame` loop at most, paused when offscreen/tab hidden).
- Anything that hides content or breaks under `prefers-reduced-motion`: with reduced motion, the terminal shows its final state statically, typing shows the first line, marquee and drift stop, tilt is off, videos don't autoplay (show poster still).
- Making the Web3 work look bigger than it was (no "launched a token" hype, no price/market language).
- A big page-weight jump. Videos ≤ ~600 KB each, images optimized (WebP/AVIF or compressed JPEG), lazy-loaded below the fold.

## Constraints

- Everything from the original spec: static GitHub Pages, accessible, no horizontal scroll at 360px, beginner-readable code with "why" comments, data-driven content in `src/data/`.
- All motion lives in small, single-purpose components/hooks, each with tests for the reduced-motion and no-pointer paths.
- Third-party logos come from a vetted icon set (e.g. Simple Icons) bundled locally, not hotlinked.

## Calls I made (Claude), for Matthew to check

- **Terminal placement:** in the hero, right column (Matthew chose option A).
- **Capture tooling:** a Node script using Playwright (headless Chromium) to record scroll-through video and screenshots at 1440×900 (laptop) and 390×844 (phone), then ffmpeg to trim/compress to WebM + MP4 and a poster image. Device frames are drawn in CSS/SVG around the media, so the media itself stays plain and reusable.
- **Videos play only while visible** (IntersectionObserver), muted, `playsinline`, looping.
- **Web3 card order:** after TEMPR (portfolio card stays out of its own Projects grid; it's featured on GitHub instead).
- **Logo marquee placement:** About section, above skill tags.
- **Base logo:** Simple Icons has no Base mark (checked); bundle the official mark from Base's brand kit instead. Never substitute the Coinbase logo. Fallback: a text tile.
- **Cursor glow under reduced motion:** becomes a static glow (doesn't follow the pointer or drift).
- **Tooling available:** ffmpeg is installed (`/opt/homebrew/bin/ffmpeg`); Playwright is added as a dev dependency.
- **Planned knock-on changes:** the 3:1 banner test, the required `image` field and its data test, and the README's "Add a project" steps (which gain `npm run capture`) all change as part of this work.
- **Data model:** `Project` gets optional `media` fields (laptop video, laptop poster, phone image) and an optional `links` list, so the Web3 card can list two explorer links instead of Live/Code. Existing `liveUrl`/`codeUrl` keep working.

## Left to the builder

Exact component split, easing curves, glow sizes, laptop/phone frame styling details, marquee speed, and how the Web3 graphic is drawn, all within the constraints above.
