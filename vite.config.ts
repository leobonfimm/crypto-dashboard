import react from '@vitejs/plugin-react'
import { defineConfig, UserConfig } from 'vite'
import type { InlineConfig } from 'vitest'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
  },
} as UserConfig & {
  test: InlineConfig
})
