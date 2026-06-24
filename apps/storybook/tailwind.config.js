/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@mrv-erp/config-tailwind')],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    // Если появится packages/ui
    // "../../packages/ui/src/**/*.{js,ts,jsx,tsx}"
  ],
};
