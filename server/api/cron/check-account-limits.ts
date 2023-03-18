import { getTotalStatisticByUserId, getAllAccounts, updateAccount } from 'server/model'

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
    const { data: accounts } = await getAllAccounts(event)
    if (accounts?.length) {
      for await (const account of accounts) {
        const { clicks, links } = await getTotalStatisticByUserId(event, account.id)
        const isClicksExeceed = clicks && clicks > account.clicks_limit
        const isLinksExeceed = links && links > account.links_limit
        if (isClicksExeceed || isLinksExeceed) {
          await updateAccount(event, account.id, {
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
