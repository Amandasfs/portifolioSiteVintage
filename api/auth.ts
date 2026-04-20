import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Usar fallback para evitar erro de inicialização se o .env falhar
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Validar método
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  // 2. Limpar o token (remover espaços em branco)
  const tokenRaw = req.body?.token;
  const token = typeof tokenRaw === 'string' ? tokenRaw.trim() : null;

  console.log(`Tentativa de login com token: "${token}"`);

  if (!token) {
    return res.status(400).json({ error: 'Token não fornecido' });
  }

  try {
    // 3. Busca usando ilike (ignora maiúsculas/minúsculas)
    const { data: familia, error } = await supabase
      .from('familias')
      .select('*, convidados(*)')
      .ilike('token', token) // Mais flexível que .eq()
      .maybeSingle();

    if (error) {
      console.error("Erro no Supabase:", error.message);
      return res.status(500).json({ error: 'Erro interno no banco de dados' });
    }

    if (!familia) {
      console.log("Nenhuma família encontrada para esse token.");
      return res.status(401).json({ error: 'Código de convite não encontrado.' });
    }

    // 4. Sucesso
    return res.status(200).json({
      id: familia.id,
      nome: familia.nome_familia,
      isAdmin: familia.is_admin,
      convidados: familia.convidados
    });

  } catch (err) {
    console.error("Erro inesperado:", err);
    return res.status(500).json({ error: 'Erro no servidor' });
  }
}