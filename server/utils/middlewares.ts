export const auth = defineRequestMiddleware(async (req) => {
  const user = await useServerSupabaseUser().catch((err) => null)

  if (!user) {
    return sendError(req, createError({ statusMessage: 'Unauthorized', statusCode: 401 }))
  }
})

export const customer = defineRequestMiddleware(async (event) => {
  console.log(event.context)
})
