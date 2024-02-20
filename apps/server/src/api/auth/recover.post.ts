import * as v from 'valibot'
import { updateUser } from '../../services/user'

export default defineWrappedEventHandler(async (event) => {
  const { passowrd, access_token, refresh_token } = await useValidatedBody(
    event,
    v.objectAsync({
      passowrd: v.string(),
      access_token: v.string(),
      refresh_token: v.string(),
    }),
  )

  const client = await useServerSupabaseClient()

  await client.auth.setSession({ access_token, refresh_token })

  return updateUser({ passowrd })
})
