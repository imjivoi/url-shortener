/* eslint-disable @typescript-eslint/no-var-requires */
import { Config } from 'tailwindcss'
export default <Partial<Config>>{
  content: [
    './shared/**/*.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './features/**/*.vue',
    './entities/**/*.vue',
    './widgets/**/*.vue',
    './node_modules/equal-vue/dist/theme/*.{js,ts,json}',
  ],
  darkMode: 'class',
}
