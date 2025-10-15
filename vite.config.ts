import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(), // ✅ Tailwind goes here
    react({
      babel: {
        plugins: [
          ['babel-plugin-react-compiler'], // ✅ only Babel plugins here
        ],
      },
    }),
  ],
})
