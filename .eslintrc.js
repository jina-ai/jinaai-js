/* eslint-disable */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'no-undef': 'warn',
    'semi': 'off',
    'semi-style': ['error', 'last'],
    'no-useless-catch': 'off',
    'prefer-rest-params': 'off',
    'no-useless-escape': 'warn',
    'no-prototype-builtins': 'off',
    'no-extra-boolean-cast': 'off',
    'max-len': [
      'warn',
      {
        code: 120,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'quotes': 'off',
    'no-constant-condition': [
      'error',
      { checkLoops: false }
    ],
    '@typescript-eslint/no-magic-numbers': [
      'warn',
      {
        ignore: [-1, 0, 0.1, 0.2, 0.3, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 16, 24, 30, 32, 64, 128, 200, 256, 365, 400, 500, 512, 1024, 100, 1000, 60, 300, 1800, 3600, 80, 443, '0n', '1n'],
        ignoreArrayIndexes: true,
        ignoreDefaultValues: true,
        ignoreNumericLiteralTypes: true,
        ignoreReadonlyClassProperties: true,
        ignoreTypeIndexes: true,
        ignoreEnums: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        'ignoreRestSiblings': true,
        'varsIgnorePattern': '^_',
        'caughtErrorsIgnorePattern': '^_',
        'argsIgnorePattern': '^_',
        'args': 'after-used'
      },
    ],
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/quotes': ['error', 'single', {
      avoidEscape: true,
      allowTemplateLiterals: true,
    }],
    '@typescript-eslint/no-unnecessary-type-constraint': 'off',
  },
  env: {
    node: true,
    jest: true,
  },
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        'no-undef': 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension
      parserOptions: {
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
      },
    },
    {
      files: ['test/**/*'],
      rules: {
        '@typescript-eslint/no-magic-numbers': 'off'
      }
    }
  ],
  ignorePatterns: ["build/**/*"],
};
