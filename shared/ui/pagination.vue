<template>
  <div class="pagination inline-flex gap-1">
    <nuxt-link v-show="!isInFirstPage" class="page" :to="{ query: { ...$route.query, page: currentPage - 1 } }">
      «
    </nuxt-link>
    <nuxt-link
      class="page"
      :class="{
        active: isInFirstPage,
      }"
      :to="{ query: { ...$route.query, page: 1 } }"
    >
      1
    </nuxt-link>
    <button v-show="startPage > 2" class="page disabled">...</button>

    <nuxt-link
      v-for="current in pages"
      :key="current"
      class="page"
      :to="{ query: { ...$route.query, page: current } }"
      :class="{
        active: current === currentPage,
      }"
    >
      {{ current }}
    </nuxt-link>
    <button v-show="endPage < totalPages" class="page disabled">...</button>
    <nuxt-link
      v-if="totalPages > maxVisibleButtons"
      class="page"
      :class="{
        active: isInFirstPage,
      }"
      :to="{ query: { ...$route.query, page: totalPages } }"
    >
      {{ totalPages }}
    </nuxt-link>
    <nuxt-link v-show="!isInLastPage" class="page" :to="{ query: { ...$route.query, page: currentPage + 1 } }">
      »
    </nuxt-link>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  total: number
  size?: number
  perPageArray?: number[]
}
const props = withDefaults(defineProps<Props>(), {
  size: 10,
  perPageArray: () => [10, 20, 40, 80],
})
const maxVisibleButtons = ref(3)

const route = useRoute()
const router = useRouter()

const currentPage = computed({
  get() {
    return parseInt(route.query?.page) || 1
  },
  set(val) {
    router.push({
      name: route.name,
      query: {
        ...route.query,
        page: val,
      },
    })
  },
})
const totalPages = computed(() => {
  return Math.ceil(props.total / props.size)
})
const startPage = computed(() => {
  if (currentPage.value === 1) {
    return 2
  }

  let page

  if (currentPage.value === totalPages.value) {
    page = totalPages.value - maxVisibleButtons.value + 1
  }
  if (currentPage.value === 2 || maxVisibleButtons.value === 3) {
    page = currentPage.value - 1
  }

  page = currentPage.value - 2
  return page < 2 ? 2 : page
})

const endPage = computed(() => {
  return Math.min(startPage.value + maxVisibleButtons.value - 1, totalPages.value)
})
const pages = computed(() => {
  const range = []

  for (let i = startPage.value; i <= endPage.value; i++) {
    range.push(i)
  }

  return range
})
const isInFirstPage = computed(() => {
  return currentPage.value === 1
})
const isInLastPage = computed(() => {
  return currentPage.value === totalPages.value
})
const isShowingSelect = computed(() => {
  return totalPages.value >= 1 && props.total > props.perPageArray[0]
})
</script>
<style lang="scss" scoped>
.page {
  @apply block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white rounded-md hover:bg-blue-100;

  &.active {
    @apply bg-blue-500 text-white;
  }

  &.disabled {
    @apply bg-gray-200;
  }
}
</style>
