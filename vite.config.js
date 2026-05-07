import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        wedding: resolve(__dirname, 'wedding.html'),
        couple: resolve(__dirname, 'couple.html'),
        graduation: resolve(__dirname, 'graduation.html'),
        special: resolve(__dirname, 'special.html'),
      },
    },
  },
})