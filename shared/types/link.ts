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
  title: string
  clicks: number
}

export type TotalLinktatisticType = {
  links: number
  clicks: number
}
