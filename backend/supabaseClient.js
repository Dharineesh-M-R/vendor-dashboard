import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://acvfywwhgmdujpuwriaa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjdmZ5d3doZ21kdWpwdXdyaWFhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTcwNDY5MSwiZXhwIjoyMDY3MjgwNjkxfQ.uM68WBihJN4MTKH1An9LdJRyKN6X2SR6VForoVWLGwQ';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
