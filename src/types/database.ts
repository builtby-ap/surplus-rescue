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
    Tables: Record<string, unknown>;
    Views: Record<string, unknown>;
    Functions: Record<string, unknown>;
    Enums: Record<string, unknown>;
  };
}
