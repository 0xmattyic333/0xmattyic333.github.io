// Captures device media for a project card.
//
//   npm run capture -- <project-id> <url>
//   e.g. npm run capture -- tempr-esports https://0xmattyic333.github.io/wolfeepackk_temprgg/
//
// Writes public/media/<project-id>/:
//   laptop.webm + laptop.mp4  a short silent scroll-through at desktop size
//   laptop.jpg                the top of the page (video poster)
//   phone.jpg                 the top of the page at iPhone size
// Then add a `media` block for the project in src/data/projects.ts (the script prints it).
//
// Needs: Playwright's Chromium (`npx playwright install chromium`, once) and ffmpeg (`brew install ffmpeg`).

import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readdirSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { chromium, devices } from 'playwright'

const [id, url] = process.argv.slice(2)
if (!id || !url) {
  console.error('Usage: npm run capture -- <project-id> <url>')
  process.exit(1)
}
try {
  execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' })
} catch {
  console.error('ffmpeg not found. Install it with: brew install ffmpeg')
  process.exit(1)
}

const outDir = join('public', 'media', id)
const workDir = mkdtempSync(join(tmpdir(), 'capture-'))
mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch()

// --- Laptop: record a slow scroll from top to bottom and back. ---
const laptop = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  recordVideo: { dir: workDir, size: { width: 1440, height: 900 } },
})
const page = await laptop.newPage()
await page.goto(url, { waitUntil: 'load' }) // not 'networkidle': live embeds (streams) never go idle
await page.waitForTimeout(2500)
await page.screenshot({ path: join(workDir, 'poster.png') })
const height = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight)
const steps = 60
for (let i = 0; i < steps; i++) {
  await page.mouse.wheel(0, height / steps)
  await page.waitForTimeout(90)
}
await page.waitForTimeout(500)
await page.evaluate(() => scrollTo({ top: 0, behavior: 'smooth' }))
await page.waitForTimeout(1200)
await laptop.close() // finishes writing the video file

// --- Phone: a still of the top of the page at iPhone size. ---
const phone = await browser.newContext({ ...devices['iPhone 15'] })
const phonePage = await phone.newPage()
await phonePage.goto(url, { waitUntil: 'load' }) // not 'networkidle': live embeds (streams) never go idle
await phonePage.waitForTimeout(2500)
await phonePage.screenshot({ path: join(workDir, 'phone.png') })
await browser.close()

// --- Compress with ffmpeg. ---
const raw = join(workDir, readdirSync(workDir).find((f) => f.endsWith('.webm')))
const ff = (...args) => execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...args])
const scale = ['-vf', 'scale=960:-2', '-t', '8', '-an']
ff('-ss', '0.8', '-i', raw, ...scale, '-c:v', 'libvpx-vp9', '-crf', '42', '-b:v', '0', join(outDir, 'laptop.webm'))
ff('-ss', '0.8', '-i', raw, ...scale, '-c:v', 'libx264', '-crf', '30', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', join(outDir, 'laptop.mp4'))
ff('-i', join(workDir, 'poster.png'), '-vf', 'scale=960:-2', '-q:v', '5', join(outDir, 'laptop.jpg'))
ff('-i', join(workDir, 'phone.png'), '-vf', 'scale=390:-2', '-q:v', '5', join(outDir, 'phone.jpg'))
rmSync(workDir, { recursive: true, force: true })

for (const file of ['laptop.webm', 'laptop.mp4', 'laptop.jpg', 'phone.jpg']) {
  const kb = Math.round(statSync(join(outDir, file)).size / 1024)
  console.log(`${file.padEnd(12)} ${kb} KB`)
}
console.log(`
Add this to the project in src/data/projects.ts:
    image: '/media/${id}/laptop.jpg',
    media: {
      laptopVideo: '/media/${id}/laptop.webm',
      laptopVideoMp4: '/media/${id}/laptop.mp4',
      laptopPoster: '/media/${id}/laptop.jpg',
      phone: '/media/${id}/phone.jpg',
    },`)
