# 0xmattyic333.github.io

My developer portfolio: modern web development + IBM Z mainframe skills.

**Live:** https://0xmattyic333.github.io/

Built with **React**, **TypeScript**, and **Tailwind CSS**, bundled by **Vite**, tested with **Vitest**, and deployed by **GitHub Actions** to **GitHub Pages**.

---

## How this site works

| Piece | What it does here |
|---|---|
| **Vite** | The dev server (`npm run dev`) and the build tool. It turns the source in `src/` into plain HTML/CSS/JS in `dist/` that any browser can load. |
| **React** | Splits the page into **components**: small functions that return what to show. `App.tsx` stacks them in order. |
| **TypeScript** | JavaScript with types. `src/data/types.ts` describes what a project or badge looks like, so a missing or misspelled field is flagged before it ships. |
| **Tailwind CSS** | Styling with classes right in the markup (`text-white`, `rounded-xl`, `sm:grid-cols-2`). The theme colors live in `src/index.css`. |
| **Vitest** | Tests (`*.test.tsx`) that render components and check what appears, like "the Email link opens the mail app". |
| **GitHub Actions** | `.github/workflows/deploy.yml` runs the tests and the build on every push, then publishes the site. |

### Folder map

```
public/               files served as-is
  images/             avatar, badges, logos, Web3 graphic
  media/<project-id>/ device media made by `npm run capture`
scripts/
  capture.mjs         records a project's laptop video + phone screenshot
src/
  main.tsx            entry point: mounts <App /> into index.html
  App.tsx             the page, section by section
  index.css           Tailwind import, theme colors, a few keyframe animations
  lib/
    motion.ts         usePrefersReducedMotion() and useCanHover(): every effect checks these
  data/               ← the content: edit these to change what the site says
    types.ts          the shape of a Project, Badge, ContactLink
    projects.ts       your projects
    badges.ts         your certifications
    skills.ts         skill tags in About
    contact.ts        GitHub / Discord / X / Email links
    terminal.ts       the fake z/OS session the hero terminal plays
    logos.ts          logos in the scrolling strip
  components/         one file per section (Hero, Projects, ...) plus helpers
    styles.ts         shared class strings (focus ring, card look, new-tab links)
    Reveal.tsx        fade-in on scroll
    Terminal.tsx      the mainframe terminal in the hero
    TypingLine.tsx    the self-typing line under the tagline
    CursorGlow.tsx    the light that follows your mouse
    Tilt.tsx          3D lean on project cards
    DeviceMockup.tsx  laptop + phone frames around captured media
    LogoMarquee.tsx   the scrolling logo strip
```

### Motion, politely

Every animated component checks two things first (see `src/lib/motion.ts`):

- **Reduced motion:** if the visitor's device asks for less animation, everything holds still. The terminal shows the finished job, the typing line shows its first phrase, the logos stop, and videos show a still.
- **Mouse vs touch:** the cursor glow follows a mouse, but on phones it drifts slowly on its own. Cards only tilt with a mouse.

Videos only play while they're on screen, and the glow does no work in a hidden tab, which saves battery on phones.

**The key idea:** the content is in `src/data/` and the look is in `src/components/`. You'll mostly edit data files.

## Add a project in 4 steps

1. In `src/data/projects.ts`, copy an existing entry, paste it at the **top** of the list, and change every field. Leave out `liveUrl`, `codeUrl` or `links` if you don't have them, and those links won't show.
2. If the project has a live site, make its laptop + phone visuals:
   ```bash
   npm run capture -- my-project https://example.com/
   ```
   Paste the `image` and `media` lines it prints into your entry. (No live site? Put a wide ~1500×500 image in `public/images/` and set `image` to it.)
3. Run `npm test`.
4. Commit and push. The site updates in a minute or two.

The first time you capture, install the browser it uses: `npx playwright install chromium` (and `brew install ffmpeg` if you don't have it).

## Edit the About text

Open `src/components/About.tsx` and edit the paragraph. Skill tags are in `src/data/skills.ts`.

## Run it locally

```bash
npm install     # once, to download dependencies
npm run dev     # start the dev server; open the URL it prints (changes appear instantly)
npm test        # run the tests
npm run build   # build the production site into dist/
```

## How deploy works

1. You push to `main`.
2. GitHub Actions starts the workflow in `.github/workflows/deploy.yml`.
3. It installs dependencies, runs `npm test`, and runs `npm run build`. **If a test fails, nothing is deployed.**
4. The `dist/` folder is published to GitHub Pages.

Check progress in the repo's **Actions** tab.
