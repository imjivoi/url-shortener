import * as v from 'valibot'

import { createClick, getCustomerLimits, getLinkByParams } from '../../../../../../services'
/**
 * TODO: сделать логгирование
 */
export default defineWrappedEventHandler(async (event) => {
  const { alias, domain } = await useValidatedParams(event, v.objectAsync({ alias: v.string(), domain: v.string() }))

  const link = await getLinkByParams({ alias, domain })

  if (link?.[0]) {
    const limits = await getCustomerLimits(link?.[0].user_id)

    if (!limits?.clicks_limit_exceeded) {
      await createClick(link?.[0].id)
    }
  }
})
