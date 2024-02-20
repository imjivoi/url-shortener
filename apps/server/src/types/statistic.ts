export type StatisticType = {
  bot: boolean | null
  browser: string | null
  browser_version: string | null
  city: string | null
  country: string | null
  cpu_architecture: string | null
  created_at: string
  device: string | null
  device_model: string | null
  device_vendor: string | null
  engine: string | null
  engine_version: string | null
  id: string
  ip: string | null
  latitude: string | null
  link_id: string | null
  longitude: string | null
  os: string | null
  os_version: string | null
  referer: string | null
  referer_url: string | null
  region: string | null
  ua: string | null
}

export type DateRangetype = 'today' | 'week' | 'month' | 'year'
