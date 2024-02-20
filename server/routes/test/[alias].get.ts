export default defineWrappedEventHandler(async (event) => {
  if (!event.context.params?.key) return
  const result = await useStorage().getItem(`redis:${event.context.params?.key}`)
  return sendRedirect(event, result.original_url, 301)
})
