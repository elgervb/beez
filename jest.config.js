module.exports = {
  "preset": "jest-preset-angular",
  "setupFilesAfterEnv": [
    "<rootDir>/src/setup-jest.ts"
  ],
  "testPathIgnorePatterns": [
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
      statements: 74,
      branches: 41,
      functions: 50,
      lines: 71
    }
  },
  moduleNameMapper: {
    '^@core/(.*)': '<rootDir>/src/app/core/$1',
  },
  "globals": {
    "ts-jest": {
      "tsconfig": "<rootDir>/tsconfig.spec.json",
      "stringifyContentPathRegex": "\\.html$"
    }
  }
}
