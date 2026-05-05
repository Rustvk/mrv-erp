const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

/**
 * @param {Object} options
 * @param {'development' | 'production'} options.mode
 * @param {Object} options.paths - Пути конкретного приложения
 * @param {string} options.paths.entry - Точка входа (src/index.tsx)
 * @param {string} options.paths.html - Шаблон HTML
 * @param {string} options.paths.output - Папка для билда (dist)
 * @param {string} options.paths.src - Корень исходников приложения (для алиасов)
 * @param {number} options.port - Порт для dev-сервера
 */
module.exports = function buildWebpackConfig(options) {
  const { mode, paths, port } = options;
  const isDev = mode === 'development';

  return {
    mode,
    // Делаем сборку информативной
    stats: 'errors-warnings',
    // В dev-режиме используем быстрые source-maps, в проде - полноценные
    devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',

    entry: paths.entry,
    output: {
      path: paths.output,
      filename: '[name].[contenthash].js',
      clean: true, // Очищать dist перед каждой сборкой
      publicPath: '/', // Критически важно для React Router, чтобы работали вложенные пути
    },

    resolve: {
      // Чтобы писать import { App } from './App' вместо './App.tsx'
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@': paths.src, // Настройка алиаса для FSD
      },
      // ВАЖНО: Разрешаем Webpack идти по симлинкам pnpm в соседние пакеты монорепозитория
      symlinks: true,
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: require.resolve('ts-loader'),
              options: {
                // ВАЖНО: Мы отключаем проверку типов в Webpack для скорости.
                // Типы будет проверять IDE или отдельный процесс ts-node (в CI/CD)
                transpileOnly: true,
              },
            },
          ],
          // КЛЮЧЕВОЙ МОМЕНТ МОНОРЕПОЗИТОРИЯ:
          // Исключаем все node_modules, КРОМЕ пакетов с нашим скоупом @mrv-erp.
          // Это заставит Webpack прогонять код из packages/ui через ts-loader.
          exclude: /node_modules\/(?!(@mrv-erp)\/).*/,
        },
        {
          test: /\.css$/i,
          use: [
            // В dev-режиме стили вставляются прямо в <head> для быстрого Hot Reload,
            // В prod-режиме извлекаются в отдельные .css файлы для кэширования браузером
            isDev ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
            require.resolve('css-loader'),
            require.resolve('postcss-loader'), // Нужен для обработки Tailwind
          ],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: paths.html,
      }),
      !isDev &&
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
      // Прокидываем глобальные переменные в React
      new webpack.DefinePlugin({
        __IS_DEV__: JSON.stringify(isDev),
      }),
    ].filter(Boolean), // Удаляет false/undefined из массива плагинов

    devServer: isDev
      ? {
        port: port ?? 3000,
        open: true,
        hot: true, // Включение Hot Module Replacement
        // ВАЖНО ДЛЯ ENTERPRISE: Любой запрос, который не совпадает со статикой (js, css),
        // будет перенаправлен на index.html. Без этого не работает react-router-dom при перезагрузке страницы.
        historyApiFallback: true,
      }
      : undefined,
  };
};
