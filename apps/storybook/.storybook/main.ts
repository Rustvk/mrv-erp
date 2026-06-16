import type { StorybookConfig } from '@storybook/react-webpack5';

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-webpack5-compiler-swc'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-onboarding'),
  ],
  framework: getAbsolutePath('@storybook/react-webpack5'),
  webpackFinal: async (webpackConfig) => {
    // Эмулируем __dirname для ESM модулей
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    // Находим абсолютный путь до вашего пакета ui (на 3 уровня вверх от .storybook)
    const uiPackagePath = join(__dirname, '../../../packages/ui');

    // Убеждаемся, что массивы существуют (защита от ошибок TS)
    if (!webpackConfig.module) webpackConfig.module = {};
    if (!webpackConfig.module.rules) webpackConfig.module.rules = [];

    // Добавляем правило: использовать SWC для компиляции TS/TSX файлов из пакета ui
    webpackConfig.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: [uiPackagePath],
      use: [
        {
          loader: 'swc-loader', // Используем SWC, так как он у вас уже подключен
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
            },
          },
        },
      ],
    });

    // 2. ДОБАВЛЯЕМ АЛИАСЫ ДЛЯ WEBPACK
    if (!webpackConfig.resolve) webpackConfig.resolve = {};
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      // Дублируем пути из tsconfig.json
      '@': join(__dirname, '../src'),
      '#components': join(uiPackagePath, 'src/components'),
      '#lib': join(uiPackagePath, 'src/lib'),
      '#hooks': join(uiPackagePath, 'src/hooks'),
    };

    return webpackConfig;
  },
};
export default config;
