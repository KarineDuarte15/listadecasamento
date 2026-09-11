import React from 'react';
import { Heart } from 'lucide-react';
import { InvitationHeartFlourish } from './FloralDecorations';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="relative bg-[#F2F7FC] border-t border-[#D5E3F0] pt-12 pb-8 px-4 sm:px-6 text-center">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Monogram */}
        <div className="flex items-center justify-center gap-3 text-3xl sm:text-4xl font-serif text-[#3A5D85]">
          <span>B</span>
          <span className="w-px h-7 bg-[#7A9BBF]/40" />
          <span>R</span>
        </div>

        <p className="text-xs tracking-widest text-[#728BA6] font-medium uppercase">
          05 de Dezembro de 2026
        </p>

        <div className="py-1">
          <InvitationHeartFlourish className="w-36 sm:w-44 h-5" />
        </div>

        <p className="font-serif text-lg text-[#1E2E44] font-medium italic">
          "Com carinho, Bruna & Riclaube"
        </p>

        <p className="text-xs sm:text-sm text-[#5C758F] font-light">
          Obrigada por fazer parte da nossa história. 💙
        </p>

        {/* Bottom copyright & admin link */}
        <div className="pt-8 mt-6 border-t border-[#E2ECF5] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#8299B0]">
          <p>© 2026 Bruna & Riclaube — Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="text-[#5B7E9F] hover:text-[#2E4F75] hover:underline"
            >
              Área dos Noivos
            </button>
            <span className="flex items-center gap-1">
              Feito com <Heart className="w-3 h-3 text-rose-400 fill-rose-400" /> para o grande dia
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
