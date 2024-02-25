import * as v from 'valibot'

import { getLinkByParams } from '../../../../../../services'


export default defineAuthEventHandler(async (event, user) => {
  const { alias, domain } = await useValidatedParams(event, v.objectAsync({ alias: v.string(), domain: v.string() }))
  const link = await getLinkByParams({ alias, domain, user_id: user.id })
  if (link?.length) {
    return {
      exists: true,
    }
  }
  return {
    exists: false,
  }
})
