<template>
  <shared-modal @update:model-value="close">
    <template #title>Create link</template>
    <form class="flex flex-col gap-4" @submit.prevent>
      <div>
        <label class="mb-2 text-sm">Original url</label>

        <u-input
          v-model:value="url"
          class="mt-2"
          label-top=""
          :status="$v.url.$error && 'error'"
          placeholder="https://facebook.com/profile/myprofile"
        />
        <label v-if="$v.url.$error" class="text-sm">
          <span v-for="(error, idx) in $v.url.$errors" :key="idx" class="text-red-500">
            {{ error.$message }}
          </span>
        </label>
      </div>
      <div>
        <div class="relative flex items-end gap-4">
          <div>
            <label class="text-sm">{{ $t('short_url') }}</label>
            <div class="flex gap-2 items-center">
              <div>
                <u-select-menu class="mt-2" v-model="domain" :items="domains" />
              </div>
              <div>
                <label class="text-xs"></label>
                <u-input
                  v-model:value="alias"
                  class="input mt-2"
                  placeholder="my-link"
                  :status="(aliasError || $v.alias.$error) && 'error'"
                ></u-input>
              </div>
            </div>
          </div>

          <u-button class="hidden sm:flex" quaternary type="primary" @click="generateAlias">
            {{ $t('button.generate') }}
          </u-button>
          <u-button
            class="sm:hidden"
            circle
            ghost
            type="primary"
            @click="generateAlias"
            icon="material-symbols:auto-mode-rounded"
          ></u-button>
        </div>
        <label v-if="aliasError || $v.alias.$error" class="text-sm">
          <span v-if="aliasError" class="text-red-500">{{ aliasError }}</span>
          <template v-if="$v.alias.$error">
            <span v-for="(error, idx) in $v.alias.$errors" :key="idx" class="text-red-500">
              {{ error.$message }}
            </span>
          </template>
        </label>
      </div>
      <!-- <div class="border border-gray-200 dark:border-gray-900 p-4 rounded-xl">
        <label class="mb-2 text-sm block">Optional</label>
        <UAccordion multiple :items="accordionItems">
          <template #og-parameters>
            <div class="flex flex-col gap-4">
              <div>
                <label class="text-sm">Title</label>
                <u-input
                  v-model="title"
                  class="mt-2"
                  :status="$v.title.$error && 'error'"
                  placeholder="My facebook profile"
                />
                <label v-if="$v.title.$error" class="text-sm">
                  <span v-for="(error, idx) in $v.title.$errors" :key="idx" class="text-red-500">
                    {{ error.$message }}
                  </span>
                </label>
              </div>
              <div>
                <label class="text-sm">Description</label>
                <u-textarea
                  v-model="description"
                  class="mt-2"
                  :status="$v.description.$error && 'error'"
                  placeholder="My incredible facebook profile description"
                />
                <label v-if="$v.description.$error" class="text-sm">
                  <span v-for="(error, idx) in $v.description.$errors" :key="idx" class="text-red-500">
                    {{ error.$message }}
                  </span>
                </label>
              </div>
            </div>
          </template>
          <template #utm-parameters>
            <div class="flex flex-col gap-4">
              <div>
                <label class="text-sm">Campaign</label>
                <u-input v-model="utmCampaign" class="mt-2" placeholder="summer_sale" />
              </div>
              <div>
                <label class="text-sm">Source</label>
                <u-input v-model="utmSource" class="mt-2" placeholder="facebook" />
              </div>
              <div>
                <label class="text-sm">Medium</label>
                <u-input v-model="utmMedium" class="mt-2" placeholder="social" />
              </div>
              <div>
                <label class="text-sm">Term</label>
                <u-input v-model="utmTerm" class="mt-2" placeholder="summer_sale" />
              </div>
              <div>
                <label class="text-sm">Content</label>
                <u-input v-model="utmContent" class="mt-2" placeholder="image_ad" />
              </div>
              <div>
                <label class="text-sm">ID</label>
                <u-input v-model="utmId" class="mt-2" placeholder="123" />
              </div>
              <div>
                <label class="text-sm">Source platform</label>
                <u-input v-model="utmSourcePlatform" class="mt-2" placeholder="facebook" />
              </div>
            </div>
          </template>
        </UAccordion>
      </div> -->
      <!-- <div>
        <label class="mt-2 text-xs">Title</label>
        <n-input
          v-model:value="title"
          class="mb-2"
          :status="$v.title.$error && 'error'"
          placeholder="My facebook profile"
        />
        <label v-if="$v.title.$error" class="text-sm">
          <span v-for="(error, idx) in $v.title.$errors" :key="idx" class="text-red-500">
            {{ error.$message }}
          </span>
        </label>
      </div> -->
    </form>
    <template #footer>
      <div class="flex justify-center gap-4">
        <u-button :loading="isLoading" @click="create">Create</u-button>
        <u-button @click="close" color="white">{{ $t('button.cancel') }}</u-button>
      </div>
    </template>
  </shared-modal>
</template>
<script lang="ts" setup>
// eslint-disable-next-line import/no-named-as-default
import useVuelidate from '@vuelidate/core'
import { minLength, maxLength, required, url as isUrl } from '@vuelidate/validators'

interface Props {
  onSuccess: () => void
  defaultUrl: string
}

const { defaultUrl, onSuccess } = defineProps<Props>()
const config = useRuntimeConfig()
const emits = defineEmits(['success', 'update:modelValue'])

const domains = [config.public.DOMAIN_URL]

const accordionItems = [
  {
    label: 'OG parameters',
    slot: 'og-parameters',
  },
  {
    label: 'UTM parameters',
    slot: 'utm-parameters',
  },
]

const domain = ref(domains[0])
const url = ref(defaultUrl || '')
const alias = ref('')
const title = ref('')
const description = ref('')
const utmCampaign = ref('')
const utmSource = ref('')
const utmMedium = ref('')
const utmTerm = ref('')
const utmContent = ref('')
const utmId = ref('')
const utmSourcePlatform = ref('')

const aliasError = ref('')

const isLoading = ref(false)

const rules = {
  url: { isUrl, required },
  alias: { minLength: minLength(3), maxLength: maxLength(20), required },
  title: { minLength: minLength(3), maxLength: maxLength(20) },
  description: { minLength: minLength(3), maxLength: maxLength(100) },
}

const $v = useVuelidate(rules, { url, alias, title, description })

const headers = useRequestHeaders(['cookie']) as Record<string, string>
const create = async () => {
  const isValid = await $v.value.$validate()
  if (!isValid) return
  isLoading.value = true
  try {
    await $fetch(`/api/links`, {
      method: 'POST',
      body: {
        title: title.value,
        original_url: url.value,
        alias: alias.value,
      },
      headers,
    })
    close()
    onSuccess()
  } catch (error: any) {
    if (error.statusCode === 403) {
      // toast.error(error?.statusMessage || 'You reached links limit')
    }
  } finally {
    isLoading.value = false
  }
}
const close = () => {
  emits('update:modelValue', false)
}
const resetErrors = () => {
  $v.value.$reset()
  aliasError.value = ''
}

const generateAlias = () => {
  alias.value = getRandomAlias()
}

const checkAlias = useDebounceFn(async () => {
  try {
    const response = await $fetch(`/api/links/alias/${alias.value}/check`, { headers })
    if (response.exists) {
      aliasError.value = 'Alias already exist'
    }
  } catch (error) {}
}, 800)

watch(alias, (val) => {
  if (val) {
    checkAlias()
  }
})

watch([alias, title, url], () => {
  resetErrors()
})
</script>
