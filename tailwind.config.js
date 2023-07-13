/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*',
    './components/**/*',
    './layouts/**/*'
  ],
  theme: {
    extend: {
      keyframes: {
        pulseloaderloop: {
          "50%": { transform: "scale(0.75)", opacity: "0.2", },
          "100%": { transform: "scale(1)", opacity: "1", },
        },
      },
      animation: {
        "pulseloader-default": "1.07692s linear 0s infinite normal both running pulseloaderloop",
        "pulseloader-delay": "1.07692s linear 0.538462s infinite normal both running pulseloaderloop",
      },
      backgroundImage: {
        swus: "url('/public/assets/theme/logo-preloader.png')"
      },
      colors: {
        background: {
          100: '#ffffff',
          200: '#fcfcfc',
          300: '#f3f4f6'
        },
        text: {
          100: '#6e717a',
          200: '#e2dfcb',
          blue: '#00529e'
        },
        button: '#b12024',
        whatsapp: '#49c95a',
        footer: {
          background: {
            100: '#15224b',
            200: '#111b3c',
            300: '#111b2c'
          }
        },
        dm: {
				  red: "#b12024",
				  blue: "#15224B",
				  "blue-dark": "#1a264f",
				},
      },
    }
  },
  plugins: []
}
