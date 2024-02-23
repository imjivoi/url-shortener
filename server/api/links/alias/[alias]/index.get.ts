import * as v from 'valibot'
import { getLinkByAlias } from '../../../../services'

export default defineCachedEventHandler(
  async (event) => {
    const { alias } = await useValidatedParams(
      event,
      v.objectAsync({
        alias: v.string(),
      }),
    )

    let result = await useStorage().getItem(`redis:${alias}`)

    if (!result) {
      result = await getLinkByAlias(alias)

      if (result) {
        await useStorage().setItem(`redis:${alias}`, result)
      }
    }

    return result
  },
  {
    getKey(event) {
      return event.context.params.alias
    },
    maxAge: 60 * 5,
  },
)
