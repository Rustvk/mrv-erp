module.exports = {
  extends: [require.resolve('@mrv-erp/config-eslint')],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
