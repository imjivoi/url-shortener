import * as v from 'valibot'

import { deleteLink, getLinkById } from '../../../services'

export default defineAuthEventHandler(async (event, user) => {
  const { id } = await useValidatedParams(
    event,
    v.objectAsync({
      id: v.string([v.uuid()]),
    }),
  )

  const link = await getLinkById(id, user.id)

  if (link) {
    await deleteLink(link!.id, user.id)
    const storage = useStorage('cache')
    await storage.removeItem(`link:item:${getCachedLinkKey(link)}.json`)
  }

  setResponseStatus(event, 204)
  return
})
