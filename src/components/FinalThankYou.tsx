import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import {
  FloralCornerTopRight,
  FloralCornerBottomLeft,
  InvitationHeartFlourish,
} from './FloralDecorations';

export const FinalThankYou: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-[#FAFBFD] via-[#F2F7FC] to-[#FAFBFD] overflow-hidden text-center">
      <FloralCornerTopRight className="absolute top-0 right-0 w-44 sm:w-72 md:w-80 opacity-80" />
      <FloralCornerBottomLeft className="absolute bottom-0 left-0 w-44 sm:w-72 md:w-80 opacity-80" />

      <div className="relative z-10 max-w-2xl mx-auto p-8 sm:p-12 bg-white/75 backdrop-blur-sm rounded-3xl border border-[#D0E2F2]/60 shadow-[0_4px_30px_rgba(30,58,95,0.04)]">
        {/* Inner subtle frame line */}
        <div className="absolute inset-2.5 sm:inset-3 border border-[#E2ECF5] rounded-2xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-12 h-12 rounded-full bg-[#EBF3FB] text-[#345A82] flex items-center justify-center mx-auto mb-4"
        >
          <Heart className="w-5 h-5 fill-[#345A82]/15" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#1E2E44] font-normal tracking-tight mb-4"
        >
          Obrigada por fazer parte da nossa história. 💙
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <InvitationHeartFlourish className="w-44 sm:w-52 h-6" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="text-sm sm:text-base text-[#52687F] font-light max-w-md mx-auto leading-relaxed mb-6"
        >
          A presença, as orações e o carinho de cada um de vocês são as maiores bênçãos que poderíamos receber para o início do nosso lar.
        </motion.p>

        <div className="pt-2">
          <p className="text-xs uppercase tracking-widest text-[#7893AC]">Com carinho,</p>
          <p className="font-serif text-2xl sm:text-3xl text-[#2F4F75] font-medium italic mt-1">
            Bruna & Riclaube
          </p>

          <div className="mt-5 flex items-center justify-center gap-3 text-lg font-serif text-[#5B7B9E]">
            <span>B</span>
            <span className="w-px h-4 bg-[#5B7B9E]/40" />
            <span>R</span>
          </div>
          <p className="text-xs text-[#7A93AA] mt-1 tracking-wider">05/12/2026</p>
        </div>
      </div>
    </section>
  );
};
