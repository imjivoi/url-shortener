<template>
  <div class="text-center mb-12">
    <entity-statistic-total :statistic="statisticData" :loading="pendingStatisticData" class="mb-10"/>
    <entity-links-list :links="linksData?.data || null" :loading="pendingLinksData" />
    <div class="mt-16">
      <feature-create-link-trigger @success="refreshData" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { EntityLinksList } from 'entities/link'
import { EntityStatisticTotal } from 'entities/statistic'
import { FeatureCreateLinkTrigger } from 'features/create-link'

const headers = useRequestHeaders(['cookie']) as Record<string, string>
const {
  data: linksData,
  pending: pendingLinksData,
  refresh: refreshLinksData,
} = useLazyFetch('/api/links', { headers })
const {
  data: statisticData,
  pending: pendingStatisticData,
  refresh: refreshStatisticData,
} = useLazyFetch('/api/links/statistic', { headers })

const refreshData = () => {
  refreshLinksData()
  refreshStatisticData()
}

provide('refreshData', refreshData)
</script>
