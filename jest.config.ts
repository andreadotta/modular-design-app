import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: [
    '**/tests/e2e/**/*.test.ts', // E2E tests
    '**/src/**/*.test.ts', // Unit tests
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  moduleNameMapper: {
    '^@/utils/(.*)$': '<rootDir>/src/shared/utils/$1',
    '^@/ui/(.*)$': '<rootDir>/src/shared/ui/$1',
    '^@/containers/(.*)$': '<rootDir>/src/components/containers/$1',
    '^@/users$': '<rootDir>/src/modules/users/index',
    '^@/geo$': '<rootDir>/src/modules/geo/index',
    '^@/auth$': '<rootDir>/src/modules/auth/index',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@mui/styled-engine$': '<rootDir>/node_modules/@mui/styled-engine-sc',
  },
};

export default config;
