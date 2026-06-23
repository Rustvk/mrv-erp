const path = require('path');

// Описываем настройки SWC инлайн (без чтения внешних файлов)
const swcConfig = {
  jsc: {
    parser: {
      syntax: 'typescript',
      tsx: true,
    },
    transform: {
      react: {
        runtime: 'automatic', // Поддержка React 17+ (чтобы не писать import React)
      },
    },
  },
};

module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: [path.resolve(__dirname, 'setupTests.ts')],
  clearMocks: true,
  moduleNameMapper: {
    // Алиасы FSD
    '^@/(.*)$': '<rootDir>/src/$1',
    // Заглушка для стилей
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Мок для медиа-файлов
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      path.resolve(__dirname, '__mocks__/fileMock.js'),
  },

  transform: {
    // Передаем наш инлайн-объект swcConfig адаптеру
    '^.+\\.(t|j)sx?$': [require.resolve('@swc/jest'), swcConfig],
  },
};
