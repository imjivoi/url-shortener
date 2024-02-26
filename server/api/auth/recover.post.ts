import * as v from 'valibot'
import { updateUser } from '../../services/user'

export default defineWrappedEventHandler(async (event) => {
  const { password, access_token, refresh_token } = await useValidatedBody(
    event,
    v.objectAsync({
      password: v.string(),
      access_token: v.string(),
      refresh_token: v.string(),
    }),
  )

  const client = await useServerSupabaseClient()

  await client.auth.setSession({ access_token, refresh_token })

  const user = await updateUser({ password })

  setCookie(event, 'access-token', access_token, { httpOnly: true })
  setCookie(event, 'refresh-token', refresh_token, { httpOnly: true })

  return user
})
