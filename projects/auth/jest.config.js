module.exports = {
  rootDir: './',
  modulePaths: [
    "<rootDir>/projects/auth/src/",
    '<rootDir>/dist'
  ],
  roots: ['<rootDir>/projects/auth'],
  displayName: 'AUTH',
  preset: "jest-preset-angular",
  setupFilesAfterEnv: [
    "<rootDir>/projects/auth/src/setup-jest.ts"
  ],
  testPathIgnorePatterns: [
    "<rootDir>/projects/auth/src/setup-jest.ts",
    "<rootDir>/projects/auth/src/public-api.ts"
  ],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/projects/auth/src/setup-jest.ts',
    '!**/projects/auth/src/public-api.ts',
    '!**/projects/auth/src/**/index.ts',
    '!**/projects/auth/src/**/*.module.ts'
  ],
  coverageReporters: [
    'json',
    'lcov',
    'text-summary'
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 75,
      lines: 80
    }
  },
  moduleNameMapper: {

  }
}
