import { DEFAULT_DOMAINS } from '../../../constants'

export default defineAuthEventHandler(async (event, user) => {
  return [...(import.meta.dev ? ['localhost:3000'] : []), ...DEFAULT_DOMAINS]
})
