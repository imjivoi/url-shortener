import * as v from 'valibot'

import { linkSchema } from '../../../schemas'

import { getLinkById, parseMeta, updateLink } from '../../../services'

import { DEFAULT_DOMAINS } from '../../../constants'

const DOMAIN_LIST = [...(import.meta.dev ? ['localhost:3000'] : []), ...DEFAULT_DOMAINS]

export default defineAuthEventHandler(async (event, user) => {
  const { id: linkId } = await useValidatedParams(event, v.objectAsync({ id: v.string([v.uuid()]) }))

  let { title, description, alias, domain, original_url, utm_campaign, utm_content, utm_medium, utm_source, utm_term } =
    await useValidatedBody(event, linkSchema)

  if (domain && !DOMAIN_LIST.includes(domain)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid domain',
    })
  }

  if (!alias) {
    alias = getRandomAlias()
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
  const link = await getLinkById(linkId, user.id)

  if (link?.alias !== alias || link?.domain !== domain) {
    const storage = useStorage('cache')
    await storage.removeItem(`link:item:${getCachedLinkKey(link)}.json`)
  }
  const data = await updateLink(linkId, user.id, {
    title,
    description,
    alias,
    domain,
    original_url: getUrlWithUtmParams(original_url, { utm_campaign, utm_content, utm_medium, utm_source, utm_term }),
    image_url,
    redirect_url: prefix + domain + '/' + alias,
    utm_campaign,
    utm_content,
    utm_medium,
    utm_source,
    utm_term,
  })
  const { id, user_id, ...linkData } = data
  event.waitUntil($fetch(`/api/links/domain/${domain}/alias/${alias}`))
  // await useStorage().setItem(getCachedLinkKey(data), linkData)

  return data
})
