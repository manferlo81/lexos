import { defineConfig } from 'bundlib'

export default defineConfig({
  interop: true,
  esModule: true,
  name: 'Lexos',
  min: ['api', '!main'],
  project: './tsconfig.build.json',
})
