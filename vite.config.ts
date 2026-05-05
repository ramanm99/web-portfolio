import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Injects variables into every scss file Vite processes directly.
        // Files loaded via sass @use get their own @use statements.
        additionalData: `@use "@/styles/variables" as *;`,
      },
    },
  },
})
