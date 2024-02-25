import * as v from 'valibot'

import { updateLink } from '../../../services'

export default defineAuthEventHandler(async (event) => {
  const { id: linkId } = await useValidatedParams(event, v.objectAsync({ id: v.string([v.uuid()]) }))

  const body = await useValidatedBody(
    event,
    v.objectAsync({
      title: v.optional(v.string()),
      description: v.optional(v.string()),
      alias: v.optional(v.string()),
      domain: v.optional(v.string()),
    }),
  )

  const data = await updateLink(linkId, body)
  const { id, user_id, ...linkData } = data

  await useStorage().setItem(getCachedLinkKey(data), linkData)

  return data
})
