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

    const result = await getLinkByParams({ alias, domain })
    const { id, user_id, ...linkData } = result[0]

    return linkData
  },
  {
    getKey(event) {
      return getCachedLinkKey(event.context.params)
    },
    group: 'link',
    name: '',
    maxAge: 60 * 1,
  },
)
