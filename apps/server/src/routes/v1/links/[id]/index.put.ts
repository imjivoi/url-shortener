import * as v from 'valibot'

import { updateLink } from '../../../../services'

export default defineAuthEventHandler(async (event) => {
  const { id } = await useValidatedParams(event, v.objectAsync({ id: v.string([v.uuid()]) }))

  const body = await useValidatedBody(event)

  const data = await updateLink(id, body)

  await useStorage().setItem(`redis:${data.alias}`, { original_url: data.original_url })

  return data
})
