const path = require('path');

module.exports = {
  // Используем ts-jest для компиляции TypeScript в тестах
  preset: 'ts-jest',
  // Тестируем React-компоненты, поэтому нужна эмуляция браузерного DOM
  testEnvironment: 'jest-environment-jsdom',

  // Подключаем наш setup-файл (используем require.resolve для точного пути в монорепозитории)
  setupFilesAfterEnv: [require.resolve('./setupTests.ts')],

  // Очищаем моки перед каждым тестом (очень важно для чистоты тестов)
  clearMocks: true,

  moduleNameMapper: {
    // 1. Учим Jest понимать наши FSD-алиасы (@/...)
    '^@/(.*)$': '<rootDir>/src/$1',

    // 2. Заглушка для стилей и картинок. Jest не умеет их читать и будет падать.
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      require.resolve('./__mocks__/fileMock.js'),
  },

  transform: {
    // Ускоряем компиляцию тестов, отключая глубокую проверку типов в ts-jest
    '^.+\\.tsx?$': ['ts-jest', { isolatedModules: true }],
  },
};
