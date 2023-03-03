<template>
  <div v-if="linksStatistic" class="text-center mb-12">
    <entity-links-total-statistic :statistic="linksStatistic" />
  </div>
  <widget-links-list />
</template>
<script lang="ts" setup>
import { EntityLinksTotalStatistic } from 'entities/url'
import { WidgetLinksList } from 'widgets/links'

const headers = useRequestHeaders(['cookie']) as Record<string, string>
const { data: linksStatistic, pending: pendingLinksStatistic } = useLazyFetch('/api/links/statistic', { headers })
</script>
