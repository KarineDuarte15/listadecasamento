import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Copy, Check, Package, ExternalLink } from 'lucide-react';
import { InvitationHeartFlourish } from './FloralDecorations';

const FULL_ADDRESS = `Rua da Placidez, Conjunto Tatumunde, Quadra A, Bloco 30, Apto 01 - Siqueira, Fortaleza - CE`;

export const DeliveryInformation: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(FULL_ADDRESS);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Rua da Placidez, Conjunto Tatumunde, Siqueira, Fortaleza - CE'
  )}`;

  return (
    <section id="entrega" className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[#F5F8FC]">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-[#345A82] text-xs font-semibold uppercase tracking-widest mb-3 border border-[#D5E3F0]"
          >
            <Package className="w-3.5 h-3.5 text-[#547BA6]" />
            <span>Informações de Envio</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-serif text-[#1E2E44] font-normal tracking-tight mb-3"
          >
            Entrega dos presentes
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <InvitationHeartFlourish className="w-44 sm:w-52 h-6" />
          </motion.div>

          {/* Delivery Deadline Highlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#EBF3FB] text-[#244C73] border border-[#BFD5EA] text-sm sm:text-base font-medium shadow-sm"
          >
            <span>📦 Entregas até 03 de dezembro de 2026</span>
          </motion.div>
        </div>

        {/* Address Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-2xl mx-auto rounded-3xl bg-white p-6 sm:p-10 shadow-[0_6px_30px_rgba(30,58,95,0.06)] border border-[#D5E3F0]"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EEF5FC] text-[#345A82] flex items-center justify-center shrink-0 border border-[#D5E4F2]">
              <MapPin className="w-6 h-6" />
            </div>

            <div className="flex-1">
              <h3 className="text-xs uppercase tracking-widest text-[#728BA6] font-semibold mb-2">
                Endereço de Entrega
              </h3>

              <div className="space-y-1 text-[#1E2E44] text-base sm:text-lg font-light leading-snug">
                <p className="font-medium text-[#2E4F75]">Rua da Placidez</p>
                <p>Conjunto Tatumunde</p>
                <p>Quadra A • Bloco 30 • Apto 01</p>
                <p className="text-[#597187]">Bairro Siqueira • Fortaleza - CE</p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#EDF3F8] flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#3A5D85] hover:bg-[#2C4869] text-white text-xs sm:text-sm font-medium tracking-wide transition-all shadow-[0_2px_10px_rgba(58,93,133,0.2)] active:scale-[0.98]"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-200" />
                      <span>Endereço copiado! 💙</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-blue-100" />
                      <span>Copiar endereço</span>
                    </>
                  )}
                </button>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white hover:bg-[#F2F7FD] text-[#3C5E85] border border-[#CBDDEC] text-xs sm:text-sm font-medium transition-colors"
                >
                  <span>Ver no Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
