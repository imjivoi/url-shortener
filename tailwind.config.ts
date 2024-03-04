import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: ['./content/**/*.md'],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: '#191627',
        },
        red: {
          DEFAULT: '#FF2E63',
          50: '#FFE6EC',
          100: '#FFD1DD',
          200: '#FFA8BE',
          300: '#FF80A0',
          400: '#FF5781',
          500: '#FF2E63',
          600: '#F5003E',
          700: '#BD0030',
          800: '#850022',
          900: '#4D0013',
          950: '#31000C',
        },
        sky: {
          DEFAULT: '#2EFFCA',
          50: '#E6FFF9',
          100: '#D1FFF3',
          200: '#A8FFE9',
          300: '#80FFDF',
          400: '#57FFD4',
          500: '#2EFFCA',
          600: '#00F5B7',
          700: '#00BD8D',
          800: '#008563',
          900: '#004D39',
          950: '#003124',
        },
      },
    },
  },
}
