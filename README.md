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
public/               images served as-is (avatar, badges, project screenshots)
src/
  main.tsx            entry point: mounts <App /> into index.html
  App.tsx             the page, section by section
  index.css           Tailwind import + theme colors
  data/               ← the content: edit these to change what the site says
    types.ts          the shape of a Project, Badge, ContactLink
    projects.ts       your projects
    badges.ts         your certifications
    skills.ts         skill tags in About
    contact.ts        GitHub / Discord / X / Email links
  components/         one file per section (Hero, Projects, ...) plus helpers
    styles.ts         shared class strings (focus ring, card look, new-tab links)
    Reveal.tsx        the fade-in-on-scroll effect
```

**The key idea:** the content is in `src/data/` and the look is in `src/components/`. You'll mostly edit data files.

## Add a project in 3 steps

1. Drop a screenshot into `public/images/` (wide works best, around 1500×500).
2. In `src/data/projects.ts`, copy the existing entry, paste it at the **top** of the list, and change every field. Leave out `liveUrl` or `codeUrl` if you don't have one, and that link won't show.
3. Run `npm test`. If it passes, commit and push. The site updates in a minute or two.

## Edit the About text

Open `src/components/About.tsx` and rewrite the paragraph under `TODO(Matthew)`. Skill tags are in `src/data/skills.ts`.

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
