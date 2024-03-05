import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mrjmporqetecqrrekyet.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yam1wb3JxZXRlY3FycmVreWV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0MjE1NTgsImV4cCI6MjAyNDk5NzU1OH0.maqXGw6SyyXDl7LxveBaXppkcgp9t-v0BUfU6ysj-A8'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
 