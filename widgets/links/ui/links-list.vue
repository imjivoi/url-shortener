<template>
  <div v-if="!pending && !linksData?.length" class="flex items-center justify-center">
    <feature-create-link-trigger @success="refresh" />
  </div>
  <div v-if="linksData?.length">
    <h2 class="mb-2 text-2xl font-bold text-center">Links</h2>
    <entity-link-card
      v-for="link in linksData"
      :key="link.id"
      :link="link"
      @copy="copyLink(link.redirect_url)"
      @delete="openConfirmDeleteModal"
    />
    <div class="mt-10 text-center">
      <feature-create-link-trigger @success="refresh" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'
import { useModal } from 'vue-final-modal'
import { useToast } from 'vue-toastification'

import { EntityLinkCard } from 'entities/url'
import { FeatureCreateLinkTrigger } from 'features/create-link'
import ConfirmModal from 'shared/ui/confirm-modal.vue'

const { copy } = useClipboard()
const toast = useToast()
const { open: openConfirmDeleteModal } = useModal({
  component: ConfirmModal,
  attrs: {
    title: 'Do you realy want to delete this link?',
  },
})

const headers = useRequestHeaders(['cookie']) as Record<string, string>

const { data: linksData, pending, refresh } = useLazyFetch('/api/links', { headers })

const copyLink = async (value: string) => {
  await copy(value)
  toast.success('Link copied')
}

const deleteLink = async (id: string) => {
  const isConfirmed = confirm('Do you realy want to delete link?')

  if (isConfirmed) {
    try {
      await $fetch(`/api/links/${id}`, { method: 'DELETE', headers })
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
