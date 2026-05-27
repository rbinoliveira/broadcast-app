import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importPlugin from 'eslint-plugin-import'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import prettier from 'eslint-plugin-prettier/recommended'
import neostandard from 'neostandard'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  ...neostandard({ ts: true }),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettier, 
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: { ...globals.browser, ...globals.es2021, ...globals.jest },
    },
    plugins: {
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/no-unresolved': 'off',
      'import/no-duplicates': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'prettier/prettier': [
        'error',
        {
          printWidth: 80,
          tabWidth: 2,
          useTabs: false,
          singleQuote: true,
          trailingComma: 'all',
          arrowParens: 'always',
          semi: false,
          endOfLine: 'lf',
          bracketSpacing: true,
          bracketSameLine: false,
          plugins: ['prettier-plugin-tailwindcss'],
          tailwindStylesheet: './src/index.css',
        },
      ],
    },
  },
])