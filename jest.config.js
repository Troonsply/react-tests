/** @type {import('jest').Config} */

const config = {
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
    ],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/internal/jest.setup.js'],
    moduleFileExtensions: ['js', 'jsx'],
    moduleNameMapper: {
        '^.+\\.svg$': 'jest-svg-transformer',
        '^.+\\.(css|scss|less)$': 'identity-obj-proxy',
    },
};

export default config;