import { customAlphabet } from 'nanoid'

export function getRandomAlias() {
  const nanoid = customAlphabet('123456789qwertyuiopasdfghjklzxcvbnm', 5)
  return nanoid()
}

export function toObject<T extends string | number>(arr: T[]) {
  return arr.reduce((a, v) => ({ ...a, [v]: v }), {})
}
