import { H3Event } from 'h3'

import { getDomainWithoutWWW, getUserAgentData } from 'server/lib'
import { supabaseClient } from 'server/supabase'

export const createClick = async (event: H3Event, linkId: string) => {
  const client = supabaseClient(event)
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

  const referer = headers.referer as string
  const referer_url = getDomainWithoutWWW(referer)

  try {
    const { error } = await client.from('click').insert([
      {
        link_id: linkId,
        country,
        city,
        region,
        latitude,
        longitude,
        referer: referer || '(direct)',
        referer_url: referer_url || '(direct)',
        ip,
        ...userAgentData,
      },
    ])
  } catch (error) {
    console.log(error)
    return error
  }
}
