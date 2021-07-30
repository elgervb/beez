module.exports = {
  preset: "jest-preset-angular",
  displayName: 'BEEZ APP',
  setupFilesAfterEnv: [
    "<rootDir>/src/setup-jest.ts"
  ],
  roots: ['<rootDir>/src'],
  modulePaths: ['<rootDir>/dist'],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/coverage/",
    "<rootDir>/src/setup-jest.ts"
  ],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/src/environments/**',
    '!**/src/main.ts',
    '!**/src/polyfills.ts',
    '!**/src/setup-jest.ts',
    '!**/e2e/**',
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
      statements: 50,
      branches: 20,
      functions: 50,
      lines: 50
    }
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.html$"
    }
  }
}
