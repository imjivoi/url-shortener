import { useSafeValidatedParams, z } from 'h3-zod'

export default defineEventHandler((event) => {
  const params = useSafeValidatedParams(
    event,
    z.object({
      alias: z.string(),
    }),
  )
  if (!params.success) {
    const formattedErrors = params.error.format()
    throw createError({
      message: 'Validation Error',
      statusCode: 400,
      data: formattedErrors,
    })
  }

  return useStorage().getItem(`redis:${params.data.alias}`)
})
