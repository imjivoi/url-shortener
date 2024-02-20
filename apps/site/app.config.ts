export default defineAppConfig({
  ui: {
    primary: 'sky',
    gray: 'slate',
    icons: {
      dynamic: true,
    },
    button: {
      base: 'active:scale-95 transition-all duration-200 ease-in-out',
      color: {
        primary: {
          solid: 'bg-gradient-to-r from-primary-300 via-primary-400 to-primary-500 text-gray-50',
        },
      },
      default: {
        loadingIcon: 'eos-icons:loading',
      },
    },
    select: {
      default: {
        trailingIcon: 'heroicons:chevron-down-20-solid',
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
  },
})
