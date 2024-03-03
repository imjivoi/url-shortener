import { getDomainWithoutWWW, getUserAgentData } from '../../lib'
import { dateRangeConfig } from '../../constants'
import type { DateRangetype } from '../../../types'
import { getLinkByAlias } from '../link'
import { getCustomer} from '../customer'

export async function createClick(linkId: string) {
  const event = useEvent()
  const client = await useServerSupabaseClient()
  const { headers } = event.node.req

  const cityHeader = headers['x-vercel-ip-city'] as string
  const city = cityHeader ? decodeURIComponent(cityHeader) : ''

  const countryHeader = headers['x-vercel-ip-country'] as string
  const country = countryHeader ? decodeURIComponent(countryHeader) : ''

  const regionHeader = headers['x-vercel-ip-country-region'] as string
  const region = countryHeader ? decodeURIComponent(regionHeader) : ''

  const latitudeHeader = headers['x-vercel-ip-latitude'] as string
  const latitude = latitudeHeader ? decodeURIComponent(latitudeHeader) : ''

  const longitudeHeader = headers['x-vercel-ip-longitude'] as string
  const longitude = longitudeHeader ? decodeURIComponent(longitudeHeader) : ''

  const ipHeader = headers['x-forwarded-for'] as string
  const ip = ipHeader ? ipHeader.split(',')[0] : ''

  const userAgentHeader = headers['user-agent'] as string
  const userAgentData = getUserAgentData(userAgentHeader)

  const referer_url = headers.referer as string
  const referer = getDomainWithoutWWW(referer_url)

  const { error } = await client.from('clicks').insert([
    {
      link_id: linkId,
      country,
      city,
      region,
      latitude,
      longitude,
      referer: referer || '(direct)',
      referer_url: referer_url || '(direct)',
      ...userAgentData,
    },
  ])
  if (error) {
    throw error
  }
}

interface Options {
  from: string
}

export async function getByLinkId(linkId: string, options?: Options) {
  const client = await useServerSupabaseClient()

  const { data, error } = await client
    .from('clicks')
    .select()
    .eq('link_id', linkId)
    .gte('created_at', options?.from)

  if (error) {
    throw error
  }

  return data
}

export async function getTotalStatisticByUserId(userId: string) {
  const client = await useServerSupabaseClient()

  const [{ count: links, error: linksError }, { count: clicks, error: clicksError }] = await Promise.all([
    client.from('links').select('*', { count: 'exact', head: true }).eq('user_id', userId),
    client.from('clicks').select('links!inner()', { count: 'exact', head: true }).eq('links.user_id', userId),
  ])

  return {
    links,
    clicks,
  }
}

export async function createStatistic(alias: string) {
  const link = await getLinkByAlias(alias)

  if (link) {
    const customer = await getCustomer(link.user_id)

    if (!customer?.clicks_limit_exceeded) {
      await createClick(link.id)
    }
  }
}