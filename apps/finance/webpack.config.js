const path = require('path');
const buildWebpackConfig = require('@mrv-erp/config-webpack');

module.exports = (env) => {
  const mode = env.mode || 'development';
  const isDev = mode === 'development';

  return buildWebpackConfig({
    mode,
    port: 3001, // У приложения Supply будет свой порт (Finance можно повесить на 3002)
    paths: {
      entry: path.resolve(__dirname, 'src', 'index.tsx'),
      output: path.resolve(__dirname, 'dist'),
      html: path.resolve(__dirname, 'public', 'index.html'),
      src: path.resolve(__dirname, 'src'),
    },
  });
};
