import { createDefaultPreset } from 'ts-jest'

const isCI = process.env.CI

const typescriptJestPreset = createDefaultPreset({
  tsconfig: './tsconfig-test.json',
})

/** @type { import("ts-jest").JestConfigWithTsJest } */
const config = {
  ...typescriptJestPreset,

  collectCoverage: true,
  collectCoverageFrom: [
    'src/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: isCI
    ? ['text', 'json', 'clover', 'cobertura']
    : ['text', 'html'],

  testMatch: [
    '**/__test__/**/*.test.ts',
  ],

  cacheDirectory: 'node_modules/.cache/jest',
  verbose: true,
}

export default config
