// apps/web/jest.config.js
import sharedConfig from '@mrv-erp/config-jest';

export default {
  // Копируем все настройки из центрального пакета
  ...sharedConfig,

  // Здесь ты можешь переопределить настройки специфичные ТОЛЬКО для этого приложения.
  // Например, если в этом приложении папка сорцов называется не src, а lib:
  //
  // moduleNameMapper: {
  //   ...sharedConfig.moduleNameMapper,
  //   '^@/(.*)$': '<rootDir>/lib/$1',
  // },
};
