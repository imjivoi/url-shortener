export default defineWrappedEventHandler(async (event) => {
  if (!event.context.params?.alias) return
  const result = await useStorage().getItem(`redis:${event.context.params?.alias}`)
  return sendRedirect(event, result.original_url, 301)
})
