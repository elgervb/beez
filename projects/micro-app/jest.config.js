module.exports = {
  rootDir: './',
  modulePaths: [
    "<rootDir>/projects/micro-app/src/"
  ],
  roots: ['<rootDir>/projects/micro-app'],
  displayName: 'MICRO-APPS',
  preset: "jest-preset-angular",
  setupFilesAfterEnv: [
    "<rootDir>/projects/micro-app/src/setup-jest.ts"
  ],
  testPathIgnorePatterns: [
    "<rootDir>/projects/micro-app/src/setup-jest.ts",
    "<rootDir>/projects/micro-app/src/public-api.ts"
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
    '^components$': '<rootDir>/dist/components',
    '^auth$': '<rootDir>/dist/auth',
  },
}
