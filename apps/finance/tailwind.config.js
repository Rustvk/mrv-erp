/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@mrv-erp/config-tailwind')],
  content: ['./src/**/*.{js,ts,jsx,tsx}', '../../packages/ui/src/**/*.{js,ts,jsx,tsx}'],
};
