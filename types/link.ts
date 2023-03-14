import { z } from 'h3-zod'

export const CreateUrlSchema = z.object({
  title: z.string().min(3).max(20).optional(),
  original_url: z.string().url(),
  alias: z.string().min(3).max(20).optional(),
})

export type LinkType = {
  id: string
  original_url: string
  redirect_url: string
  title: string | null
  clicks?: number
  user_id: string
  created_at: string
  updated_at: string
  alias: string
}

export type TotalLinkStatisticType = {
  links: number
  clicks: number
}

export const UpdateLinkScheme = z.object({
  original_url: z.string().optional(),
  title: z.string().optional(),
  alias: z.string().optional(),
})

export type UpdateLinktype = z.infer<typeof UpdateLinkScheme>
