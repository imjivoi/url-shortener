import { customAlphabet } from 'nanoid'

export default function getRandomAlias() {
  const nanoid = customAlphabet('123456789qwertyuiopasdfghjklzxcvbnm', 5)
  return nanoid()
}
