import { createClient } from '@supabase/supabase-js';

// 1. Inserimos a URL diretamente em texto puro para garantir a validação HTTP/HTTPS
const supabaseUrl = 'https://wapunfsxkfgdrdwfouvw.supabase.co';

// 2. Mantemos a leitura da chave anon através da Vercel/arquivo .env
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);