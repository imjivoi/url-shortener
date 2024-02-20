import * as v from 'valibot'
import { getLinkByAlias } from '../../../../services'

export default defineWrappedEventHandler(async (event) => {
  const { alias } = await useValidatedParams(
    event,
    v.objectAsync({
      alias: v.string(),
    }),
  )

  let link = await useStorage().getItem(`redis:${alias}`)

  if (!link) {
    link = await getLinkByAlias(alias)
    await useStorage().setItem(`redis:${alias}`, link)
  }

  return link
})
