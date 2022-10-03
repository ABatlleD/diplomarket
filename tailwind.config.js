/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*',
    './components/**/*',
    './layouts/**/*'
  ],
  theme: {
    colors: {
      background: {
        100: '#ffffff',
        200: '#fcfcfc',
        300: '#f3f4f6'
      },
      text: {
        100: '#6e717a'
      },
      button: '#b12024'
    },
    extend: {}
  },
  plugins: []
}
