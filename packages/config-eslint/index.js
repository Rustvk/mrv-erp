import { createRequire } from 'node:module';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import tailwindPlugin from 'eslint-plugin-tailwindcss';
import fsdPlugin from '@conarti/eslint-plugin-feature-sliced';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

const require = createRequire(import.meta.url);

export default tseslint.config(
  // 1. Базовые рекомендуемые правила JS
  js.configs.recommended,

  // 2. Рекомендуемые правила TypeScript
  ...tseslint.configs.recommended,

  // 3. Основной конфиг
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      // Настройка для Tailwind
      tailwindcss: {
        callees: ['classnames', 'clsx', 'ctl'],
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      tailwindcss: tailwindPlugin,
      '@conarti/feature-sliced': fsdPlugin,
    },
    rules: {
      // Рекомендуемые правила React
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,

      // Переопределения React
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // Правила Tailwind
      // eslint-tailwind no-arbitrary-value пока не умеет работать с tailwind v4
      // 'tailwindcss/no-arbitrary-value': 'error',

      // Архитектурные правила FSD
      '@conarti/feature-sliced/layers-slices': 'error',
      '@conarti/feature-sliced/absolute-relative': 'error',
      '@conarti/feature-sliced/public-api': 'error',
    },
  },

  prettierConfig,
);
