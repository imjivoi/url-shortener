import { customAlphabet } from 'nanoid'

export function getRandomAlias() {
  const nanoid = customAlphabet('123456789qwertyuiopasdfghjklzxcvbnm', 5)
  return nanoid()
}
