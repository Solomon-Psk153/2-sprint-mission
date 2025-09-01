import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  testEnvironment: "node",
  clearMocks: true,
  collectCoverage: true,
  coverageReporters: ['text', 'html', 'lcov', 'json'],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 85,
      functions: 90,
      lines: 80,
    },
  },
  testMatch: ['**/?(*.)+(spec|test).(ts|js)'],
  testTimeout: 3000
};

export default config;