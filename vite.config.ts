import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import adminFsPlugin from './vite-plugins/admin-fs-plugin.ts'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: '/',
  plugins: [react(), ...(command === 'serve' ? [adminFsPlugin()] : [])],
}))
