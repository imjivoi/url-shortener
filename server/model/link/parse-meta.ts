import parser from 'html-metadata-parser'

export const parseMeta = async (url: string) => {
  const result = await parser.parser(url)
  return result
}
