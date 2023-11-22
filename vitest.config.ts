/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'
import { defineConfig } from 'vitest/config'

import vscodeSettings from '.vscode/settings.json'

dotenv.config({ path: path.join(process.cwd(), '.env.local') })

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    include: vscodeSettings['vitest.include'],
    reporters: process.env.CI ? ['junit'] : 'dot',
    outputFile: '.vitest/reports/report.xml',
  },
  resolve: {
    alias: [{ find: /^@\/(.*)/, replacement: path.join(__dirname, '$1') }],
  },
})
