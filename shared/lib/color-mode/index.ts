import { ModuleOptions } from '@nuxtjs/color-mode'

const colorMode: Partial<ModuleOptions> = {
  preference: 'system',
  fallback: 'light',
  classPrefix: '',
  classSuffix: '',
  dataValue: 'theme',
}

export { colorMode }
