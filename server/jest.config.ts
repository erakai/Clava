export default {
  preset: 'ts-jest/presets/default-esm',
  moduleFileExtensions: ['js', 'json', 'ts'],
  extensionsToTreatAsEsm: ['.ts'],
  testTimeout: 30000,
  restoreMocks: true,
  transform: {
    'node_modules/.+\\.(j|t)sx?$': ['ts-jest', { useESM: true } ],
  },
  testEnvironment: 'node',
  setupFiles: [],
  rootDir: '.'
}