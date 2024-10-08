import parser from 'html-metadata-parser'

import type { Database } from '../../db/database.types'

export async function createLink(body: Database['public']['Tables']['links']['Insert']) {
  const client = await useServerSupabaseClient()

  return await client.from('links').insert(body).select().single()
}

export async function deleteLink(id: string) {
  const client = await useServerSupabaseClient()
  const { error } = await client.from('links').delete().eq('id', id)

  if (error) {
    throw error
  }
}

export async function getLinkByAlias(alias: string) {
  const client = await useServerSupabaseServiceRole()
  const { data } = await client.from('links').select().eq('alias', alias).single()

  return data
}

export async function getAllLinks() {
  const client = await useServerSupabaseServiceRole()

  return await client.from('links').select('*, clicks!inner()', { count: 'exact' })
}

export async function getLinkById(id: string) {
  const client = await useServerSupabaseClient()

  const { data, error } = await client.from('links').select('*, clicks(count)').eq('id', id).single()

  if (error?.code === '404 not_found') {
    throw createError({
      statusCode: 404,
      statusMessage: 'Link not found',
    })
  }

  return data
}

interface Options {
  from?: number
  to?: number
  order?: 'ASC' | 'DESC'
  head?: boolean
}

export async function getLinksByUserId(userId: string, options?: Options) {
  const from = options?.from || 0
  const to = options?.to || 100
  const order = options?.order || 'DESC'
  const head = options?.head

  const client = await useServerSupabaseClient()

  return await client
    .from('links')
    .select('*, clicks(count)', { count: 'exact', head })
    .eq('user_id', userId)
    .order('created_at', { ascending: order === 'ASC' })
    .range(from, to)
}

export async function parseMeta(url: string) {
  const result = await parser.parser(url)
  return result
}

export async function updateLink(linkId: string, body: Database['public']['Tables']['links']['Update']) {
  const config = useRuntimeConfig()
  const client = await useServerSupabaseClient()

  const { data, error } = await client
    .from('links')
    .update({
      ...body,
      ...(body.alias && { redirect_url: config.public.DOMAIN_URL + '/' + body.alias }),
      updated_at: new Date().toISOString(),
    })
    .eq('id', linkId)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}
