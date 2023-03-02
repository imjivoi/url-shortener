import { NuxtI18nOptions } from '@nuxtjs/i18n'

import messages from './messages'

const i18n: NuxtI18nOptions = {
  strategy: 'no_prefix',
  locales: [
    {
      code: 'en',
      iso: 'en-US',
    },
    {
      code: 'es',
      iso: 'es-ES',
    },
    // {
    //   code: 'es',
    //   iso: 'es-AR',
    // },
  ],
  defaultLocale: 'es',

  vueI18n: {
    legacy: false,
    locale: 'es',
    messages,
  },
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    redirectOn: 'root',
  },
}

export { i18n }
