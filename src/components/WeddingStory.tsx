import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { InvitationHeartFlourish } from './FloralDecorations';

export const WeddingStory: React.FC = () => {
  return (
    <section id="nossa-historia" className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[#FAFBFD] overflow-hidden">
      {/* Soft background watercolor aura */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-[#EBF3FB]/70 to-transparent rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Section Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF3FB] text-[#406287] text-xs font-semibold uppercase tracking-widest mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#547BA6]" />
          <span>Capítulo Um</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1E2E44] font-normal tracking-tight mb-4"
        >
          Nossa história
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <InvitationHeartFlourish className="w-48 sm:w-56 h-6" />
        </motion.div>

        {/* Editorial Story Text */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="max-w-2xl mx-auto space-y-6 text-[#455A70] text-base sm:text-lg leading-relaxed font-light"
        >
          <p className="text-xl sm:text-2xl font-serif italic text-[#2D4563] leading-relaxed">
            "Cada momento nos trouxe até aqui."
          </p>
          <p>
            Agora queremos celebrar o início de uma nova etapa ao lado das pessoas que fazem parte da nossa história.
          </p>
          <p className="text-sm sm:text-base text-[#617487]">
            Construímos nosso relacionamento baseados em amor, respeito mútuo, apoio incondicional e o sonho de compartilhar a vida. A cada conversa, a cada conquista e a cada obstáculo superado, tivemos a certeza de que Deus estava desenhando nossos passos juntos.
          </p>
        </motion.div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-10 pt-4"
        >
          <p className="text-sm uppercase tracking-widest text-[#7D93A8]">Com todo o nosso amor,</p>
          <p className="font-serif text-2xl sm:text-3xl text-[#3A5D85] mt-1 font-medium italic">
            Bruna & Riclaube
          </p>
        </motion.div>
      </div>
    </section>
  );
};
