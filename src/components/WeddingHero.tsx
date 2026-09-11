import React from 'react';
import { motion } from 'motion/react';
import { Gift, Heart, Calendar } from 'lucide-react';
import {
  FloralCornerTopRight,
  FloralCornerBottomLeft,
  InvitationHeartFlourish,
} from './FloralDecorations';

interface WeddingHeroProps {
  onScrollToRegistry: () => void;
  onScrollToStory: () => void;
}

export const WeddingHero: React.FC<WeddingHeroProps> = ({
  onScrollToRegistry,
  onScrollToStory,
}) => {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 overflow-hidden bg-gradient-to-b from-[#F7FAFD] via-[#FAFBFD] to-[#F2F7FC]">
      {/* Decorative corners */}
      <FloralCornerTopRight className="absolute top-0 right-0 w-48 sm:w-80 md:w-96 lg:w-[440px] opacity-90" />
      <FloralCornerBottomLeft className="absolute bottom-0 left-0 w-48 sm:w-80 md:w-96 lg:w-[440px] opacity-90" />

      {/* Subtle watercolor ambient glow behind central card */}
      <div
        className="absolute w-[320px] sm:w-[540px] h-[320px] sm:h-[540px] rounded-full bg-blue-100/40 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Central Framed Invitation Card with delicate double border */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-2xl w-full mx-auto p-6 sm:p-12 md:p-14 text-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_8px_32px_rgba(30,58,95,0.06)] border border-[#D0E2F2]/70"
      >
        {/* Inner thin decorative frame line */}
        <div className="absolute inset-2 sm:inset-3 border border-[#DDE8F4] rounded-xl pointer-events-none" />

        {/* Wedding Date Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF3FB] text-[#345375] text-xs sm:text-sm font-medium tracking-wider uppercase mb-5"
        >
          <Calendar className="w-3.5 h-3.5 text-[#4E769E]" />
          <span>05 de Dezembro de 2026</span>
        </motion.div>

        {/* Initials: B | R */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.9 }}
          className="my-3 sm:my-5"
        >
          <div className="flex items-center justify-center gap-4 sm:gap-7 text-6xl sm:text-7xl md:text-8xl font-serif text-[#4B6B94] tracking-tight font-normal">
            <span className="hover:text-[#324B6D] transition-colors">B</span>
            <span className="w-px h-14 sm:h-20 md:h-24 bg-[#7A9BBF]/50 font-thin" />
            <span className="hover:text-[#324B6D] transition-colors">R</span>
          </div>
        </motion.div>

        {/* Heart Flourish underneath initials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="my-3 sm:my-4"
        >
          <InvitationHeartFlourish className="w-52 sm:w-64 h-8" />
        </motion.div>

        {/* Couple Names in Serif */}
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#1E2E44] font-medium tracking-wide mb-3"
        >
          Bruna & Riclaube
        </motion.h2>

        {/* Headline */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-base sm:text-lg font-serif italic text-[#4A6482] mb-3"
        >
          "Nosso grande dia está chegando"
        </motion.p>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-sm sm:text-base text-[#526477] max-w-lg mx-auto leading-relaxed mb-8 font-light"
        >
          Estamos muito felizes em compartilhar esse momento especial com você.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 pt-2"
        >
          <button
            id="hero-btn-gift"
            onClick={onScrollToRegistry}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#3A5D85] hover:bg-[#2C4869] text-white font-medium text-sm sm:text-base tracking-wide transition-all shadow-[0_4px_14px_rgba(58,93,133,0.25)] hover:shadow-[0_6px_20px_rgba(58,93,133,0.35)] active:scale-[0.98]"
          >
            <Gift className="w-4 h-4 text-blue-100" />
            <span>Escolher um presente</span>
          </button>

          <button
            id="hero-btn-story"
            onClick={onScrollToStory}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/90 hover:bg-[#F2F7FD] text-[#375270] border border-[#BFD5EA] font-medium text-sm sm:text-base tracking-wide transition-all active:scale-[0.98]"
          >
            <Heart className="w-4 h-4 text-[#5F82A8]" />
            <span>Conhecer nossa história</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};
