module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  globals: {
    __PUBLIC_URL__: false,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'jest',
  ],
  ignorePatterns: ['*.d.ts'],
  rules: {
    'import/prefer-default-export': 0,
    'max-classes-per-file': 0,
    'max-len': 0,
    'import/extensions': ['error', 'never', { json: 'always' }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/destructuring-assignment': 0,
    'react/no-unescaped-entities': 0,
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: [
          '.js',
          '.tsx',
        ],
      },
    ],
  },
};
