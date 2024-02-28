<template>
  <u-form :state="formState" :validate="validateWithVuelidate" class="flex flex-col gap-4" @submit="submit">
    <div>
      <label class="mb-2 text-sm">Original url</label>
      <u-input
        v-model="formState.url"
        class="mt-2"
        label-top=""
        :status="$v.url.$error && 'error'"
        placeholder="https://facebook.com/profile/myprofile"
      />
      <small v-if="$v.url.$error" class="text-sm">
        <span v-for="(error, idx) in $v.url.$errors" :key="idx" class="text-red-500">
          {{ error.$message }}
        </span>
      </small>
    </div>
    <div>
      <div class="relative">
        <div>
          <label class="mb-2 text-sm">Short url</label>
          <div class="flex items-start gap-2 w-full">
            <div class="basis-1/3">
              <u-form-group name="domain">
                <u-select-menu v-model="formState.domain" :options="domains" :loading="isDomainsPending" />
              </u-form-group>
            </div>
            <div class="basis-2/3">
              <u-form-group name="alias" class="w-full">
                <u-input
                  class="w-full"
                  v-model="formState.alias"
                  placeholder="my-link"
                  :status="(aliasError || $v.alias.$error) && 'error'"
                ></u-input>
              </u-form-group>
            </div>
            <div class="basis-1/3">
              <u-button class="hidden sm:flex" block @click="generateAlias">Generate</u-button>
              <u-button
                class="sm:hidden"
                circle
                @click="generateAlias"
                icon="material-symbols:auto-mode-rounded"
              ></u-button>
            </div>
          </div>
        </div>
      </div>
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
    <div class="flex justify-center gap-4 mt-4">
      <u-button :loading="isLoading" type="submit">{{ !!link ? 'Save' : 'Create' }}</u-button>
      <u-button @click="close" color="white">Cancel</u-button>
    </div>
  </u-form>
</template>
<script setup lang="ts">
// eslint-disable-next-line import/no-named-as-default
import useVuelidate from '@vuelidate/core'
import { minLength, maxLength, required, url as isUrl } from '@vuelidate/validators'

interface Props {
  onSubmit: (data: any) => void
  defaultUrl?: string
  link?: any
}

const props = defineProps<Props>()
const emits = defineEmits(['success', 'update:modelValue'])

const { data: domains, pending: isDomainsPending } = useLazyAsyncData('domains', () => $fetch('/api/links/domains'))

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

const formState = ref({
  url: props.defaultUrl || props.link?.original_url || '',
  domain: props.link?.domain || '',
  alias: props.link?.alias || '',
  title: props.link?.title || '',
  description: props.link?.description || '',
  utmCampaign: props.link?.utm_campaign || '',
  utmSource: props.link?.utm_source || '',
  utmMedium: props.link?.utm_medium || '',
  utmTerm: props.link?.utm_term || '',
  utmContent: props.link?.utm_content || '',
  utmId: props.link?.utm_id || '',
  utmSourcePlatform: props.link?.utm_source_platform || '',
})

const aliasError = ref('')

const isLoading = ref(false)

const rules = {
  url: { isUrl, required },
  alias: { minLength: minLength(3), maxLength: maxLength(20), required },
  title: { minLength: minLength(3), maxLength: maxLength(100) },
  description: { minLength: minLength(3), maxLength: maxLength(200) },
}

const $v = useVuelidate(rules, formState)

async function validateWithVuelidate() {
  $v.value.$touch()
  await $v.value.$validate()
  return $v.value.$errors.map((error) => ({
    message: error.$message,
    path: error.$propertyPath,
  }))
}

async function submit() {
  console.log('test')

  const data = {
    original_url: formState.value.url,
    domain: formState.value.domain,
    alias: formState.value.alias,
    title: formState.value.title,
    description: formState.value.description,
    utm_campaign: formState.value.utmCampaign,
    utm_source: formState.value.utmSource,
    utm_medium: formState.value.utmMedium,
    utm_term: formState.value.utmTerm,
    utm_content: formState.value.utmContent,
    utm_id: formState.value.utmId,
    utm_source_platform: formState.value.utmSourcePlatform,
  }

  isLoading.value = true
  try {
    await props.onSubmit(data)
  } catch (error) {
  } finally {
    isLoading.value = false
  }
}
const close = inject('closeModal')
const resetErrors = () => {
  $v.value.$reset()
  aliasError.value = ''
}

const generateAlias = () => {
  formState.value.alias = getRandomAlias()
}

const checkAlias = useDebounceFn(async () => {
  try {
    const response = await $fetch(`/api/links/domain/${formState.value.domain}/alias/${formState.value.alias}/check`, {
      headers,
    })
    if (response.exists) {
      aliasError.value = 'Alias already exist'
    }
  } catch (error) {}
}, 800)

watch(
  () => [formState.value.alias, formState.value.domain],
  (val) => {
    if (formState.value.alias && formState.value.domain) {
      checkAlias()
    }
  },
)

watch(domains, (val) => {
  if (!formState.value.domain) {
    formState.value.domain = val[0]
  }
})
</script>
