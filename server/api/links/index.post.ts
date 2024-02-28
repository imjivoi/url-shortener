import { linkSchema } from '../../schemas'

import { createLink, getCustomer, getLinkByParams, parseMeta } from '../../services'

import { DEFAULT_DOMAINS } from '../../constants'

const DOMAIN_LIST = [...(import.meta.dev ? ['localhost:3000'] : []), ...DEFAULT_DOMAINS]

export default defineAuthEventHandler(async (event, user) => {
  let { original_url, title, description, alias, domain, utm_campaign, utm_content, utm_medium, utm_source, utm_term } =
    await useValidatedBody(event, linkSchema)

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

  const meta = await parseMeta(original_url)

  if (!title) {
    title = meta?.meta?.title || meta.og?.title
  }

  if (!description) {
    description = meta.og?.description || meta.meta?.description
  }

  if (!image_url) {
    image_url = meta.og?.image || meta.meta?.image
  }

  const prefix = domain === 'localhost:3000' ? 'http://' : 'https://'

  const { data, error } = await createLink({
    domain,
    title,
    original_url: getUrlWithUtmParams(original_url, { utm_campaign, utm_content, utm_medium, utm_source, utm_term }),
    redirect_url: prefix + domain + '/' + alias,
    alias,
    description,
    image_url,
    user_id: user.id,
    utm_campaign,
    utm_content,
    utm_medium,
    utm_source,
    utm_term,
  })

  if (error || !data) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Server error',
    })
  }

  //prefetch to cache\
  event.waitUntil($fetch('/api/links/domain/' + domain + '/alias/' + alias))
  const { id, user_id, ...linkData } = data

  return data
})
