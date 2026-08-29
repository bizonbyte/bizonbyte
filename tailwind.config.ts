import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary — green. The brand colour: CTAs, links, active states.
        primary: {
          50: '#ecfdf7',
          100: '#d0f8ea',
          200: '#a4efd7',
          300: '#6ce0c0',
          400: '#35c9a4',
          500: '#18a680',
          600: '#0f8a6b',
          700: '#0d6e57',
          800: '#0e5747',
          900: '#0d483c',
          950: '#032a22',
        },
        // Accent — orange. Deliberate and sparing: step markers, rules, one CTA state.
        accent: {
          50: '#fff3ec',
          100: '#ffe1d0',
          200: '#ffbe9f',
          300: '#ff9663',
          400: '#ff7431',
          500: '#fa5700',
          600: '#d94500',
          700: '#b03500',
          800: '#8a2a02',
          900: '#6b2205',
          950: '#3a0f00',
        },
        // Surface — the near-black panel ramp, replacing six hand-written variants.
        surface: {
          950: '#020c0a',
          900: '#04120f',
          800: '#071c17',
          700: '#0b2a22',
          600: '#10382d',
        },
        text: {
          primary: '#f3faf8',
          muted: '#94b8b2',
          faint: '#7aa39d',
          subtle: '#6a9892',
          strong: '#e3f2ee',
          warm: '#fff8e8',
        },
        hairline: 'rgb(255 255 255 / 0.09)',
        'hairline-strong': 'rgb(255 255 255 / 0.16)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Modular scale. Tracking tightens as size grows.
        'display-xl': ['clamp(2.2rem, 4.8vw, 3.75rem)', { lineHeight: '1.04', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(1.9rem, 3.7vw, 2.65rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.5rem, 2.5vw, 2.1rem)', { lineHeight: '1.16', letterSpacing: '-0.022em' }],
        'display-sm': ['clamp(1.2rem, 1.8vw, 1.5rem)', { lineHeight: '1.22', letterSpacing: '-0.015em' }],
        lede: ['clamp(0.98rem, 1.35vw, 1.1rem)', { lineHeight: '1.78', letterSpacing: '-0.005em' }],
        eyebrow: ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.16em' }],
      },
      maxWidth: {
        measure: '68ch',
        container: '72rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
