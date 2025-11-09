/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  // File extensions Jest will look for
  moduleFileExtensions: ['ts', 'js', 'json'],

  // Root folder for Jest to scan
  rootDir: './',

  // Match test files
  testMatch: [
    '**/src/**/*.spec.ts',   // co-located unit tests
    '**/tests/**/*.spec.ts', // centralized integration tests
  ],

  // Transform TS files using ts-jest
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },

  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', // path to your tsconfig
      isolatedModules: true,     // optional, speeds up compilation
    },
  },

  // Ignore node_modules except for packages you want to transform
  transformIgnorePatterns: ['<rootDir>/node_modules/'],

  // Optional: map module paths if using tsconfig paths
  // moduleNameMapper: {
  //   '^@modules/(.*)$': '<rootDir>/src/modules/$1',
  // },
};