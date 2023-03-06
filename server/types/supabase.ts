export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      click: {
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
          latitude: string | null
          link_id: string
          longitude: string | null
          os: string | null
          os_version: string | null
          referer: string | null
          referer_url: string | null
          region: string | null
          ui: string | null
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
          latitude?: string | null
          link_id: string
          longitude?: string | null
          os?: string | null
          os_version?: string | null
          referer?: string | null
          referer_url?: string | null
          region?: string | null
          ui?: string | null
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
          latitude?: string | null
          link_id?: string
          longitude?: string | null
          os?: string | null
          os_version?: string | null
          referer?: string | null
          referer_url?: string | null
          region?: string | null
          ui?: string | null
        }
      }
      link: {
        Row: {
          alias: string | null
          created_at: string
          id: string
          original_url: string | null
          redirect_url: string | null
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          alias?: string | null
          created_at?: string
          id?: string
          original_url?: string | null
          redirect_url?: string | null
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          alias?: string | null
          created_at?: string
          id?: string
          original_url?: string | null
          redirect_url?: string | null
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
