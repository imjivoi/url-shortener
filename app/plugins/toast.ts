import Toast, { PluginOptions } from 'vue-toastification'

const options: PluginOptions = {
  timeout: 2000,
  hideProgressBar: true,
  maxToasts: 10,
  transition: 'Vue-Toastification__fade',
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, options)
})
