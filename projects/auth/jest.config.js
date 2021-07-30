module.exports = {
  preset: 'jest-preset-angular',
  displayName: 'AUTH',
  roots: ['<rootDir>/projects/auth'],
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
      statements: 88,
      branches: 100,
      functions: 75,
      lines: 86
    }
  }
}
