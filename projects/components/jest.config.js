module.exports = {
  "modulePaths": [
    "<rootDir>/projects/components/src/",
  ],
  roots: ['<rootDir>/projects/components'],
  "displayName": 'COMPONENTS',
  "preset": "jest-preset-angular",
  "setupFilesAfterEnv": [
    "<rootDir>/projects/components/src/setup-jest.ts"
  ],
  "testPathIgnorePatterns": [
    "<rootDir>/projects/components/setup-jest.ts"
  ],
  collectCoverageFrom: [
    '**/*.{ts,tsx}'
  ],
  coverageReporters: [
    'json',
    'lcov',
    'text-summary'
  ],
  coverageThreshold: {
    global: {
      statements: 76,
      branches: 56,
      functions: 55,
      lines: 74
    }
  },
  moduleNameMapper: {

  }
}
