import * as v from 'valibot'

import { createClick, getCustomer, getLinkByParams } from '../../../../../../services'
/**
 * TODO: сделать логгирование
 */
export default defineWrappedEventHandler(async (event) => {
  const { alias, domain } = await useValidatedParams(event, v.objectAsync({ alias: v.string(), domain: v.string() }))

  const link = await getLinkByParams({ alias, domain })

  if (link?.[0]) {
    const customer = await getCustomer(link?.[0].user_id)

    if (!customer?.clicks_limit_exceeded) {
      await createClick(link?.[0].id)
    }
  }
})
