import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock,
  Download,
  Search,
  Trash2,
  X,
  Package,
  CheckCircle,
  Users,
  LogOut,
  RefreshCw,
  Gift as GiftIcon,
  Eye,
  AlertTriangle,
} from 'lucide-react';
import { Gift, GiftReservation, RegistryStats } from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  onDataChanged,
}) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('br_admin_token'));
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<'reservations' | 'inventory'>('reservations');
  const [reservations, setReservations] = useState<GiftReservation[]>([]);
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [stats, setStats] = useState<RegistryStats>({
    total_gifts: 0,
    available_gifts: 0,
    reserved_gifts: 0,
    total_guests: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReservation, setSelectedReservation] = useState<GiftReservation | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const fetchAdminData = async (authToken: string) => {
    try {
      const [resResponse, giftsResponse, statsResponse] = await Promise.all([
        fetch('/api/admin/reservations', {
          headers: { 'x-admin-token': authToken },
        }),
        fetch('/api/gifts'),
        fetch('/api/stats'),
      ]);

      if (resResponse.status === 401) {
        handleLogout();
        return;
      }

      const resData = await resResponse.json();
      const giftsData = await giftsResponse.json();
      const statsData = await statsResponse.json();

      setReservations(resData || []);
      setGifts(giftsData || []);
      setStats(statsData);
    } catch (err) {
      console.error('Erro ao carregar dados do admin:', err);
    }
  };

  useEffect(() => {
    if (isOpen && token) {
      fetchAdminData(token);
    }
  }, [isOpen, token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setLoginError(data.error || 'Senha incorreta.');
        setLoggingIn(false);
        return;
      }

      setToken(data.token);
      localStorage.setItem('br_admin_token', data.token);
      setPasswordInput('');
      fetchAdminData(data.token);
    } catch {
      setLoginError('Erro ao comunicar com o servidor.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('br_admin_token');
  };

  const handleCancelReservation = async (id: string) => {
    if (!token) return;
    if (!window.confirm('Tem certeza de que deseja cancelar esta reserva? O item voltará a ficar disponível para outros convidados.')) {
      return;
    }

    setCancellingId(id);
    try {
      const res = await fetch(`/api/admin/reservations/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-token': token },
      });

      if (res.ok) {
        fetchAdminData(token);
        onDataChanged();
        if (selectedReservation?.id === id) {
          setSelectedReservation(null);
        }
      } else {
        alert('Erro ao cancelar reserva.');
      }
    } catch (err) {
      alert('Falha na requisição.');
    } finally {
      setCancellingId(null);
    }
  };

  const handleExportCSV = () => {
    if (!token) return;
    window.open('/api/admin/export-csv?token=' + encodeURIComponent(token), '_blank');
  };

  const filteredReservations = reservations.filter((r) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.guest_name.toLowerCase().includes(q) ||
      r.guest_email.toLowerCase().includes(q) ||
      r.guest_phone.toLowerCase().includes(q) ||
      r.gift_name.toLowerCase().includes(q) ||
      r.gift_category.toLowerCase().includes(q)
    );
  });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0A1626]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-5xl w-full max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-[#D5E3F0] flex flex-col overflow-hidden"
        >
          {/* Top Bar */}
          <div className="px-6 py-4 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#EBF3FB] text-[#345A82] flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-[#1E2E44]">
                  Lista de Casamento — Administração
                </h3>
                <p className="text-[11px] text-[#6C8196]">Painel exclusivo dos noivos Bruna & Riclaube</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {token && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-lg text-xs text-red-600 hover:bg-red-50 transition-colors flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sair</span>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
                aria-label="Fechar painel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {!token ? (
              // Login Form
              <div className="max-w-md mx-auto py-12 text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#EEF5FC] text-[#345A82] flex items-center justify-center mx-auto mb-4 border border-[#D5E4F2]">
                  <Lock className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-2xl text-[#1E2E44] font-medium mb-2">
                  Acesso Restrito
                </h4>
                <p className="text-xs sm:text-sm text-[#62778C] font-light mb-6">
                  Insira a senha de administração para gerenciar a lista de presentes e as reservas dos convidados.
                </p>

                {loginError && (
                  <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 text-left">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-medium text-[#334D66] mb-1">
                      Senha de Administração
                    </label>
                    <input
                      type="password"
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Digite a senha..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#CADDEC] text-sm text-[#1E2E44] focus:outline-none focus:ring-2 focus:ring-[#3A5D85]/20 focus:border-[#3A5D85]"
                    />
                    <p className="text-[11px] text-[#869BAE] mt-1">
                      Dica padrão do sistema: <code>brunaericlaube2026</code>
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loggingIn}
                    className="w-full py-3 rounded-full bg-[#3A5D85] hover:bg-[#2C4869] text-white font-medium text-sm transition-all shadow-sm active:scale-[0.98]"
                  >
                    {loggingIn ? 'Entrando...' : 'Acessar Painel'}
                  </button>
                </form>
              </div>
            ) : (
              // Authenticated Dashboard
              <div className="space-y-6">
                {/* 4 Metrics Cards (Requirement 31) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="p-4 rounded-2xl bg-[#FAFBFD] border border-[#D5E3F0] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EAF2FB] text-[#345A82] flex items-center justify-center">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-serif font-medium text-[#1E2E44]">
                        {stats.total_gifts}
                      </div>
                      <div className="text-[11px] text-[#6C8196] font-medium uppercase">
                        Total de presentes
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAFBFD] border border-[#D5E3F0] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EFF8FF] text-[#2563EB] flex items-center justify-center">
                      <GiftIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-serif font-medium text-[#2563EB]">
                        {stats.available_gifts}
                      </div>
                      <div className="text-[11px] text-[#6C8196] font-medium uppercase">
                        Disponíveis
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAFBFD] border border-[#D5E3F0] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-serif font-medium text-[#2E7D32]">
                        {stats.reserved_gifts}
                      </div>
                      <div className="text-[11px] text-[#6C8196] font-medium uppercase">
                        Escolhidos
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAFBFD] border border-[#D5E3F0] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] text-[#7C3AED] flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-serif font-medium text-[#7C3AED]">
                        {stats.total_guests}
                      </div>
                      <div className="text-[11px] text-[#6C8196] font-medium uppercase">
                        Convidados
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabs & Actions Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2 bg-[#F1F5F9] p-1 rounded-xl w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setActiveTab('reservations')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        activeTab === 'reservations'
                          ? 'bg-white text-[#1E2E44] shadow-sm'
                          : 'text-[#62778C] hover:text-[#1E2E44]'
                      }`}
                    >
                      Reservas Registradas ({reservations.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('inventory')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        activeTab === 'inventory'
                          ? 'bg-white text-[#1E2E44] shadow-sm'
                          : 'text-[#62778C] hover:text-[#1E2E44]'
                      }`}
                    >
                      Estoque de Itens ({gifts.length})
                    </button>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      onClick={() => fetchAdminData(token)}
                      className="p-2 rounded-xl border border-[#CADDEC] text-[#42607F] hover:bg-slate-50 transition-colors"
                      title="Atualizar dados"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={handleExportCSV}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#3A5D85] hover:bg-[#2C4869] text-white text-xs font-medium transition-colors shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Exportar CSV</span>
                    </button>
                  </div>
                </div>

                {/* Search in Admin */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A93AA]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      activeTab === 'reservations'
                        ? 'Buscar por convidado, presente, WhatsApp ou e-mail...'
                        : 'Buscar presente no catálogo...'
                    }
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#CADDEC] text-xs sm:text-sm text-[#1E2E44] focus:outline-none focus:ring-2 focus:ring-[#3A5D85]/20 focus:border-[#3A5D85]"
                  />
                </div>

                {/* Table View */}
                {activeTab === 'reservations' ? (
                  <div className="border border-[#E2E8F0] rounded-2xl overflow-hidden bg-white shadow-sm">
                    {filteredReservations.length === 0 ? (
                      <div className="p-10 text-center text-xs sm:text-sm text-[#7D93A8]">
                        Nenhuma reserva encontrada.
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-[#2D3E50]">
                          <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-semibold text-[#6C8196] uppercase tracking-wider">
                            <tr>
                              <th className="py-3 px-4">Convidado</th>
                              <th className="py-3 px-4">WhatsApp</th>
                              <th className="py-3 px-4">Presente Escolhido</th>
                              <th className="py-3 px-4">Categoria</th>
                              <th className="py-3 px-4">Data</th>
                              <th className="py-3 px-4 text-center">Status</th>
                              <th className="py-3 px-4 text-right">Ações</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#F1F5F9]">
                            {filteredReservations.map((res) => (
                              <tr key={res.id} className="hover:bg-[#F9FBFE] transition-colors">
                                <td className="py-3 px-4 font-medium text-[#1E2E44]">
                                  <div>{res.guest_name}</div>
                                  <div className="text-[10px] text-[#7D93A8]">{res.guest_email}</div>
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap">
                                  <a
                                    href={`https://wa.me/${res.guest_phone.replace(/\D/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#2563EB] hover:underline"
                                  >
                                    {res.guest_phone}
                                  </a>
                                </td>
                                <td className="py-3 px-4 font-medium text-[#1E2E44]">
                                  {res.gift_name}
                                </td>
                                <td className="py-3 px-4">
                                  <span className="px-2 py-0.5 rounded bg-slate-100 text-[#475569] text-[10px]">
                                    {res.gift_category}
                                  </span>
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap text-[#64748B]">
                                  {new Date(res.reserved_at).toLocaleDateString('pt-BR')}
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-medium border border-emerald-200">
                                    {res.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-right whitespace-nowrap">
                                  <button
                                    type="button"
                                    onClick={() => setSelectedReservation(res)}
                                    className="p-1.5 text-[#3A5D85] hover:bg-blue-50 rounded-lg mr-1"
                                    title="Ver detalhes"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    disabled={cancellingId === res.id}
                                    onClick={() => handleCancelReservation(res.id)}
                                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-50"
                                    title="Cancelar reserva e devolver estoque"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ) : (
                  // Inventory Tab
                  <div className="border border-[#E2E8F0] rounded-2xl overflow-hidden bg-white shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-[#2D3E50]">
                        <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-semibold text-[#6C8196] uppercase tracking-wider">
                          <tr>
                            <th className="py-3 px-4">Presente</th>
                            <th className="py-3 px-4">Categoria</th>
                            <th className="py-3 px-4 text-center">Total</th>
                            <th className="py-3 px-4 text-center">Disponível</th>
                            <th className="py-3 px-4 text-center">Escolhidos</th>
                            <th className="py-3 px-4 text-center">Situação</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F1F5F9]">
                          {gifts
                            .filter((g) =>
                              !searchQuery.trim()
                                ? true
                                : g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  g.category.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((gift) => (
                              <tr key={gift.id} className="hover:bg-[#F9FBFE]">
                                <td className="py-3 px-4 font-medium text-[#1E2E44]">
                                  {gift.name}
                                </td>
                                <td className="py-3 px-4 text-[#64748B]">{gift.category}</td>
                                <td className="py-3 px-4 text-center font-semibold">{gift.quantity_total}</td>
                                <td className="py-3 px-4 text-center text-[#2563EB] font-semibold">
                                  {gift.quantity_available}
                                </td>
                                <td className="py-3 px-4 text-center text-[#2E7D32] font-semibold">
                                  {gift.quantity_total - gift.quantity_available}
                                </td>
                                <td className="py-3 px-4 text-center">
                                  {gift.quantity_available > 0 ? (
                                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-medium">
                                      Disponível
                                    </span>
                                  ) : (
                                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[10px] font-medium">
                                      Esgotado
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Reservation Detail Modal */}
                {selectedReservation && (
                  <div className="fixed inset-0 z-60 bg-black/40 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200">
                      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                        <h4 className="font-serif text-lg font-medium text-[#1E2E44]">
                          Detalhes da Reserva
                        </h4>
                        <button
                          onClick={() => setSelectedReservation(null)}
                          className="p-1 text-slate-400 hover:text-slate-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-3 text-xs text-[#2D3E50]">
                        <div>
                          <span className="text-slate-400 block">Presente:</span>
                          <span className="font-semibold text-sm">{selectedReservation.gift_name}</span> ({selectedReservation.gift_category})
                        </div>
                        <div>
                          <span className="text-slate-400 block">Convidado:</span>
                          <span className="font-medium text-sm">{selectedReservation.guest_name}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">E-mail:</span>
                          <span>{selectedReservation.guest_email}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">WhatsApp:</span>
                          <span>{selectedReservation.guest_phone}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Data da Reserva:</span>
                          <span>{new Date(selectedReservation.reserved_at).toLocaleString('pt-BR')}</span>
                        </div>
                        {selectedReservation.message && (
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 italic text-slate-600">
                            "{selectedReservation.message}"
                          </div>
                        )}
                      </div>

                      <div className="mt-6 pt-3 border-t border-slate-100 flex justify-end gap-2">
                        <button
                          onClick={() => setSelectedReservation(null)}
                          className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium"
                        >
                          Fechar
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
