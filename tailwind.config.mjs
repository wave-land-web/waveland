/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    colors: {
      white: '#d5deeb',
      darkBlue: '#011627',
      purple: '#c792e9',
      green: '#7fdbca',
      orange: '#ff757f',
    },
    fontFamily: {
      body: ['Poppins Regular', 'sans-serif'],
      mono: ['Monaspace Argon Var', 'monospace'],
    },
    extend: {
      strokeWidth: {
        1: '1rem',
        2: '2rem',
      },
    },
  },
  plugins: [],
}
