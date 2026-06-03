
export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B2C5C',
          50: '#EAF0F8',
          100: '#D2E0F1',
          700: '#0F3568',
          800: '#0B2C5C',
          900: '#08213F',
        },
        royal: {
          DEFAULT: '#C8102E',
          dark: '#A50D26',
        },
        sandstone: {
          DEFAULT: '#B8860B',
          light: '#D4A93A',
          50: '#FAF6EC',
        },
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        khmer: ['Noto Serif Khmer', 'serif'],
      },
    },
  },
}
