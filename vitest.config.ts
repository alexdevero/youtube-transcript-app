import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  // `tsconfigPaths` is used to resolve paths aliases defined in tsconfig.json
  // https://vitest.dev/guide/common-errors#cannot-find-module-relative-path
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
    globals: true, // Add global APIs to avoid importing stuff (expect, it, describe, etc.)
    exclude: ['**/node_modules/**', '**/.next/**'],
    css: true, // for `vitest-preview` dep
  },
})
