
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

export const SUPABASE_URL = "https://jeuftzyelhfrjrczrrvf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpldWZ0enllbGhmcmpyY3pycnZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4MzA2MTEsImV4cCI6MjA1ODQwNjYxMX0.mbOumlGS-3nQuW-sXxMkCt0uPhVoZKmX3E7kz-m72U4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
