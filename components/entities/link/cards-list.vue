<template>
  <div v-if="loading" class="flex flex-col gap-4">
    <card-skeleton v-for="i in 4" :key="i" />
  </div>
  <div v-else-if="links?.length">
    <div class="flex flex-col gap-4 list">
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
import { FeaturesUpdateLinkModal } from '#components'

import CardSkeleton from './card-skeleton.vue'
import Card from './card.vue'

interface Props {
  links: any[] | null
  loading: boolean
}

defineProps<Props>()
const emits = defineEmits(['onRemove', 'onCreate'])

const { t } = useI18n()
const headers = useRequestHeaders(['cookie']) as Record<string, string>
const { copy } = useClipboard()
const modal = useModal()
const toast = useToast()

const deleteLink = async (link) => {
  const isConfirmed = confirm(t('confirm.remove_link'))
  if (!isConfirmed) return
  try {
    await $fetch(`/api/links/${link.id}`, {
      method: 'DELETE',
      headers,
    })
    emits('onRemove', link.id)
    // message.success(t('messages.successfully_deleted'))
  } catch (error) {
    // message.error(t('messages.something_went_wrong'))
  }
}

const copyLink = async (value: string) => {
  await copy(value)
  toast.add({ title: t('messages.link_copied') })
}

const openEditModal = (linkData) => {
  modal.open({
    component: FeaturesUpdateLinkModal,
    bind: {
      link: linkData,
      onSuccess: () => {
        emits('onCreate')
        // message.success(t('messages.link_updated'))
      },
    },
  })
}
</script>
<style scoped lang="scss">
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
