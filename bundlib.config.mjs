import { config } from 'bundlib'

export default config({
  interop: true,
  esModule: true,
  name: 'Lexos',
  min: ['api', '!main'],
  project: './tsconfig-build.json',
})
