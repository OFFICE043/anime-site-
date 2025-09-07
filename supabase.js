hereimport { createClient } from 'https://esm.sh/@supabase/supabase-js'

const SUPABASE_URL = "https://yrkqqzivlgtjzvlwktbr.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlya3Fxeml2bGd0anp2bHdrdGJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNTQ4NTAsImV4cCI6MjA3MjgzMDg1MH0.DcKai-tspExJCgBQJtXjmg86cFHAs1w4Tz603BfsKL8"

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
