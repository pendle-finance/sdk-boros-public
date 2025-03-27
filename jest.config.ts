import { Config } from 'jest';

/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
const config: Config = {
    coveragePathIgnorePatterns: ['dist/', '/node_modules/', 'test/'],
    coverageProvider: 'v8',
    moduleDirectories: ['node_modules'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
    roots: ['test/'],
    testEnvironment: 'node',
    testMatch: ['**/__test__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
    transformIgnorePatterns: ['node_modules/(?!@pendle/sdk-v2|@pendle/core-v2)'],
    transform: {
        [String.raw`^.+\.ts?$`]: ['ts-jest', { tsconfig: 'tsconfig.json' }],
    },
    testTimeout: 100000,
};

export default config;
