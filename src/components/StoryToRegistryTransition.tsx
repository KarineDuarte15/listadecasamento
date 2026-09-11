import React from 'react';
import { motion } from 'motion/react';
import { Gift, Home, ArrowDown } from 'lucide-react';
import { InvitationHeartFlourish } from './FloralDecorations';

interface StoryToRegistryTransitionProps {
  onScrollToRegistry: () => void;
}

export const StoryToRegistryTransition: React.FC<StoryToRegistryTransitionProps> = ({
  onScrollToRegistry,
}) => {
  return (
    <section className="relative py-20 sm:py-24 px-4 sm:px-6 bg-[#FAFBFD] overflow-hidden">
      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Subtle Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-14 h-14 rounded-full bg-[#EBF3FB] text-[#3A5D85] flex items-center justify-center mx-auto mb-5 shadow-sm border border-[#D5E3F0]"
        >
          <Home className="w-6 h-6" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#1E2E44] font-normal tracking-tight mb-3"
        >
          Um presente para nossa nova história
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

        {/* Emotional text */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="space-y-4 text-base sm:text-lg text-[#475E75] font-light leading-relaxed max-w-xl mx-auto"
        >
          <p>
            Mais do que presentes, queremos celebrar com pessoas especiais o início de uma nova fase da nossa história.
          </p>
          <p>
            Se você quiser nos presentear, preparamos uma lista com itens que farão parte do nosso novo lar.
          </p>
          <p className="text-[#647C94] text-sm sm:text-base">
            Escolha um item, informe seus dados e pronto.
          </p>
          <p className="font-serif italic text-xl text-[#2F4F75] pt-2">
            "Ficaremos muito felizes com seu carinho."
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="mt-8"
        >
          <button
            id="transition-btn-registry"
            onClick={onScrollToRegistry}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#3A5D85] hover:bg-[#2A486A] text-white font-medium text-sm sm:text-base tracking-wide transition-all shadow-[0_4px_16px_rgba(58,93,133,0.25)] hover:shadow-[0_6px_22px_rgba(58,93,133,0.35)] active:scale-[0.98]"
          >
            <Gift className="w-4 h-4 text-blue-100" />
            <span>Ver lista de presentes</span>
            <ArrowDown className="w-4 h-4 ml-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
