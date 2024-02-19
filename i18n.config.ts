import messages from './lib/i18n/messages'

export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: 'en',
  locale: 'en',
  messages,
}))
