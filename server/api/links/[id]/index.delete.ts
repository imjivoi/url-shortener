import * as v from 'valibot'

import { deleteLink, getLinkById } from '../../../services'

export default defineAuthEventHandler(async (event) => {
  const { id } = await useValidatedParams(
    event,
    v.objectAsync({
      id: v.string([v.uuid()]),
    }),
  )

  const link = await getLinkById(id)

  if (link) {
    await deleteLink(link!.id)

    await useStorage().removeItem(getCachedLinkKey(link))
  }

  setResponseStatus(event, 204)
  return
})
