import * as v from 'valibot'

import { getLinkById } from '../../../services'

export default defineAuthEventHandler(async (event, user) => {
  const { id } = await useValidatedParams(event, v.objectAsync({ id: v.string([v.uuid()]) }))

  const data = await getLinkById(id, user.id)
  return { ...data, clicks: data.clicks && Array.isArray(data.clicks) && data.clicks[0].count }
})
