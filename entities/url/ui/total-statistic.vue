<template>
  <div>
    <h2 class="mb-2 text-2xl font-bold">Statistic</h2>
    <div class="stats stats-horizontal shadow">
      <div class="stat">
        <div class="stat-figure text-primary">
          <Icon name="tabler:link" />
        </div>
        <div class="stat-title">Links</div>
        <div class="stat-value text-primary">
          {{ statistic.links }}
        </div>
      </div>

      <div class="stat">
        <div class="stat-figure text-secondary">
          <Icon name="tabler:hand-click" />
        </div>
        <div class="stat-title">Clicks</div>
        <div class="stat-value text-secondary">
          {{ statistic.clicks }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TotalLinktatisticType } from '../../../shared/types'

interface Props {
  statistic: TotalLinktatisticType
}

defineProps<Props>()
</script>
