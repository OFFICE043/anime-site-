hereimport { createClient } from 'https://esm.sh/@supabase/supabase-js'

const SUPABASE_URL = "https://YOUR-PROJECT.supabase.co"
const SUPABASE_KEY = "PUBLIC-ANON-KEY"

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
