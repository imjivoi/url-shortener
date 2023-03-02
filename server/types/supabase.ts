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
      url_click: {
        Row: {
          created_at: string
          id: string
          updated_at: string
          url_stat_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          updated_at?: string
          url_stat_id: string
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
          url_stat_id?: string
        }
      }
      url_stat: {
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
      urls: {
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
      urls_users: {
        Row: {
          id: string
          url_id: string
          user_id: string
        }
        Insert: {
          id?: string
          url_id: string
          user_id: string
        }
        Update: {
          id?: string
          url_id?: string
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
