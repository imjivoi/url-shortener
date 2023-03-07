export default defineEventHandler((event) => {
  console.log(getHeader(event, 'user-agent'))
})
