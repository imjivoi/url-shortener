import * as v from 'valibot'
import { registerUser } from '../../services/user'

export default defineWrappedEventHandler(async (event) => {
  const { email, password } = await useValidatedBody(
    event,
    v.objectAsync({
      email: v.string([v.email()]),
      password: v.string(),
    }),
  )

  return registerUser({ email, password })
})
