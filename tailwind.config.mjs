/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      'custom-height-mq': {
        raw: '(max-height: 680px)',
      },
    },
    colors: {
      transparent: 'transparent',
      white: 'var(--color-white)',
      purple: 'var(--color-purple)',
      darkBlue: 'var(--color-darkBlue)',
      green: 'var(--color-green)',
      orange: 'var(--color-orange)',
      blue: 'var(--color-blue)',
      grey: 'var(--color-grey)',
      scrim: 'var(--color-scrim)',
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
  darkMode: 'selector',
}
