import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  moduleNameMapper: { '\\.(css|less)$': '<rootDir>/styleMock.cjs' },
};

export default config;
