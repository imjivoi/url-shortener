export type AccountType = {
  id: string
  created_at: string | null
  updated_at: string | null
  clicks_limit: number | null
  links_limit: number | null
  clicks_limit_exceeded: boolean | null
  links_limit_exceeded: boolean | null
}
