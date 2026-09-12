import { createClient } from '@supabase/supabase-js';

// Acessa as chaves seguras que configuramos no arquivo .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Inicializa a conexão com o banco de dados
export const supabase = createClient(supabaseUrl, supabaseKey);