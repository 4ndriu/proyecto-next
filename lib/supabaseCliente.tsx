import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jrzoottmuoblbbiofndy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impyem9vdHRtdW9ibGJiaW9mbmR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NjAxNTEsImV4cCI6MjA5NTIzNjE1MX0.O1tkxBnU83XHWBFvxhZP6xr-uWc930ax7QMesLcAARI';

export const supabase = createClient(supabaseUrl, supabaseKey);