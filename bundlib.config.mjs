import { config } from 'bundlib'

export default config({
  interop: true,
  esModule: true,
  min: ['api', '!main'],
  project: './tsconfig-build.json',
})
