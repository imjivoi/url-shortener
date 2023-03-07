// import { geolocation } from '@vercel/edge'
import { H3Event } from 'h3'

import { supabaseClient } from 'server/supabase'

export const createClick = async (event: H3Event, linkId: string) => {
  // const client = supabaseClient(event)

  // const { req } = event.node
  // let geo = {}
  // let ua = {}
  // let referer = ''
  // try {
  //   geo = process.env.NODE_ENV === 'production' ? geolocation(req) : {}
  //   ua = getHeader(event, 'user-agent')
  //   referer = getHeader(event, 'referer')
  //   const { error } = await client.from('click').insert([
  //     {
  //       link_id: linkId,
  //       country: geo?.country || 'Unknown',
  //       city: geo?.city || 'Unknown',
  //       region: geo?.region || 'Unknown',
  //       latitude: geo?.latitude || 'Unknown',
  //       longitude: geo?.longitude || 'Unknown',
  //       ua: ua?.ua || 'Unknown',
  //       browser: ua?.browser?.name || 'Unknown',
  //       browser_version: ua?.browser?.version || 'Unknown',
  //       engine: ua?.engine?.name || 'Unknown',
  //       engine_version: ua?.engine?.version || 'Unknown',
  //       os: ua?.os?.name || 'Unknown',
  //       os_version: ua?.os?.version || 'Unknown',
  //       device: ua?.device?.type ? ua?.device?.type : 'Desktop',
  //       device_vendor: ua?.device?.vendor || 'Unknown',
  //       device_model: ua?.device?.model || 'Unknown',
  //       cpu_architecture: ua?.cpu?.architecture || 'Unknown',
  //       bot: ua?.isBot,
  //       referer: referer || '(direct)',
  //       referer_url: referer || '(direct)',
  //     },
  //   ])
  // } catch (error) {
  //   console.log(error)
  //   return error
  // }
}
