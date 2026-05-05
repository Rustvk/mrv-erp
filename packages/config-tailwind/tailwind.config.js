/** @type {import('tailwindcss').Config} */
module.exports = {
  // Важно: мы оставляем content пустым!
  // Каждое приложение будет само указывать, где лежат его файлы (src/**/*.{tsx,ts})
  content: [],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2f8fd',
          100: '#e3f0fa',
          500: '#8faa73', // Основной корпоративный цвет
          900: '#475c2d',
        },
        accent: {
          DEFAULT: '#ca850d', // Цвет для выделений, предупреждений
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Корпоративный шрифт
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem', // Глобальное скругление для enterprise-модалок и карточек
      }
    },
  },
  plugins: [
    // Сюда можно добавить общие плагины, например:
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
};
