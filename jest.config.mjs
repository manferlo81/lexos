const isCI = process.env.CI

/** @type { import("ts-jest").JestConfigWithTsJest } */
const config = {
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: './tsconfig-test.json',
    }],
  },

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
