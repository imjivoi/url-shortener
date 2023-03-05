<template>
  <div class="btn-group">
    <nuxt-link v-show="!isInFirstPage" :to="{ query: { ...$route.query, page: currentPage - 1 } }" class="btn">
      «
    </nuxt-link>
    <nuxt-link
      class="btn"
      :class="{
        'btn-active': isInFirstPage,
      }"
      :to="{ query: { ...$route.query, page: 1 } }"
    >
      1
    </nuxt-link>
    <button v-show="startPage > 2" class="btn btn-disabled">...</button>

    <nuxt-link
      v-for="current in pages"
      :key="current"
      class="btn"
      :to="{ query: { ...$route.query, page: current } }"
      :class="{
        'btn-active': current === currentPage,
      }"
    >
      {{ current }}
    </nuxt-link>
    <button v-show="endPage < totalPages" class="btn btn-disabled">...</button>
    <nuxt-link
      v-if="totalPages > maxVisibleButtons"
      class="btn"
      :class="{
        'btn-active': isInFirstPage,
      }"
      :to="{ query: { ...$route.query, page: totalPages } }"
    >
      {{ totalPages }}
    </nuxt-link>
    <nuxt-link
      v-show="currentPage < totalPages"
      class="btn"
      :to="{ query: { ...$route.query, page: currentPage + 1 } }"
    >
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
  size: 12,
  perPageArray: () => [12, 24, 48, 96],
})
const maxVisibleButtons = ref(3)

const route = useRoute()
const router = useRouter()

const currentPage = computed({
  get() {
    return parseInt(route.query.page) || 1
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
