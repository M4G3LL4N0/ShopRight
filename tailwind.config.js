/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--text)',
        secondary: 'var(--muted)',
        background: 'var(--bg)',
        panel: 'var(--panel)',
        border: 'var(--border)',
      },
    },
  },
  plugins: [],
}
