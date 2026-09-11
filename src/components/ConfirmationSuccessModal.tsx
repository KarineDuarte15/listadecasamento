import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Gift, Calendar, Share2, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GiftReservation } from '../types';

interface ConfirmationSuccessModalProps {
  reservation: GiftReservation | null;
  onClose: () => void;
}

export const ConfirmationSuccessModal: React.FC<ConfirmationSuccessModalProps> = ({
  reservation,
  onClose,
}) => {
  useEffect(() => {
    if (reservation) {
      // Trigger delicate pastel celebratory confetti
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#93C5FD', '#BFDBFE', '#3B82F6', '#E2E8F0', '#FBCFE8'],
      });
    }
  }, [reservation]);

  if (!reservation) return null;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Casamento Bruna & Riclaube',
          text: `Reservei com muito carinho o presente "${reservation.gift_name}" para o casamento de Bruna & Riclaube! 💙`,
          url: window.location.href,
        });
      } catch {
        // user cancelled share
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência! 💙');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0F1E33]/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-lg w-full bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#D5E3F0] text-center"
        >
          {/* Heart Check Icon */}
          <div className="w-16 h-16 rounded-full bg-[#EBF5EE] text-[#2E7D32] flex items-center justify-center mx-auto mb-4 border border-[#CDE5D3]">
            <Check className="w-8 h-8 stroke-[2.5]" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif text-[#1E2E44] font-medium mb-2">
            Presente reservado com carinho! 💙
          </h3>

          <p className="text-sm sm:text-base text-[#4E6680] font-light leading-relaxed mb-6">
            Obrigada por fazer parte desse momento tão especial para nós.
          </p>

          {/* Reserved Gift Card */}
          <div className="p-5 rounded-2xl bg-[#FAFBFD] border border-[#D5E3F0] mb-6 text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-[#EAF2FB] text-[#345A82] flex items-center justify-center shrink-0">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-[#738DA6]">
                  {reservation.gift_category}
                </span>
                <h4 className="font-serif text-lg text-[#1E2E44] font-medium leading-tight">
                  {reservation.gift_name}
                </h4>
              </div>
            </div>

            <p className="text-xs text-[#2E7D32] font-medium flex items-center gap-1.5 mt-2">
              <Check className="w-3.5 h-3.5" />
              <span>Seu presente foi registrado com sucesso.</span>
            </p>
          </div>

          {/* Deadline reminder */}
          <div className="p-3.5 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] mb-8 text-xs text-[#1E3A8A] flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4 text-[#2563EB] shrink-0" />
            <span className="font-medium">Data limite para entrega: 03/12/2026</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#3A5D85] hover:bg-[#2C4869] text-white font-medium text-sm transition-all shadow-[0_4px_12px_rgba(58,93,133,0.25)] active:scale-[0.98]"
            >
              Voltar para a lista
            </button>

            <button
              onClick={handleShare}
              className="w-full sm:w-auto px-5 py-3 rounded-full bg-white hover:bg-slate-50 text-[#3A5D85] border border-[#C3D8EC] font-medium text-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <Share2 className="w-4 h-4" />
              <span>Compartilhar</span>
            </button>
          </div>

          <p className="text-[11px] text-[#788EA4] mt-6 flex items-center justify-center gap-1">
            <Heart className="w-3 h-3 text-[#547BA6]" />
            <span>Bruna & Riclaube agradecem imensamente seu carinho.</span>
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
