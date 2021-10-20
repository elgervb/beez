module.exports = {
  "modulePaths": [
    "<rootDir>/projects/micro-app/src/",
  ],
  roots: ['<rootDir>/projects/micro-app'],
  "displayName": 'MICRO-APPS',
  "preset": "jest-preset-angular",
  "setupFilesAfterEnv": [
    "<rootDir>/projects/micro-app/src/setup-jest.ts"
  ],
  "testPathIgnorePatterns": [
    "<rootDir>/projects/micro-app/setup-jest.ts"
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
