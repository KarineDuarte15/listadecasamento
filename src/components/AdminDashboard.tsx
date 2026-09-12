import React, { useState } from 'react';
import { supabase } from '../supabase';
import { Loader2, Lock, LogOut, CheckCircle, XCircle } from 'lucide-react';

interface DBGift {
  id: string;
  nome_presente: string;
  categoria: string;
  quantidade_total: number;
  quantidade_disponivel: number;
  reservado_por: string | null;
  telefone_convidado: string | null;
  email_convidado: string | null;
}

export const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [gifts, setGifts] = useState<DBGift[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ total: 0, reservados: 0, disponiveis: 0 });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === import.meta.env.VITE_ADMIN_SECRET) {
      setIsAuthenticated(true);
      setError('');
      fetchGifts();
    } else {
      setError('Senha incorreta. Tente novamente.');
    }
  };

  const fetchGifts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('presentes')
        .select('*')
        .order('nome_presente', { ascending: true });

      if (error) throw error;

      if (data) {
        setGifts(data);
        
        let total = 0;
        let disponiveis = 0;
        
        data.forEach(g => {
          total += g.quantidade_total;
          disponiveis += g.quantidade_disponivel;
        });
        
        setStats({ 
          total, 
          disponiveis, 
          reservados: total - disponiveis 
        });
      }
    } catch (err) {
      console.error("Erro ao buscar presentes:", err);
      setError('Falha ao carregar os dados do banco.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setGifts([]);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-slate-100">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
              <Lock className="w-8 h-8" />
            </div>
          </div>
          <h2 className="text-2xl font-serif text-center text-slate-800 mb-6">Acesso Administrativo</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha de acesso"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">
              Entrar no Painel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 sm:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-3xl font-serif text-slate-800">Painel dos Noivos</h1>
            <p className="text-slate-500 mt-1">Gerencie a lista de presentes</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-sm font-medium text-slate-500">Unidades Totais</p>
            <p className="text-4xl font-bold text-slate-800 mt-2">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 bg-emerald-50/30">
            <p className="text-sm font-medium text-emerald-600">Unidades Reservadas</p>
            <p className="text-4xl font-bold text-emerald-700 mt-2">{stats.reservados}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 bg-blue-50/30">
            <p className="text-sm font-medium text-blue-600">Unidades Disponíveis</p>
            <p className="text-4xl font-bold text-blue-700 mt-2">{stats.disponiveis}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800">Status das Reservas</h2>
            <button onClick={fetchGifts} className="text-sm text-blue-600 hover:text-blue-700 font-medium">Atualizar dados</button>
          </div>
          
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center p-12 text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin mb-4" />
                <p>Carregando banco de dados...</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-sm text-slate-500">
                    <th className="p-4 font-medium">Presente</th>
                    <th className="p-4 font-medium">Estoque</th>
                    <th className="p-4 font-medium">Último Convidado</th>
                    <th className="p-4 font-medium">Contato</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {gifts.map((gift) => (
                    <tr key={gift.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-medium text-slate-800">{gift.nome_presente}</td>
                      <td className="p-4">
                        {gift.quantidade_disponivel > 0 ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                            <CheckCircle className="w-3.5 h-3.5" /> {gift.quantidade_disponivel} Disponíveis
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
                            <XCircle className="w-3.5 h-3.5" /> Esgotado
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-sm text-slate-600">{gift.reservado_por || '-'}</td>
                      <td className="p-4 text-sm text-slate-600">
                        {gift.telefone_convidado ? (
                          <div className="flex flex-col">
                            <span>{gift.telefone_convidado}</span>
                            <span className="text-xs text-slate-400">{gift.email_convidado}</span>
                          </div>
                        ) : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};