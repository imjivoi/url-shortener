<template>
  <a href="#create-modal" class="btn btn-primary shadow-sm shadow-primary">
    <slot>Add your first link</slot>
  </a>
  <div id="create-modal" class="modal">
    <div class="modal-box text-left max-w-md">
      <h3 class="font-bold text-lg text-center">New link</h3>
      <form @submit.prevent>
        <label class="label">
          <span class="label-text">Title</span>
        </label>
        <input
          v-model="title"
          type="text"
          placeholder="My facebook profile"
          class="input input-primary input-bordered w-full"
        />
        <label class="label">
          <span class="label-text">Url</span>
        </label>
        <input
          v-model="url"
          type="text"
          placeholder="https://facebook.com/profile/blabla"
          class="input input-primary input-bordered w-full"
        />
      </form>
      <div class="modal-action">
        <button class="btn btn-primary" @click="create">Create</button>
        <a href="#" class="btn">Cancel</a>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const title = ref('')
const url = ref('')

const headers = useRequestHeaders(['cookie']) as Record<string, string>

const create = async () => {
  await $fetch('/api/links', {
    method: 'POST',
    body: {
      title: title.value,
      original_url: url.value,
    },
    headers,
  })
}
</script>
