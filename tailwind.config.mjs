import defaultTheme from 'tailwindcss/defaultTheme'

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
      '3xl': '1600px',
      '4xl': '1920px',
    },
    colors: {
      transparent: 'transparent',
      white: 'var(--color-white)',
      purple: 'var(--color-purple)',
      darkPurple: 'var(--color-dark-purple)',
      darkBlue: 'var(--color-darkBlue)',
      green: 'var(--color-green)',
      darkGreen: 'var(--color-dark-green)',
      orange: 'var(--color-orange)',
      darkOrange: 'var(--color-dark-orange)',
      blue: 'var(--color-blue)',
      lightGrey: 'var(--color-lightGrey)',
      grey: 'var(--color-grey)',
      darkGrey: 'var(--color-darkGrey)',
      scrim: 'var(--color-scrim)',
    },
    extend: {
      strokeWidth: {
        1: '1rem',
        2: '2rem',
      },
      fontFamily: {
        header: ['Poppins Regular', ...defaultTheme.fontFamily.sans],
        body: ['Monaspace Argon Var', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  darkMode: 'selector',
}
