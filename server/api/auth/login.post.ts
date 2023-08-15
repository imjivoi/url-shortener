import { useSafeValidatedBody, z } from 'h3-zod'

import { supabaseClient } from 'server/supabase'

export default defineEventHandler(async (event) => {
  const body = await useSafeValidatedBody(
    event,
    z.object({
      email: z.string().email(),
      password: z.string().min(6).max(30),
    }),
  )

  if (!body.success) {
    const formattedErrors = body.error.format()

    throw sendError(
      event,
      createError({
        message: 'Validation Error',
        statusCode: 400,
        data: formattedErrors,
      }),
    )
  }

  const client = supabaseClient(event)

  const {
    data: { user, session },
    error,
  } = await client.auth.signInWithPassword(body.data)

  if (error || !user) {
    throw sendError(
      event,
      createError({
        message: 'User not found. Check your credentials',
        statusCode: 400,
      }),
    )
  }
  if (session) {
    await client.auth.setSession({ access_token: session?.access_token, refresh_token: session?.refresh_token })
    setCookie(event, 'access_token', session?.access_token)
    setCookie(event, 'refresh_token', session?.refresh_token)
  }

  return user
})
