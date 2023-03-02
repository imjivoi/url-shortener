/* eslint-disable @typescript-eslint/no-var-requires */
import { Config } from 'tailwindcss'
export default <Partial<Config>>{
  content: [
    './shared/**/*.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './features/**/*.vue',
    './entities/**/*.vue',
  ],
  daisyui: {
    styled: true,
    themes: ['light', 'dark'],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
  },

  plugins: [require('daisyui')],
  darkMode: 'class',
}
