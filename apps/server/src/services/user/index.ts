export async function loginUser(data) {
  const client = await useServerSupabaseClient()

  const {
    data: { user, session },
    error,
  } = await client.auth.signInWithPassword(data)

  if (error || !user) {
    throw createError({
      message: error?.message,
      statusCode: 400,
    })
  }
  const event = useEvent()
  setCookie(event, 'access-token', session?.access_token as string, { httpOnly: true })
  setCookie(event, 'refresh-token', session?.refresh_token as string, { httpOnly: true })

  return user
}

export async function logoutUser() {
  const client = await useServerSupabaseClient()
  const { error } = await client.auth.signOut()

  if (error) {
    throw createError({
      message: error.message,
      statusCode: 500,
    })
  }

  const event = useEvent()
  deleteCookie(event, 'access-token')
  deleteCookie(event, 'refresh-token')
}

export async function registerUser(body) {
  const client = await useServerSupabaseClient()
  const { data, error } = await client.auth.signUp(body)

  if (error) {
    throw createError({
      message: error?.message,
      statusCode: 400,
    })
  }

  const event = useEvent()
  setCookie(event, 'access-token', data.session?.access_token as string, { httpOnly: true })
  setCookie(event, 'refresh-token', data.session?.refresh_token as string, { httpOnly: true })

  return data.user
}

export async function requestPasswordRecover(body) {
  const client = await useServerSupabaseClient()

  const config = useRuntimeConfig()
  const { data, error } = await client.auth.resetPasswordForEmail(body.email, {
    redirectTo: config.public.DOMAIN_URL + '/auth/recover',
  })

  if (error) {
    throw createError({
      message: error?.message,
      statusCode: 400,
    })
  }
}

export async function updateUser(body) {
  const client = await useServerSupabaseClient()
  const { data, error } = await client.auth.updateUser(body)

  if (error) {
    throw createError({
      message: error?.message,
      statusCode: 500,
    })
  }

  return data.user
}
