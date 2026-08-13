/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 👈 เพิ่มบรรทัดนี้เพื่อเปิดใช้งาน Class Dark Mode
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};