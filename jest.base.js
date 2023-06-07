module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageReporters: ['json', 'text-summary'],
    coverageProvider: 'v8',
    reporters: [
        'default',
        'jest-summary-reporter'
    ],
    testMatch: [`**/tests/**/*.test.(ts|tsx)`],
    globalSetup: './jest.setup.ts',
    globalTeardown: './jest.teardown.ts',
    coverageDirectory: './coverage',
    testTimeout: 240000,
};
