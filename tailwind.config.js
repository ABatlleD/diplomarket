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
        100: '#6e717a',
        200: '#e2dfcb'
      },
      button: '#b12024',
      whatsapp: '#49c95a',
      footer: {
        background: {
          100: '#15224b',
          200: '#111b3c'
        }
      }
    },
    extend: {}
  },
  plugins: []
}
