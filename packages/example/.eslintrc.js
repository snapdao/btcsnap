// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'react'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: 'React|^_',
        ignoreRestSiblings: true
      }
    ],
    semi: ['warn', 'always'],
    quotes: ['warn', 'single'],
    'jsx-quotes': ['warn', 'prefer-single'],
    indent: ['warn', 2],
    'comma-spacing': ['warn', { 'before': false, 'after': true }],
    'block-spacing': ['warn', 'always'],
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
