import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set base to your GitHub repo name, e.g. '/thazh-api-docs/'
// Change 'thazh-api-docs' to your actual repo name before deploying
export default defineConfig({
  plugins: [react()],
  base: '/docs/',
})
