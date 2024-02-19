import * as v from 'valibot'

export default defineWrappedEventHandler(async (event) => {
  const { alias } = await useValidatedParams(
    event,
    v.objectAsync({
      alias: v.string(),
    }),
  )

  const client = await useServerSupabaseServiceRole()

  const result = await useStorage().getItem(`redis:${alias}`)

  const { data, error } = await client
    .from('links')
    .select('redirect_url, title, description, image_url')
    .eq('alias', alias)
    .single()

  if (error) {
    throw createError({
      statusCode: 501,
      statusMessage: 'Server error',
    })
  }

  return data
})
