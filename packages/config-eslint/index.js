module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    // Prettier всегда должен быть последним, чтобы отключать конфликтующие правила форматирования
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    '@conarti/feature-sliced'
  ],
  settings: {
    react: {
      version: 'detect', // Автоматически определяет версию React
    },
  },
  rules: {
    // Базовые правила React
    'react/react-in-jsx-scope': 'off', // Отключаем, так как в React 18+ не нужно импортировать React для JSX
    'react/prop-types': 'off', // Мы используем TypeScript, PropTypes нам не нужны

    // Архитектурные правила FSD
    // 1. Запрещает импортировать верхние слои в нижние (например, pages в features)
    '@conarti/feature-sliced/layers-slices': 'error',
    // 2. Требует использовать абсолютные импорты между модулями и относительные внутри одного модуля
    '@conarti/feature-sliced/absolute-relative': 'error',
    // 3. Жестко требует импортировать сущности и фичи только через их Public API (index.ts)
    '@conarti/feature-sliced/public-api': 'error',
  },
};
