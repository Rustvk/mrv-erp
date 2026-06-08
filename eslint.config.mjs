import mrvConfig from '@mrv-erp/config-eslint';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  // 1. Подключаем наши централизованные правила
  ...mrvConfig,

  // 2. Объясняем TypeScript-парсеру, где лежат tsconfig файлов при запуске из корня
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        // Указываем пути ко всем tsconfig в монорепозитории
        project: [
          './apps/*/tsconfig.json',
          './packages/*/tsconfig.json'
        ],
        tsconfigRootDir: __dirname,
      },
    },
  },

  // 3. Глобальные игнорирования (чтобы lint-staged не проверял мусор)
  {
    ignores: [
      '**/dist/**',
      '**/.turbo/**',
      '**/node_modules/**',
      '**/build/**'
    ],
  }
];
