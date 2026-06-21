import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#ff5722',
          dark: '#e64a19',
          light: '#ff8a65',
        },
        petroleum: {
          50: '#f0f9fa',
          100: '#dcf2f5',
          200: '#bee5eb',
          300: '#91d1db',
          400: '#5cb3c5',
          500: '#00828a',
          600: '#006c75',
          700: '#00555e',
          800: '#04464f',
          900: '#083a42',
          950: '#012026',
        },
        cyber: {
          cyan: '#00f0ff',
          blue: '#004bff',
          dark: '#030712',
          card: '#080f1d',
          border: '#112240',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'neon-glow': '0 0 15px rgba(0, 240, 255, 0.4)',
        'petroleum-glow': '0 0 20px rgba(0, 130, 138, 0.3)',
      },
    },
  },
  plugins: [],
}
export default config
