/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // react(): lets Vite understand JSX/TSX. tailwindcss(): turns Tailwind classes into real CSS.
  plugins: [react(), tailwindcss()],
  // The site is served from the domain root (https://0xmattyic333.github.io/), so paths start at "/".
  base: '/',
  // Vitest reads this block. jsdom gives tests a fake browser so components can render.
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true,
    // This drive (non-APFS) creates macOS "._" metadata files next to every file; never treat them as tests.
    exclude: ['**/node_modules/**', '**/._*'],
  },
})
