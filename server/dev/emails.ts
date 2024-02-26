import { useCompiler } from '#vue-email'

export default eventHandler(async (event) => {
  try {
    console.log(event)
    const templateName = event.context.params.templateName

    const template = await useCompiler(`${templateName}.vue`)

    return template
  } catch (error) {
    return error
  }
})
