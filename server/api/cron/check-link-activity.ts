
export default defineEventHandler(async (event) => {
  // const client = serviceRoleClient(event)
  // const config = useRuntimeConfig()
  // const { key } = getQuery(event)

  // if (!key || key !== config.cronKey) {
  //   throw createError({
  //     statusCode: 405,
  //     statusMessage: 'Forbidden',
  //   })
  // }
  // const today = new Date()
  // const priorDate = new Date(new Date().setDate(today.getDate() - 30)).toISOString()
  // try {
  //   const { data: links } = await client
  //     .from('links')
  //     .select('created_at, clicks!inner(created_at), alias, id')
  //     .lt('clicks.created_at', priorDate)

  //   if (links?.length) {
  //     const ids = links.map((link) => link.id)
  //     await client.from('links').delete().in('id', ids)
  //     for await (const link of links) {
  //       await useStorage().removeItem(`redis:${link.alias}`)
  //     }
  //   }

  //   return {
  //     success: true,
  //   }
  // } catch (error) {
  //   console.log(error)
  //   throw createError({
  //     statusCode: 500,
  //     statusMessage: error?.message || error.data?.message,
  //   })
  // }
})
