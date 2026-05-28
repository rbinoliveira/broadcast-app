import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return undefined
          }

          if (/[\\/]node_modules[\\/]firebase[\\/]/.test(id)) {
            return 'firebase'
          }

          if (/[\\/]node_modules[\\/](@mui|@emotion)[\\/]/.test(id)) {
            return 'mui'
          }

          if (
            /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/.test(
              id,
            )
          ) {
            return 'react'
          }

          return undefined
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    css: true,
  },
})
