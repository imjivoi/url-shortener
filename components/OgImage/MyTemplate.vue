<script setup lang="ts">
// convert to typescript props
const props = withDefaults(
  defineProps<{
    colorMode?: 'dark' | 'light'
    title?: string
    description?: string
    icon?: string | boolean
    siteName?: string
    siteLogo?: string
    theme?: string
  }>(),
  {
    theme: '#0ea5e9',
    title: 'title',
  },
)

const HexRegex = /^#([0-9a-f]{3}){1,2}$/i

const colorMode = useColorMode()
const themeHex = computed(() => {
  // regex test if valid hex
  if (HexRegex.test(props.theme)) return props.theme

  // if it's hex without the hash, just add the hash
  if (HexRegex.test(`#${props.theme}`)) return `#${props.theme}`

  // if it's rgb or rgba, we convert it to hex
  if (props.theme.startsWith('rgb')) {
    const rgb = props.theme
      .replace('rgb(', '')
      .replace('rgba(', '')
      .replace(')', '')
      .split(',')
      .map((v) => Number.parseInt(v.trim(), 10))
    const hex = rgb
      .map((v) => {
        const hex = v.toString(16)
        return hex.length === 1 ? `0${hex}` : hex
      })
      .join('')
    return `#${hex}`
  }
  return '#FFFFFF'
})

const themeRgb = computed(() => {
  // we want to convert it so it's just `<red>, <green>, <blue>` (255, 255, 255)
  return themeHex.value
    .replace('#', '')
    .match(/.{1,2}/g)
    ?.map((v) => Number.parseInt(v, 16))
    .join(', ')
})

const siteConfig = useSiteConfig()
const siteName = computed(() => {
  return props.siteName || siteConfig.name
})
const siteLogo = computed(() => {
  return props.siteLogo || siteConfig.logo
})
</script>

<template>
  <div
    class="w-full h-full flex justify-between relative p-[60px]"
    :class="[colorMode === 'light' ? ['bg-white', 'text-gray-900'] : ['bg-[#191627]', 'text-gray-50']]"
  
  >
    <div class="h-full w-full justify-between relative">
      <div class="flex flex-row justify-between items-start">
        <div class="flex flex-col w-full max-w-[65%]">
          <h1 class="m-0 font-bold mb-[30px] text-[75px]">
            {{ title }}
          </h1>
          <p
            v-if="description"
            class="text-[35px]"
            :class="[colorMode === 'light' ? ['text-gray-700'] : ['text-gray-300']]"
          >
            {{ description }}
          </p>
        </div>
      </div>
      <div class="flex flex-row justify-center items-center text-left w-full">
        <img src="/apple-touch-icon.png" height="30" />
        <p style="font-size: 25px" class="font-bold">liny.app</p>
      </div>
    </div>
  </div>
</template>
