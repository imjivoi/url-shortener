<template>
  <button v-bind="$attrs" type="button" :class="classes">
    <span
      :class="{
        outlineClasses: variant === 'secondary',
      }"
    >
      <slot />
    </span>
  </button>
</template>
<script lang="ts" setup>
interface Props {
  pill?: boolean
  fullWidth?: boolean
  loading?: boolean
  variant?: 'primary' | 'secondary'
}

const props = withDefaults(defineProps<Props>(), {
  pill: true,
  variant: 'primary',
})

const { pill, fullWidth, variant } = toRefs(props)

const primaryGradient =
  'bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200'
const secondary =
  'bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
const classes = computed(() =>
  [
    'btn',
    ...(pill.value ? ['rounded-full'] : ['']),
    ...(fullWidth.value ? ['w-full'] : ['']),
    ...(variant.value === 'primary' ? [primaryGradient] : []),
    ...(variant.value === 'secondary' ? [secondary] : []),
  ].join(' '),
)
</script>
<style lang="scss" scoped>
.btn {
  @apply focus:outline-none focus:ring-4 font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2;
  span {
    @apply flex items-center justify-center;
  }
}
</style>
