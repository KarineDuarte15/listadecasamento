import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Heart } from 'lucide-react';
import { InvitationHeartFlourish } from './FloralDecorations';

// Wedding Date: 05 de Dezembro de 2026 às 17:00 (Horário de Brasília/Fortaleza UTC-3)
const WEDDING_TIMESTAMP = new Date('2026-12-05T17:00:00-03:00').getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function calculateTimeLeft(): TimeLeft {
  const now = new Date().getTime();
  const difference = WEDDING_TIMESTAMP - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isPast: false,
  };
}

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'DIAS', value: timeLeft.days },
    { label: 'HORAS', value: String(timeLeft.hours).padStart(2, '0') },
    { label: 'MINUTOS', value: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'SEGUNDOS', value: String(timeLeft.seconds).padStart(2, '0') },
  ];

  return (
    <section className="relative py-18 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-[#F2F7FC] to-[#FAFBFD] overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white shadow-sm border border-[#D5E3F0] text-[#3D628B] text-xs font-semibold uppercase tracking-widest mb-3"
        >
          <Clock className="w-3.5 h-3.5 text-[#5A80A8]" />
          <span>05 de Dezembro de 2026</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#1E2E44] font-normal tracking-tight mb-3"
        >
          Contando os dias para o nosso grande dia
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <InvitationHeartFlourish className="w-44 sm:w-52 h-6" />
        </motion.div>

        {timeLeft.isPast ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-8 rounded-2xl bg-white shadow-[0_8px_30px_rgba(30,58,95,0.08)] border border-[#CDE0F0] max-w-lg mx-auto"
          >
            <Heart className="w-10 h-10 text-[#406791] mx-auto mb-3 animate-pulse" />
            <p className="text-2xl font-serif text-[#1E2E44] font-medium">
              Hoje é o nosso grande dia! 💙
            </p>
            <p className="text-sm text-[#5D7287] mt-2">
              Celebrando o amor de Bruna & Riclaube com todos vocês.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 max-w-2xl mx-auto">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="relative p-5 sm:p-6 rounded-2xl bg-white shadow-[0_4px_20px_rgba(30,58,95,0.05)] border border-[#D5E3F0] flex flex-col items-center justify-center transition-all hover:shadow-[0_6px_25px_rgba(30,58,95,0.1)] hover:-translate-y-0.5"
              >
                {/* Number Display */}
                <div className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-[#2E4F75] tracking-tight mb-1 tabular-nums">
                  {unit.value}
                </div>
                {/* Unit Label */}
                <div className="text-[11px] sm:text-xs tracking-widest text-[#728BA6] font-medium uppercase">
                  {unit.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-xs sm:text-sm text-[#6C8196] font-light mt-8 flex items-center justify-center gap-1.5"
        >
          <Calendar className="w-3.5 h-3.5 text-[#547BA6]" />
          <span>Sábado, 05 de Dezembro de 2026</span>
        </motion.p>
      </div>
    </section>
  );
};
