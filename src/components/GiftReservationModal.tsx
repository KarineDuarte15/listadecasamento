import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Gift as GiftIcon, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { Gift } from '../types';
import { supabase } from '../supabase';

interface GiftReservationModalProps {
  gift: Gift | null;
  onClose: () => void;
  onSuccess: (reservationData: any) => void;
}

export const GiftReservationModal: React.FC<GiftReservationModalProps> = ({
  gift,
  onClose,
  onSuccess,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!gift) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('Por favor, informe seu nome completo.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Por favor, informe um endereço de e-mail válido.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 8) {
      setErrorMessage('Por favor, informe um número de WhatsApp válido.');
      return;
    }
    if (!confirmed) {
      setErrorMessage('Por favor, marque a caixa confirmando a escolha do presente.');
      return;
    }

    setSubmitting(true);

    // Agrupamos os dados usando as variáveis de estado (useState) que já existem
    const reservationData = {
      name: name,
      email: email,
      phone: phone,
      message: message
    };

    try {
      // Atualiza o item na tabela 'presentes', marcando como indisponível e salvando os dados
      const { error } = await supabase
        .from('presentes')
        .update({
          disponivel: false,
          reservado_por: reservationData.name,
          email_convidado: reservationData.email,
          telefone_convidado: reservationData.phone
        })
        .eq('id', gift.id);

      if (error) throw error;

      // Passa os dados da reserva para a tela de sucesso
      onSuccess(reservationData); 

      // Abre o WhatsApp da noiva com a mensagem pronta usando a propriedade correta (gift.name)
      const mensagem = `Olá Bruna! Escolhi presentear vocês com: ${gift.name}.`;
      window.open(`https://wa.me/558589103367?text=${encodeURIComponent(mensagem)}`, '_blank');

    } catch (err) {
      console.error("Erro ao reservar:", err);
      setErrorMessage('Erro de conexão ao enviar dados. Por favor, tente novamente.');
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0F1E33]/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D5E3F0] text-left"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            disabled={submitting}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-[#EAF3FA] text-[#345A82] flex items-center justify-center mx-auto mb-3">
              <GiftIcon className="w-6 h-6" />
            </div>
            <p className="text-xs uppercase tracking-widest text-[#728BA6] font-semibold">
              Você escolheu:
            </p>
            <h3 className="text-xl sm:text-2xl font-serif text-[#1E2E44] font-medium mt-1">
              {gift.name}
            </h3>
            <span className="inline-block text-[11px] font-medium tracking-wide uppercase px-2.5 py-0.5 rounded-md bg-[#F0F5FA] text-[#486B91] mt-2">
              {gift.category}
            </span>
          </div>

          {/* Error notification */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#334D66] mb-1">
                Nome completo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                disabled={submitting}
                className="w-full px-4 py-2.5 rounded-xl border border-[#CADDEC] text-sm text-[#1E2E44] placeholder:text-[#9BB1C7] focus:outline-none focus:ring-2 focus:ring-[#3A5D85]/20 focus:border-[#3A5D85] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#334D66] mb-1">
                E-mail <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                disabled={submitting}
                className="w-full px-4 py-2.5 rounded-xl border border-[#CADDEC] text-sm text-[#1E2E44] placeholder:text-[#9BB1C7] focus:outline-none focus:ring-2 focus:ring-[#3A5D85]/20 focus:border-[#3A5D85] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#334D66] mb-1">
                WhatsApp com DDD <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(85) 99999-9999"
                disabled={submitting}
                className="w-full px-4 py-2.5 rounded-xl border border-[#CADDEC] text-sm text-[#1E2E44] placeholder:text-[#9BB1C7] focus:outline-none focus:ring-2 focus:ring-[#3A5D85]/20 focus:border-[#3A5D85] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#334D66] mb-1">
                Deixe uma mensagem carinhosa para os noivos (opcional)
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escreva seus votos ou felicitações para Bruna & Riclaube..."
                disabled={submitting}
                className="w-full px-4 py-2 rounded-xl border border-[#CADDEC] text-sm text-[#1E2E44] placeholder:text-[#9BB1C7] focus:outline-none focus:ring-2 focus:ring-[#3A5D85]/20 focus:border-[#3A5D85] transition-all resize-none"
              />
            </div>

            {/* Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  required
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  disabled={submitting}
                  className="w-4 h-4 mt-0.5 rounded text-[#3A5D85] border-[#CADDEC] focus:ring-[#3A5D85] accent-[#3A5D85]"
                />
                <span className="text-xs text-[#415C77] leading-relaxed">
                  Confirmo que escolhi este presente para os noivos.
                </span>
              </label>
            </div>

            {/* Privacy notice */}
            <div className="p-3 rounded-xl bg-[#F4F8FC] border border-[#D9E7F4] flex items-start gap-2 text-[11px] text-[#597591]">
              <ShieldCheck className="w-4 h-4 text-[#406894] shrink-0 mt-0.5" />
              <p>
                Seus dados serão utilizados apenas para registrar e confirmar a escolha do presente.
              </p>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-3 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#3A5D85] hover:bg-[#2C4869] text-white font-medium text-sm sm:text-base tracking-wide transition-all shadow-[0_4px_14px_rgba(58,93,133,0.25)] disabled:opacity-60 active:scale-[0.98]"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Registrando presente...</span>
                </>
              ) : (
                <span>Confirmar presente</span>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};