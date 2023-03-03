export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      link_click: {
        Row: {
          created_at: string
          id: string
          link_stat_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          link_stat_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          link_stat_id?: string
          updated_at?: string
        }
      }
      link_stat: {
        Row: {
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
        }
      }
      links: {
        Row: {
          created_at: string
          id: string
          original_url: string | null
          redirect_url: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          original_url?: string | null
          redirect_url?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          original_url?: string | null
          redirect_url?: string | null
          title?: string | null
          updated_at?: string
        }
      }
      links_users: {
        Row: {
          id: string
          link_id: string
          user_id: string
        }
        Insert: {
          id?: string
          link_id: string
          user_id: string
        }
        Update: {
          id?: string
          link_id?: string
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
