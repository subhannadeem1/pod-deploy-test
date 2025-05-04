import { createClient } from '@supabase/supabase-js';

// Old database client (for metadata, transcripts, etc.)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// New database client (for vector store)
const supabaseVectorUrl = process.env.NEXT_PUBLIC_SUPABASE_VECTOR_URL!;
const supabaseVectorServiceRoleKey = process.env.SUPABASE_VECTOR_SERVICE_ROLE_KEY!;
export const supabaseVector = createClient(supabaseVectorUrl, supabaseVectorServiceRoleKey);