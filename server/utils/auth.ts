export const auth = defineRequestMiddleware(async (req) => {
  const user = await useServerSupabaseUser()

  if (!user) {
    return sendError(req, createError({ statusMessage: 'Unauthorized', statusCode: 401 }))
  }
})

export const log = defineRequestMiddleware(async (req) => {
  console.log(req.method, req.path)
})
