import { customAlphabet } from 'nanoid'

export function getRandomAlias() {
  const nanoid = customAlphabet('123456789qwertyuiopasdfghjklzxcvbnm', 5)
  return nanoid()
}

export function getCachedLinkKey(link: any) {
  return `${link.domain}:${link.alias}`
}

export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}
