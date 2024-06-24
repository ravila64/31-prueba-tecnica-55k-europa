const { parserOptions } = require("eslint-plugin-import/config/react");

module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides:[],
  parserOptions:{
    ecmaVersion: 'latest',
    sourceType: 'module',
    project:'./tsconfig.json'
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    'react'
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/explicit-function-return-type':'off',
    'react/react-in-jsx-scope':'off',
    '@typescript-eslint/method-signature-style':'off'
  }
}
