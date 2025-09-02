// supabase.js
import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = 'https://xsoqlmjyajdkdaefjmmh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhzb3FsbWp5YWpka2RhZWZqbW1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3MTc1MzUsImV4cCI6MjA3MjI5MzUzNX0.-dh63EzWJTbGbxylF6l07Sya6txX7Yv5fleNmrOi54Q'

export const supabase = createClient(supabaseUrl, supabaseKey)
