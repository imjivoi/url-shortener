import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
		'./content/**/*.md'
	],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: '#191627',
        },
      },
    },
  },
}
