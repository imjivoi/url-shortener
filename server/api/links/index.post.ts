import * as v from 'valibot'

import { createLink, getCustomer, getLinkByParams, parseMeta } from '../../services'

import { DEFAULT_DOMAINS } from '../../constants'

const DOMAIN_LIST = [...(import.meta.dev ? ['localhost:3000'] : []), ...DEFAULT_DOMAINS]

export default defineAuthEventHandler(async (event, user) => {
  let { original_url, title, description, alias, domain } = await useValidatedBody(
    event,
    v.objectAsync({
      original_url: v.string(),
      title: v.optional(v.string()),
      description: v.optional(v.string()),
      alias: v.optional(v.string()),
      domain: v.optional(v.string()),
    }),
  )

  if (domain && !DOMAIN_LIST.includes(domain)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid domain',
    })
  }

  const account = await getCustomer(user.id)

  if (account?.links_limit_exceeded) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Links limit exceeded',
    })
  }

  if (!alias) {
    alias = getRandomAlias()
  }

  const existedLink = await getLinkByParams({ alias, domain })

  if (existedLink?.length) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Link with such params already exists',
    })
  }

  if (!domain) {
    domain = DOMAIN_LIST[0]
  }

  let image_url = null

  if (!title) {
    try {
      const meta = await parseMeta(original_url)
      title = meta?.meta?.title || meta.og?.title
      description = meta.og?.description || meta.meta?.description
      image_url = meta.og?.image || meta.meta?.image
    } catch (error) {
      console.log(error)
      title = ''
    }
  }

  const prefix = domain === 'localhost:3000' ? 'http://' : 'https://'

  const { data, error } = await createLink({
    domain,
    title,
    original_url,
    redirect_url: prefix + domain + '/' + alias,
    alias,
    description,
    image_url,
    user_id: user.id,
  })

  if (error || !data) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Server error',
    })
  }

  //prefetch to cache
  await $fetch('/api/links/domain/' + domain + '/alias/' + alias)
  const { id, user_id, ...linkData } = data

  return data
})
