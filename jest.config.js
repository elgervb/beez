module.exports = {
  rootDir: './',
  roots: ['<rootDir>/src'],
  modulePaths: ['<rootDir>/dist', '<rootDir>'],
  displayName: "BEEZ",
  preset: "jest-preset-angular",
  setupFilesAfterEnv: [
    "<rootDir>/src/setup-jest.ts"
  ],
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
      statements: 76,
      branches: 56,
      functions: 48,
      lines: 74
    }
  },
  moduleNameMapper: {},
  globals: {
    "ts-jest": {
      "tsconfig": "<rootDir>/tsconfig.spec.json",
      "stringifyContentPathRegex": "\\.html$"
    }
  }
}
