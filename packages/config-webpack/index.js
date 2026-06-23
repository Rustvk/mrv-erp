const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// перечисление вендорных библиотек, код которых будет вынесен в отдельные чанки
const separatedVendorsPackages = ['ag-grid-community', 'echarts', 'lodash'];

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
    stats: 'errors-warnings',
    devtool: isDev ? 'eval-cheap-module-source-map' : 'hidden-source-map',

    entry: paths.entry,
    output: {
      path: paths.output,
      filename: '[name].[contenthash].js',
      clean: true,
      publicPath: '/',
    },

    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        cacheGroups: {
          reactVendor: {
            test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
            name: 'react-vendor',
            chunks: 'all',
            priority: 20,
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const match = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
              const packageName = match ? match[1] : 'vendors';

              if (separatedVendorsPackages.includes(packageName)) {
                return `vendor-${packageName.replace('@', '')}`;
              }
              return 'vendors';
            },
            chunks: 'all',
            priority: 10,
          },

          mrvPackages: {
            test: /[\\/]node_modules[\\/]@mrv-erp[\\/]/, // Зависит от того, как pnpm резолвит симлинки
            name: 'mrv-packages',
            chunks: 'all',
            priority: 5,
            minSize: 0,
          },
        },
      },
      minimize: !isDev,
      minimizer: [
        new TerserPlugin({
          minify: TerserPlugin.swcMinify,
        }),
        new CssMinimizerPlugin(),
      ],
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      alias: {
        '@': paths.src,
        react: path.dirname(require.resolve('react')),
        'react-dom': path.dirname(require.resolve('react-dom')),
        ...options.paths.aliases,
      },
      symlinks: true,
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules[\\/](?!(@mrv-erp)[\\/]).*/,
          use: [
            {
              loader: require.resolve('swc-loader'),
              options: {
                jsc: {
                  parser: {
                    syntax: 'typescript',
                    tsx: true,
                  },
                  transform: {
                    react: {
                      runtime: 'automatic',
                      development: isDev,
                      refresh: isDev,
                    },
                  },
                },
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          use: [
            isDev ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
            require.resolve('css-loader'),
            {
              loader: require.resolve('postcss-loader'),
              options: {
                postcssOptions: {
                  plugins: [
                    // Подключаем движок Tailwind v4
                    require('@tailwindcss/postcss')(),
                  ],
                },
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|woff2?|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/[hash][ext][query]',
          },
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: ['@svgr/webpack'],
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
      new webpack.DefinePlugin({
        __IS_DEV__: JSON.stringify(isDev),
      }),
      isDev && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),

    devServer: isDev
      ? {
          port: port ?? 3000,
          open: true,
          hot: true,
          historyApiFallback: true,
        }
      : undefined,
  };
};
