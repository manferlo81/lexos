import { config } from 'bundlib'

export default config({
  min: ['api', '!main'],
  project: './tsconfig-build.json',
})
