import { getTotalStatisticByUserId, getAllCustomers, updateCustomer } from '../../services'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { key } = getQuery(event)
  if (!key || key !== config.cronKey) {
    throw createError({
      statusCode: 405,
      statusMessage: 'Forbidden',
    })
  }

  try {
    const { data: customers } = await getAllCustomers()

    if (customers?.length) {
      for await (const customer of customers) {
        const { clicks, links } = await getTotalStatisticByUserId(customer.id)
        const isClicksExeceed = clicks > customer.clicks_limit
        const isLinksExeceed = links > customer.links_limit

        if (isClicksExeceed || isLinksExeceed) {
          await updateCustomer(event, customer.id, {
            ...(isClicksExeceed && { clicks_limit_exceeded: true }),
            ...(isLinksExeceed && { links_limit_exceeded: true }),
          })
        }
      }
    }
    return {
      success: true,
    }
  } catch (error) {
    console.log(error)

    throw createError({
      statusCode: 500,
      statusMessage: error?.message || error.data?.message,
    })
  }
})
