/**
 * SahiVahan Supabase Service Client
 * 
 * When ready to connect Supabase:
 * 1. Install @supabase/supabase-js: `npm install @supabase/supabase-js`
 * 2. Set your environment variables in `.env`:
 *    VITE_SUPABASE_URL=https://your-project.supabase.co
 *    VITE_SUPABASE_ANON_KEY=your-anon-key
 * 3. Run the SQL script in `supabase_schema.sql` in your Supabase SQL editor.
 */

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/**
 * Storage keys used for local persistence fallback
 */
export const STORAGE_KEYS = {
  QUERIES: 'sv_queries',
  ORGANIZATIONS: 'sv_organizations',
  FEEDBACKS: 'sv_feedbacks',
  ACTIVE_USER: 'sv_active_user',
  ACTIVE_ADMIN: 'sv_active_admin',
};

