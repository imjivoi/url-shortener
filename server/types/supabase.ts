export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      accounts: {
        Row: {
          clicks_limit: number | null
          clicks_limit_exceeded: boolean | null
          created_at: string | null
          id: string
          links_limit: number | null
          links_limit_exceeded: boolean | null
          updated_at: string | null
        }
        Insert: {
          clicks_limit?: number | null
          clicks_limit_exceeded?: boolean | null
          created_at?: string | null
          id: string
          links_limit?: number | null
          links_limit_exceeded?: boolean | null
          updated_at?: string | null
        }
        Update: {
          clicks_limit?: number | null
          clicks_limit_exceeded?: boolean | null
          created_at?: string | null
          id?: string
          links_limit?: number | null
          links_limit_exceeded?: boolean | null
          updated_at?: string | null
        }
      }
      clicks: {
        Row: {
          bot: boolean | null
          browser: string | null
          browser_version: string | null
          city: string | null
          country: string | null
          cpu_architecture: string | null
          created_at: string
          device: string | null
          device_model: string | null
          device_vendor: string | null
          engine: string | null
          engine_version: string | null
          id: string
          ip: string | null
          latitude: string | null
          link_id: string | null
          longitude: string | null
          os: string | null
          os_version: string | null
          referer: string | null
          referer_url: string | null
          region: string | null
          ua: string | null
        }
        Insert: {
          bot?: boolean | null
          browser?: string | null
          browser_version?: string | null
          city?: string | null
          country?: string | null
          cpu_architecture?: string | null
          created_at?: string
          device?: string | null
          device_model?: string | null
          device_vendor?: string | null
          engine?: string | null
          engine_version?: string | null
          id?: string
          ip?: string | null
          latitude?: string | null
          link_id?: string | null
          longitude?: string | null
          os?: string | null
          os_version?: string | null
          referer?: string | null
          referer_url?: string | null
          region?: string | null
          ua?: string | null
        }
        Update: {
          bot?: boolean | null
          browser?: string | null
          browser_version?: string | null
          city?: string | null
          country?: string | null
          cpu_architecture?: string | null
          created_at?: string
          device?: string | null
          device_model?: string | null
          device_vendor?: string | null
          engine?: string | null
          engine_version?: string | null
          id?: string
          ip?: string | null
          latitude?: string | null
          link_id?: string | null
          longitude?: string | null
          os?: string | null
          os_version?: string | null
          referer?: string | null
          referer_url?: string | null
          region?: string | null
          ua?: string | null
        }
      }
      links: {
        Row: {
          alias: string
          created_at: string
          id: string
          original_url: string
          redirect_url: string
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          alias: string
          created_at?: string
          id?: string
          original_url: string
          redirect_url: string
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          alias?: string
          created_at?: string
          id?: string
          original_url?: string
          redirect_url?: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
