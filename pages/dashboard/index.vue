<template>
  <div v-if="!pending && !urlsData?.length" class="h-full flex items-center justify-center">
    <a href="#create-modal" class="btn btn-primary">Add your first url</a>
    <div id="create-modal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">New url</h3>
        <form @submit.prevent>
          <label class="label">
            <span class="label-text">Title</span>
          </label>
          <input
            v-model="title"
            type="text"
            placeholder="ex:Facebook homepage"
            class="input input-primary input-bordered w-full max-w-xs"
          />
          <label class="label">
            <span class="label-text">Url</span>
          </label>
          <input
            v-model="url"
            type="text"
            placeholder="ex:https://facebook.com"
            class="input input-primary input-bordered w-full max-w-xs"
          />
        </form>
        <div class="modal-action">
          <button class="btn btn-primary" @click="create">Create</button>
          <a href="#" class="btn">Cancel</a>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="urlsData?.length">
    <entities-url-card v-for="url in urlsData" :key="url.id" :url="url"></entities-url-card>
  </div>
</template>
<script lang="ts" setup>
import { EntitiesUrlCard } from 'entities/url'

const title = ref('')
const url = ref('')

const create = async () => {
  await $fetch('/api/url', {
    method: 'POST',
    body: {
      title: title.value,
      original_url: url.value,
    },
  })
}

const headers = useRequestHeaders(['cookie']) as Record<string, string>
const { data: urlsData, pending } = useLazyFetch('/api/url', { headers })
</script>
