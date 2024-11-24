/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          dark: 'var(--primary-dark)',
          light: 'var(--primary-light)',
          '20': 'color-mix(in srgb, var(--primary) 20%, transparent)',
          '40': 'color-mix(in srgb, var(--primary) 40%, transparent)',
          '60': 'color-mix(in srgb, var(--primary) 60%, transparent)',
          '80': 'color-mix(in srgb, var(--primary) 80%, transparent)',
        },
        background: 'var(--background)',
        surface: 'var(--surface)',
        text: {
          DEFAULT: 'var(--text)',
          secondary: 'var(--text-secondary)',
        },
        border: 'var(--border)',
        accent: 'var(--accent)',
        success: 'var(--success)',
        error: 'var(--error)',
        warning: 'var(--warning)',
      }
    },
  },
  plugins: [],
}