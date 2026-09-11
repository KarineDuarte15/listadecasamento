import React from 'react';
import { motion } from 'motion/react';
import { Gift, UserCheck, HeartHandshake } from 'lucide-react';
import { InvitationHeartFlourish } from './FloralDecorations';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Escolha um presente',
      description: 'Navegue pelas categorias e escolha com carinho um item que fará parte do nosso lar.',
      icon: Gift,
    },
    {
      number: '02',
      title: 'Informe seus dados',
      description: 'Preencha seu nome, e-mail e WhatsApp para registrarmos sua escolha com segurança.',
      icon: UserCheck,
    },
    {
      number: '03',
      title: 'Pronto! Seu presente estará reservado',
      description: 'Você receberá as orientações e saberá exatamente o prazo e endereço para entrega.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-[#F5F8FC] border-y border-[#E2ECF5]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#507299] mb-2"
          >
            Passo a Passo
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#1E2E44] font-normal tracking-tight mb-3"
          >
            Como funciona
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-3"
          >
            <InvitationHeartFlourish className="w-40 sm:w-48 h-5" />
          </motion.div>
          <p className="text-sm text-[#5D7287] font-light">
            Três passos simples para nos abençoar com o seu presente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 * index }}
                className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(30,58,95,0.05)] border border-[#D5E3F0] flex flex-col items-center text-center transition-all hover:shadow-[0_8px_30px_rgba(30,58,95,0.09)]"
              >
                {/* Step number badge */}
                <div className="text-xs font-serif italic text-[#7896B8] tracking-widest uppercase mb-4">
                  Passo {step.number}
                </div>

                {/* Step icon */}
                <div className="w-14 h-14 rounded-2xl bg-[#EEF5FB] text-[#345A82] flex items-center justify-center mb-5 border border-[#D9E7F4]">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1E2E44] mb-2.5">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5F758C] font-light leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
