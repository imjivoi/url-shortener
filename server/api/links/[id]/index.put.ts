import * as v from 'valibot'

import { getLinkById, parseMeta, updateLink } from '../../../services'

import { DEFAULT_DOMAINS } from '../../../constants'

const DOMAIN_LIST = [...(import.meta.dev ? ['localhost:3000'] : []), ...DEFAULT_DOMAINS]

export default defineAuthEventHandler(async (event, user) => {
  const { id: linkId } = await useValidatedParams(event, v.objectAsync({ id: v.string([v.uuid()]) }))

  let { title, description, alias, domain, original_url } = await useValidatedBody(
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

  if (!alias) {
    alias = getRandomAlias()
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
    original_url,
    image_url,
    redirect_url: prefix + domain + '/' + alias,
  })
  const { id, user_id, ...linkData } = data
  event.waitUntil($fetch(`/api/links/domain/${domain}/alias/${alias}`))
  // await useStorage().setItem(getCachedLinkKey(data), linkData)

  return data
})
