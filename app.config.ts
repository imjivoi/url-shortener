export default defineAppConfig({
  ui: {
    primary: 'blue',
    gray: 'slate',
    icons: {
      dynamic: true,
    },
    button: {
      base: 'active:scale-95 transition-all duration-200 ease-in-out',
      color: {
        primary: {
          solid: 'bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 text-gray-50',
        },
      },
      default: {
        loadingIcon: 'eos-icons:loading',
      },
    },
    select: {
      default: {
        trailingIcon: 'heroicons:chevron-down-20-solid',
        loadingIcon: 'eos-icons:loading',
        selectedIcon: 'heroicons:check-20-solid',
      },
    },
    notification: {
      default: {
        closeButton: {
          icon: 'heroicons:x-mark',
        },
      },
    },
    accordion: {
      default: {
        openIcon: 'heroicons:chevron-down-20-solid',
      },
    },
    selectMenu: {
      default: {
        loadingIcon: 'eos-icons:loading',
        selectedIcon: 'heroicons:check-20-solid',
      },
    },
  },
})
