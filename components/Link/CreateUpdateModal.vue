<template>
  <shared-modal @update:model-value="close">
    <template #title>{{ !!link ? 'Update link' : 'Create link' }}</template>
    <link-form :on-submit="update" :link="link" v-if="!!link" />
    <link-form :on-submit="create" :defaultUrl="defaultUrl" v-else />
  </shared-modal>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    title?: string
    onSuccess?: () => void
    link?: any
    defaultUrl?: string
  }>(),
  {
    title: 'Create link',
  },
)
const emits = defineEmits(['success', 'update:modelValue'])

const headers = useRequestHeaders(['cookie']) as Record<string, string>
const create = async (data) => {
  try {
    await $fetch(`/api/links`, {
      method: 'POST',
      body: data,
      headers,
    })
    close()
    props.onSuccess && props.onSuccess()
  } catch (error: any) {
    if (error.statusCode === 403) {
      // toast.error(error?.statusMessage || 'You reached links limit')
    }
  } finally {
  }
}

const update = async (data) => {
  try {
    await $fetch(`/api/links/${props.link.id}`, {
      method: 'PUT',
      body: data,
      headers,
    })
    close()
    props.onSuccess && props.onSuccess()
  } catch (error: any) {
    console.log(error)
    if (error.statusCode === 403) {
      // toast.error(error?.statusMessage || 'You reached links limit')
    }
  } finally {
  }
}
const close = () => {
  emits('update:modelValue', false)
}
</script>
