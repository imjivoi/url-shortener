import { useSafeValidatedBody } from 'h3-zod'
import { nanoid } from 'nanoid'

import { createLink, getAccount, parseMeta } from 'server/model'
import { CreateUrlSchema } from 'types'

import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({
      statusCode: 401,
    })
  }
  const config = useRuntimeConfig()

  const body = await useSafeValidatedBody(event, CreateUrlSchema)

  if (!body.success) {
    const formattedErrors = body.error.format()
    throw createError({
      message: 'Validation Error',
      statusCode: 400,
      data: formattedErrors,
    })
  }

  const account = await getAccount(event, user.id)

  if (account?.links_limit_exceeded) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Links limit exceeded',
    })
  }
  let original_url, title, alias, description, image_url
  ;({ original_url, title, alias } = body.data)

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
    alias = nanoid(5)
  }

  const { data, error } = await createLink(event, {
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

  await useStorage().setItem(`redis:${data.alias}`, { original_url: data.original_url })

  return data
})
