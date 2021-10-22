module.exports = {
  modulePaths: [
    "<rootDir>/projects/components/src/",
  ],
  roots: ['<rootDir>/projects/components'],
  displayName: 'COMPONENTS',
  preset: "jest-preset-angular",
  setupFilesAfterEnv: [
    "<rootDir>/projects/components/src/setup-jest.ts"
  ],
  testPathIgnorePatterns: [
    "<rootDir>/projects/components/setup-jest.ts"
  ],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/src/setup-jest.ts',
    '!**/src/public-api.ts',
    '!**/src/**/index.ts',
    '!**/src/**/*.module.ts'
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
      functions: 80,
      lines: 80
    }
  },
  moduleNameMapper: {

  }
}
