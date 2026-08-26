// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import reactPlugin from 'eslint-plugin-react'
import i18next from 'eslint-plugin-i18next'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import { defineConfig, globalIgnores } from 'eslint/config'
import i18nCheck from './eslint-rules/i18n-check.js'

export default defineConfig([globalIgnores(['dist', 'dist-electron', 'build', 'bin', 'storybook-static', 'test-results', 'coverage', 'scratch', 'main.js', 'mpvPlayer.js', 'electronLogger.js', 'backendManager.js', 'trayManager.js', 'preload.js']), {
  files: ['**/*.{js,jsx}'],
  extends: [
    js.configs.recommended,
    reactHooks.configs.flat.recommended,
    reactRefresh.configs.vite,
  ],
  plugins: {
    react: reactPlugin,
    i18next,
    'jsx-a11y': jsxA11y,
    'custom-i18n': {
      rules: {
        'no-missing-keys': i18nCheck,
      },
    },
  },
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },
    parserOptions: {
      ecmaFeatures: { jsx: true },
    },
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-empty': 'warn',
    'react-refresh/only-export-components': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/immutability': 'warn',
    'react-hooks/set-state-in-effect': 'warn',
    'react-hooks/preserve-manual-memoization': 'warn',
    'react-hooks/refs': 'warn',
    'react/jsx-no-literals': ['warn', { noStrings: true, ignoreProps: true }],
    'react/forbid-dom-props': ['warn', { forbid: ['style'] }],
    'react/forbid-component-props': ['warn', { forbid: ['style'] }],
    'i18next/no-literal-string': ['warn', { markupOnly: true, ignoreCallees: ['t', 'console.log'] }],
    'jsx-a11y/no-static-element-interactions': 'warn',
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-has-content': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/heading-has-content': 'error',
    'jsx-a11y/html-has-lang': 'error',
    'jsx-a11y/iframe-has-title': 'error',
    'jsx-a11y/img-redundant-alt': 'warn',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'custom-i18n/no-missing-keys': 'error',
  },
}, ...storybook.configs["flat/recommended"]])
