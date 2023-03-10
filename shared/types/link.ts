import { z } from 'h3-zod'

export const CreateUrlSchema = z.object({
  title: z.string().min(3).max(20),
  original_url: z.string().url(),
  alias: z.string().min(3).max(20),
})

export type LinkType = {
  id: string
  original_url: string
  redirect_url: string
  title: string | null
  clicks?: number
  user_id?: string
  created_at: string
  updated_at: string
  alias: string
}

export type TotalLinkStatisticType = {
  links: number
  clicks: number
}
