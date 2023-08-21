import { z } from 'h3-zod'

export const CreateUrlSchema = z.object({
  original_url: z.string().url(),
  alias: z.string().min(3).max(20).optional(),
  title: z.string().min(3).max(20).optional(),
})

export type LinkType = {
  id: string
  original_url: string
  redirect_url: string
  title: string | null
  description: string | null
  image_url?: string
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

const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
export const UpdateLinkScheme = z.object({
  original_url: z.string().optional(),
  alias: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  image: z
    .any()
    .optional()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    ),
})

export type UpdateLinktype = z.infer<typeof UpdateLinkScheme>
