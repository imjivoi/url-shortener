import { nanoid } from 'nanoid'

import { createLink, getCustomer, parseMeta } from '../../services'


export default defineEventHandler(async (event) => {
  const user = await useServerSupabaseUser()
  if (!user) {
    throw createError({
      statusCode: 401,
    })
  }
  const config = useRuntimeConfig()

  const body = await readBody(event)

  const account = await getCustomer(user.id)

  if (account?.links_limit_exceeded) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Links limit exceeded',
    })
  }
  let original_url, title, alias, description, image_url
  ;({ original_url, title, alias } = body)

  if (title !== '') {
    try {
      const meta = await parseMeta(original_url)
      title = meta?.meta?.title || meta.og?.title
      description = meta.og?.description || meta.meta?.description
      image_url = meta.og?.image || meta.meta?.image
    } catch (error) {
      console.log(error)
      title = null
    }
  }

  if (!alias) {
    alias = nanoid(5).toLowerCase()
  }

  const { data, error } = await createLink({
    title,
    original_url,
    redirect_url: config.public.DOMAIN_URL + '/' + alias,
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

  await useStorage().setItem(`redis:${data.alias}`, data)

  return data
})
