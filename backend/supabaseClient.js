const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://acvfywwhgmdujpuwriaa.supabase.co'; // replace with your actual Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjdmZ5d3doZ21kdWpwdXdyaWFhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTcwNDY5MSwiZXhwIjoyMDY3MjgwNjkxfQ.uM68WBihJN4MTKH1An9LdJRyKN6X2SR6VForoVWLGwQ'; // use the service_role key from Supabase (secure it in .env)
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
