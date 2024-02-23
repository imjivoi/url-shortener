import * as v from 'valibot'

import { loginUser } from '../../../services/user'

export default defineEventHandler(async (event) => {
  const { email, password } = await useValidatedBody(
    event,
    v.objectAsync({
      email: v.string([v.email()]),
      password: v.string(),
    }),
  )

  return loginUser({ email, password })
})
