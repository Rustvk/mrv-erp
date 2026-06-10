module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 0. Обязует писать scope, например feat(supply): ...
    'scope-empty': [2, 'never'],
    // 1. Ограничение длины заголовка (обычно 72 или 100 символов)
    'header-max-length': [2, 'always', 100],
    // 2. Обязательный список scope (названия команд или модулей)
    'scope-enum': [
      2,
      'always',
      ['auth', 'supply', 'finance', 'distribution', 'infrastructure', 'deps', 'ui'],
    ],

    // 3. Правила для типа
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
  },
};
