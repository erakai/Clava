export default {
  preset: 'ts-jest/presets/default-esm',
  moduleFileExtensions: ['js', 'json', 'ts'],
  extensionsToTreatAsEsm: ['.ts'],
  testTimeout: 30000,
  restoreMocks: true,
  transformIgnorePatterns: ['node_modules/(?!@hocuspocus/)'],
  transform: {
    'node_modules/@hocuspocus/.+\\.(j|t)sx?$': ['ts-jest', { useESM: true } ],
  },
  testEnvironment: 'node',
  setupFiles: [],
  rootDir: '.'
}