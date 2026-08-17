// src/types/database.ts
//
// This file is a placeholder for Supabase-generated TypeScript types.
//
// Once you have a Supabase project connected, run the following command
// to generate the real types:
//
//   npx supabase gen types typescript --project-id <your-project-ref> > src/types/database.ts
//
// This will produce fully-typed interfaces for all tables defined in
// supabase/migrations/001_initial_schema.sql, including Row Level Security
// context types and the Database type used by the Supabase client.
//
// The generated types will provide full type safety for all database
// operations across the application.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          avatar_url: string | null;
          role: 'customer' | 'business' | 'admin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          role?: 'customer' | 'business' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          role?: 'customer' | 'business' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
      };
      businesses: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          description: string | null;
          business_type: 'restaurant' | 'cafe' | 'bakery' | 'grocery' | 'fresh_market' | 'snack_shop' | 'convenience' | 'producer';
          address: string;
          city: string;
          postal_code: string | null;
          latitude: number | null;
          longitude: number | null;
          phone: string | null;
          email: string | null;
          logo_url: string | null;
          cover_image_url: string | null;
          is_verified: boolean;
          is_active: boolean;
          commission_rate: number;
          offers_delivery: boolean;
          offers_pickup: boolean;
          delivery_radius_km: number;
          delivery_fee: number;
          minimum_order_for_delivery: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          name: string;
          description?: string | null;
          business_type: 'restaurant' | 'cafe' | 'bakery' | 'grocery' | 'fresh_market' | 'snack_shop' | 'convenience' | 'producer';
          address: string;
          city: string;
          postal_code?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          phone?: string | null;
          email?: string | null;
          logo_url?: string | null;
          cover_image_url?: string | null;
          is_verified?: boolean;
          is_active?: boolean;
          commission_rate?: number;
          offers_delivery?: boolean;
          offers_pickup?: boolean;
          delivery_radius_km?: number;
          delivery_fee?: number;
          minimum_order_for_delivery?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          name?: string;
          description?: string | null;
          business_type?: 'restaurant' | 'cafe' | 'bakery' | 'grocery' | 'fresh_market' | 'snack_shop' | 'convenience' | 'producer';
          address?: string;
          city?: string;
          postal_code?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          phone?: string | null;
          email?: string | null;
          logo_url?: string | null;
          cover_image_url?: string | null;
          is_verified?: boolean;
          is_active?: boolean;
          commission_rate?: number;
          offers_delivery?: boolean;
          offers_pickup?: boolean;
          delivery_radius_km?: number;
          delivery_fee?: number;
          minimum_order_for_delivery?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      mystery_bags: {
        Row: {
          id: string;
          business_id: string;
          title: string;
          description: string | null;
          category: 'mixed_meals' | 'bakery' | 'grocery' | 'produce' | 'snacks' | 'beverages' | 'desserts';
          original_value: number;
          selling_price: number;
          quantity_available: number;
          quantity_sold: number;
          image_url: string | null;
          is_available: boolean;
          available_from: string | null;
          available_until: string | null;
          pickup_instructions: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          title: string;
          description?: string | null;
          category: 'mixed_meals' | 'bakery' | 'grocery' | 'produce' | 'snacks' | 'beverages' | 'desserts';
          original_value: number;
          selling_price: number;
          quantity_available?: number;
          quantity_sold?: number;
          image_url?: string | null;
          is_available?: boolean;
          available_from?: string | null;
          available_until?: string | null;
          pickup_instructions?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          business_id?: string;
          title?: string;
          description?: string | null;
          category?: 'mixed_meals' | 'bakery' | 'grocery' | 'produce' | 'snacks' | 'beverages' | 'desserts';
          original_value?: number;
          selling_price?: number;
          quantity_available?: number;
          quantity_sold?: number;
          image_url?: string | null;
          is_available?: boolean;
          available_from?: string | null;
          available_until?: string | null;
          pickup_instructions?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      time_slots: {
        Row: {
          id: string;
          business_id: string;
          day_of_week: number;
          start_time: string;
          end_time: string;
          is_active: boolean;
          max_orders: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          day_of_week: number;
          start_time: string;
          end_time: string;
          is_active?: boolean;
          max_orders?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          business_id?: string;
          day_of_week?: number;
          start_time?: string;
          end_time?: string;
          is_active?: boolean;
          max_orders?: number;
          created_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          customer_id: string;
          business_id: string;
          mystery_bag_id: string;
          time_slot_id: string | null;
          fulfillment_type: 'delivery' | 'pickup';
          status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'picked_up' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'refunded';
          total_amount: number;
          delivery_fee: number;
          commission_amount: number;
          business_payout: number;
          payment_method: string;
          delivery_address: string | null;
          delivery_notes: string | null;
          special_requests: string | null;
          scheduled_pickup: string | null;
          picked_up_at: string | null;
          delivered_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_id: string;
          business_id: string;
          mystery_bag_id: string;
          time_slot_id?: string | null;
          fulfillment_type?: 'delivery' | 'pickup';
          status?: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'picked_up' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'refunded';
          total_amount: number;
          delivery_fee?: number;
          commission_amount: number;
          business_payout: number;
          payment_method?: string;
          delivery_address?: string | null;
          delivery_notes?: string | null;
          special_requests?: string | null;
          scheduled_pickup?: string | null;
          picked_up_at?: string | null;
          delivered_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          customer_id?: string;
          business_id?: string;
          mystery_bag_id?: string;
          time_slot_id?: string | null;
          fulfillment_type?: 'delivery' | 'pickup';
          status?: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'picked_up' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'refunded';
          total_amount?: number;
          delivery_fee?: number;
          commission_amount?: number;
          business_payout?: number;
          payment_method?: string;
          delivery_address?: string | null;
          delivery_notes?: string | null;
          special_requests?: string | null;
          scheduled_pickup?: string | null;
          picked_up_at?: string | null;
          delivered_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          order_id: string;
          customer_id: string;
          business_id: string;
          rating: number;
          comment: string | null;
          is_anonymous: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          customer_id: string;
          business_id: string;
          rating: number;
          comment?: string | null;
          is_anonymous?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          customer_id?: string;
          business_id?: string;
          rating?: number;
          comment?: string | null;
          is_anonymous?: boolean;
          created_at?: string;
        };
      };
      advertisements: {
        Row: {
          id: string;
          business_id: string;
          ad_type: 'banner' | 'carousel' | 'featured';
          title: string;
          description: string | null;
          image_url: string | null;
          link_url: string | null;
          start_date: string;
          end_date: string;
          is_active: boolean;
          impressions: number;
          clicks: number;
          cost: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          ad_type: 'banner' | 'carousel' | 'featured';
          title: string;
          description?: string | null;
          image_url?: string | null;
          link_url?: string | null;
          start_date: string;
          end_date: string;
          is_active?: boolean;
          impressions?: number;
          clicks?: number;
          cost: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          business_id?: string;
          ad_type?: 'banner' | 'carousel' | 'featured';
          title?: string;
          description?: string | null;
          image_url?: string | null;
          link_url?: string | null;
          start_date?: string;
          end_date?: string;
          is_active?: boolean;
          impressions?: number;
          clicks?: number;
          cost?: number;
          created_at?: string;
        };
      };
      business_documents: {
        Row: {
          id: string;
          business_id: string;
          document_type: 'business_license' | 'food_safety_cert' | 'insurance' | 'health_permit';
          file_url: string;
          file_name: string;
          verified: boolean;
          verified_at: string | null;
          expires_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          document_type: 'business_license' | 'food_safety_cert' | 'insurance' | 'health_permit';
          file_url: string;
          file_name: string;
          verified?: boolean;
          verified_at?: string | null;
          expires_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          business_id?: string;
          document_type?: 'business_license' | 'food_safety_cert' | 'insurance' | 'health_permit';
          file_url?: string;
          file_name?: string;
          verified?: boolean;
          verified_at?: string | null;
          expires_at?: string | null;
          created_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          data: Json | null;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          data?: Json | null;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: string;
          title?: string;
          message?: string;
          data?: Json | null;
          is_read?: boolean;
          created_at?: string;
        };
      };
      platform_settings: {
        Row: {
          id: string;
          setting_key: string;
          setting_value: string;
          description: string | null;
          updated_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          setting_key: string;
          setting_value: string;
          description?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          setting_key?: string;
          setting_value?: string;
          description?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, unknown>;
    Functions: Record<string, unknown>;
    Enums: Record<string, unknown>;
  };
}
