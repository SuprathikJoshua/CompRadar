/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070a11',
          900: '#0b0f19',
          850: '#111827',
          800: '#1e293b',
          700: '#334155',
        },
      },
      boxShadow: {
        'cyan-glow': '0 0 24px rgba(6, 182, 212, 0.25)',
        'cyan-subtle': '0 0 15px rgba(6, 182, 212, 0.12)',
        'dark-card': '0 20px 45px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};
