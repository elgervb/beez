module.exports = {
  preset: 'jest-preset-angular',
  displayName: 'COMPONENTS',
  roots: ['<rootDir>/projects/components'],
  setupFilesAfterEnv: [
    '<rootDir>/projects/components/setup-jest.ts'
  ],
  testPathIgnorePatterns: [
  ],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/setup-jest.ts',
    '!**/public-api.ts',
    '!**/**/index.ts',
    '!**/**/*.module.ts'
  ],
  coverageReporters: [
    'json',
    'lcov',
    'text-summary'
  ],
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 20,
      functions: 50,
      lines: 50
    }
  }
}
