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
        @delete="deleteLink(link)"
        @edit="openEditModal(link)"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useMessage } from 'naive-ui'

import { FeaturesUpdateLinkModal } from '#components'
import { LinkType } from 'types'

import CardSkeleton from './card-skeleton.vue'
import Card from './card.vue'

interface Props {
  links: LinkType[] | null
  loading: boolean
}

defineProps<Props>()
const refreshData = inject('refreshData') as () => void

const { t } = useI18n()
const message = useMessage()
const headers = useRequestHeaders(['cookie']) as Record<string, string>
const { copy } = useClipboard()
const modal = useModal()

const deleteLink = async (link: LinkType) => {
  const isConfirmed = confirm(t('confirm.remove_link'))
  if (!isConfirmed) return
  try {
    await $fetch(`/api/links/`, {
      method: 'DELETE',
      headers,
      query: {
        id: link.id,
        alias: link.alias,
      },
    })
    refreshData()
    message.success(t('messages.successfully_deleted'))
  } catch (error) {
    message.error(t('messages.something_went_wrong'))
  }
}

const copyLink = async (value: string) => {
  await copy(value)
  message.success(t('messages.link_copied'))
}

const openEditModal = (linkData: LinkType) => {
  modal.open({
    component: FeaturesUpdateLinkModal,
    bind: {
      link: linkData,
      onSuccess: () => {
        refreshData()
        message.success(t('messages.link_updated'))
      },
    },
  })
}
</script>
