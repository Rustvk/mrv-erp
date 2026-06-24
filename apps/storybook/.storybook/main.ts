import type { StorybookConfig } from '@storybook/react-webpack5';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import tailwindcssPostcss from '@tailwindcss/postcss';

function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-webpack5-compiler-swc'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
  ],
  framework: getAbsolutePath('@storybook/react-webpack5'),
  webpackFinal: async (webpackConfig) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const uiPackagePath = join(__dirname, '../../../packages/ui');

    if (!webpackConfig.module) webpackConfig.module = {};
    if (!webpackConfig.module.rules) webpackConfig.module.rules = [];
    if (!webpackConfig.resolve) webpackConfig.resolve = {};

    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      '@': join(__dirname, '../src'),
      '#components': join(uiPackagePath, 'src/components'),
      '#lib': join(uiPackagePath, 'src/lib'),
      '#hooks': join(uiPackagePath, 'src/hooks'),
    };

    webpackConfig.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: [uiPackagePath],
      use: [
        {
          loader: 'swc-loader',
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

    // Вырезаем стандартный CSS-лоадер Storybook (чтобы избежать конфликтов)
    webpackConfig.module.rules = webpackConfig.module.rules.filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (rule: any) => rule.test && rule.test.toString() !== '/\\.css$/',
    );

    // Инжектим правильный пайплайн для компиляции Tailwind v4
    webpackConfig.module.rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              // Заменяем require на импортированную переменную
              plugins: [tailwindcssPostcss()],
            },
          },
        },
      ],
    });

    return webpackConfig;
  },
};

export default config;
