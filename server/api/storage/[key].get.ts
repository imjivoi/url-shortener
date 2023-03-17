export default defineEventHandler(async (event) => {
  if (!event.context.params?.key) return
  const result = await useStorage().getItem(`redis:${event.context.params?.key}`)
  return result
})
