import * as v from 'valibot'

import { createClick, getCustomerLimits, getLinkByAlias } from '../../../../services'
/**
 * TODO: сделать логгирование
 */
export default defineEventHandler(async (event) => {
  const { alias } = await useValidatedParams(event, v.objectAsync({ alias: v.string() }))

  const link = await getLinkByAlias(alias)

  if (link) {
    const limits = await getCustomerLimits(link.user_id)

    if (!limits?.clicks_limit_exceeded) {
      await createClick(link.id)
    }
  }
})
