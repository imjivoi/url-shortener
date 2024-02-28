import { customAlphabet } from 'nanoid'

export function getRandomAlias() {
  const nanoid = customAlphabet('123456789qwertyuiopasdfghjklzxcvbnm', 5)
  return nanoid()
}

export function getCachedLinkKey(link: any) {
  return `${link.domain.replace(':', '').replace('.', '')}${link.alias}`
}

export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export function getUrlWithUtmParams(url: string, utmParams: Record<string, string | undefined>) {
  const urlWithParams = new URL(url)
  for (const [key, value] of Object.entries(utmParams)) {
    if (value) {
      urlWithParams.searchParams.set(key, value)
    } else {
      urlWithParams.searchParams.delete(key)
    }
  }
  return urlWithParams.toString()
}
