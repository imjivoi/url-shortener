import Equal from 'equal-vue'
import Config from 'equal-vue/dist/theme/light' // or light / dark theme

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Equal, Config)
})
