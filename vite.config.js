import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path" // day-3

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: { // day-3
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
