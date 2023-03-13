<template>
  <div v-if="loading" class="flex flex-col gap-4">
    <card-skeleton v-for="i in 4" :key="i" />
  </div>
  <div v-else-if="links?.length">
    <div class="flex flex-col gap-4">
      <card
        v-for="link in links"
        :key="link.id"
        :link="link"
        @copy="copyLink(link.redirect_url)"
        @delete="deleteLink(link.id)"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useMessage } from 'naive-ui'
import { POSITION, useToast } from 'vue-toastification'

import { LinkType } from 'types'

import CardSkeleton from './card-skeleton.vue'
import Card from './card.vue'

interface Props {
  links: LinkType[] | null
  loading: boolean
}

defineProps<Props>()
const refreshData = inject('refreshData') as () => void

const message = useMessage()
const headers = useRequestHeaders(['cookie']) as Record<string, string>

const { copy } = useClipboard()

const deleteLink = async (id: string) => {
  const isConfirmed = confirm('Do you realy want to delete this link?')
  if (!isConfirmed) return
  try {
    await $fetch(`/api/links/${id}`, { method: 'DELETE', headers })
    refreshData()
    message.success('Successfully deleted')
  } catch (error) {
    message.error('Something went wrong')
  }
}

const copyLink = async (value: string) => {
  await copy(value)
  message.success('Link copied')
}
</script>
