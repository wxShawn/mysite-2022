/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'], // 移除生产环境下没有使用到的样式声明
  theme: {
    extend: {
      backgroundImage: {
        'home-banner': 'url(/bg-banner.jpg)'
      },
      flex: {
        '2': '2 2 0%',
      }
    },
    container: {
      center: true,
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
