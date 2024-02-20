export const useServerSupabaseUser = async () => {
  const event = useEvent()
  const client = await useServerSupabaseClient()

  const {
    data: { user: supabaseUser },
    error,
  } = await client.auth.getUser()

  if (error) {
    throw createError({ statusMessage: error?.message })
  }

  event.context._user = error ? null : supabaseUser
  return event.context._user as typeof supabaseUser
}
