import parser from 'html-metadata-parser'

import type { Database } from '../../db/database.types'

export async function createLink(body: Database['public']['Tables']['links']['Insert']) {
  const client = await useServerSupabaseClient()

  return await client.from('links').insert(body).select().single()
}

export async function deleteLink(id: string, userId: string) {
  const client = await useServerSupabaseClient()
  const { error } = await client.from('links').delete().eq('id', id).eq('user_id', userId)

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

  return client.from('links').select('*, clicks!inner()', { count: 'exact' })
}

export async function getLinkById(id: string, userId: string) {
  const client = await useServerSupabaseClient()

  const { data, error } = await client
    .from('links')
    .select('*, clicks(count)')
    .eq('id', id)
    .eq('user_id', userId)
    .single()

  if (error?.code === '404 not_found') {
    throw createError({
      statusCode: 404,
      statusMessage: 'Link not found',
    })
  }

  return data
}

export async function getLinkByParams(params: Partial<Database['public']['Tables']['links']['Row']>) {
  const client = await useServerSupabaseClient()

  const query = client.from('links').select('*, clicks(count)')

  if (params.id) {
    query.eq('id', params.id)
  }

  if (params.alias) {
    query.eq('alias', params.alias)
  }

  if (params.user_id) {
    query.eq('user_id', params.user_id)
  }

  if (params.original_url) {
    query.eq('original_url', params.original_url)
  }

  if (params.domain) {
    query.eq('domain', params.domain)
  }

  const { data, error } = await query

  if (error) {
    throw error
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

  const { data, count } = await client
    .from('links')
    .select('*, clicks(count)', { count: 'exact', head })
    .eq('user_id', userId)
    .order('created_at', { ascending: order === 'ASC' })
    .range(from, to)

  return { data, count }
}

export async function parseMeta(url: string) {
  const result = await parser.parser(url)
  return result
}

export async function updateLink(
  linkId: string,
  userId: string,
  body: Database['public']['Tables']['links']['Update'],
) {
  const config = useRuntimeConfig()
  const client = await useServerSupabaseClient()

  const { data, error } = await client
    .from('links')
    .update(body)
    .eq('id', linkId)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}
