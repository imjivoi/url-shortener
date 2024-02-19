import type { User } from '@supabase/supabase-js'
import type { EventHandler, H3Event } from 'h3'

export function defineAuthEventHandler<T>(handler: (event: H3Event<T>, user: User) => T | Promise<T>) {
  return defineWrappedEventHandler<T>(async (event) => {
    const user = await useServerSupabaseUser().catch((err) => null)

    if (!user) {
      return sendError(event, createError({ statusMessage: 'Unauthorized', statusCode: 401 }))
    }
    return handler(event, user)
  })
}

export function defineWrappedEventHandler<T>(handler: EventHandler<T>) {
  return defineEventHandler<T>(async (event) => {
    try {
      const result = await handler(event)
      return result
    } catch (error) {
      console.log(error)
      if ([400, 422].includes(error.statusCode)) {
        return sendError(event, createError(error))
      }
      return sendError(event, createError({ statusMessage: 'Internal error', statusCode: 500 }))
    }
  })
}
