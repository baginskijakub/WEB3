/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      dropShadow: {
        'card-icon': '0 3px 0 rgba(0, 0, 0, 100%)',
      },
    },
  },
  plugins: [],
}
