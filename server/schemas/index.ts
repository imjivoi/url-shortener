import * as v from 'valibot'

export const linkSchema = v.objectAsync({
  original_url: v.string(),
  title: v.optional(v.string()),
  description: v.optional(v.string()),
  alias: v.optional(v.string()),
  domain: v.optional(v.string()),
  utm_campaign: v.optional(v.string()),
  utm_source: v.optional(v.string()),
  utm_medium: v.optional(v.string()),
  utm_term: v.optional(v.string()),
  utm_content: v.optional(v.string()),
})
