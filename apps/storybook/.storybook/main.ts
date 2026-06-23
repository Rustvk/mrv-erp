import type { StorybookConfig } from '@storybook/react-webpack5';

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

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
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const uiPackagePath = join(__dirname, '../../../packages/ui');
    if (!webpackConfig.resolve) webpackConfig.resolve = {};
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      '@': join(__dirname, '../src'),
      '#components': join(uiPackagePath, 'src/components'),
      '#lib': join(uiPackagePath, 'src/lib'),
      '#hooks': join(uiPackagePath, 'src/hooks'),
    };

    if (!webpackConfig.module) webpackConfig.module = {};
    if (!webpackConfig.module.rules) webpackConfig.module.rules = [];

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

    if (!webpackConfig.resolve) webpackConfig.resolve = {};
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      '@': join(__dirname, '../src'),
      '#components': join(uiPackagePath, 'src/components'),
      '#lib': join(uiPackagePath, 'src/lib'),
      '#hooks': join(uiPackagePath, 'src/hooks'),
    };

    return webpackConfig;
  },
};
export default config;
