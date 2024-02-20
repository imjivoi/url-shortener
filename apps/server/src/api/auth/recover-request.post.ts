import * as v from 'valibot'
import { requestPasswordRecover } from '../../services/user'

export default defineWrappedEventHandler(async (event) => {

  const {email} = await useValidatedBody(event, v.objectAsync({
    email: v.string([v.email()]),
  }))


  return requestPasswordRecover({email})
})