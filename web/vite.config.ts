import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'scene', test: /node_modules[\\/](three|@react-three)/, priority: 20 },
            { name: 'animation', test: /node_modules[\\/](motion|framer-motion|gsap|lenis)/, priority: 10 },
          ],
        },
      },
    },
  },
})
