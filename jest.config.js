module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
  };
  