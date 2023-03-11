type Theme = 'dark' | 'light' | 'auto'

const theme = ref<Theme>('light')
export default function useTheme() {
  const cookie = useCookie('theme') as Ref<Theme | null>
  const color = useColorMode()

  const set = (value: Theme) => {
    theme.value = value
    cookie.value = value
    if (process.client) {
      document.documentElement.setAttribute('data-theme', value)
    } else {
      
    }
  }
  const isDark = computed(() => theme.value === 'dark')
  const toggle = () => (isDark.value ? set('light') : set('dark'))

  if (cookie.value) {
    set(cookie.value)
  } else {
    set(color.value)
  }

  return {
    toggle,
    isDark,
  }
}
