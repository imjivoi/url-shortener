import * as v from 'valibot'
import { getLinkByParams } from '../../../../../../services'

// export default defineWrappedEventHandler(async (event) => {
//   const { alias, domain } = await useValidatedParams(
//     event,
//     v.objectAsync({
//       alias: v.string(),
//       domain: v.string(),
//     }),
//   )

//   const links = await getLinkByParams({ alias, domain })

//   return links[0]
// })

export default defineCachedEventHandler(
  async (event) => {
    const { alias, domain } = await useValidatedParams(
      event,
      v.objectAsync({
        alias: v.string(),
        domain: v.string(),
      }),
    )

    let result = await useStorage().getItem(getCachedLinkKey({ alias, domain }))

    if (!result) {
      result = await getLinkByParams({ alias, domain })

      if (result?.[0]) {
        const { id, user_id, ...linkData } = result

        await useStorage().setItem(getCachedLinkKey({ alias, domain }), linkData)
      }
    }

    return result
  },
  {
    getKey(event) {
      return getCachedLinkKey(event.context.params)
    },
    maxAge: 60 * 5,
  },
)
