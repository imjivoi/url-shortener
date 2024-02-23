import * as v from 'valibot'

import { getLinkByAlias } from '../../../../../services'

export default defineEventHandler(async (event) => {
  const { alias } = await useValidatedParams(event, v.objectAsync({ alias: v.string() }))
  const link = await getLinkByAlias(alias)
  if (link) {
    return {
      exists: true,
    }
  }
  return {
    exists: false,
  }
})
