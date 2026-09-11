import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gift as GiftIcon,
  Search,
  CheckCircle2,
  Filter,
  Sparkles,
  Heart,
  X,
} from 'lucide-react';
import { Gift, GiftCategory, RegistryStats } from '../types';
import { InvitationHeartFlourish } from './FloralDecorations';

interface GiftRegistryProps {
  gifts: Gift[];
  stats: RegistryStats;
  loading: boolean;
  onSelectGift: (gift: Gift) => void;
}

const CATEGORIES: (GiftCategory | 'Todos')[] = [
  'Todos',
  'Utensílios de cozinha',
  'Cama',
  'Banho',
  'Mesa',
  'Lavanderia',
  'Eletroportáteis',
  'Outros itens para casa',
];

export const GiftRegistry: React.FC<GiftRegistryProps> = ({
  gifts,
  stats,
  loading,
  onSelectGift,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<GiftCategory | 'Todos'>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  // Filter gifts dynamically
  const filteredGifts = useMemo(() => {
    return gifts.filter((gift) => {
      // Category filter
      if (selectedCategory !== 'Todos' && gift.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = gift.name.toLowerCase().includes(query);
        const matchesCat = gift.category.toLowerCase().includes(query);
        if (!matchesName && !matchesCat) return false;
      }
      // Only available filter
      if (onlyAvailable && gift.quantity_available <= 0) {
        return false;
      }
      return true;
    });
  }, [gifts, selectedCategory, searchQuery, onlyAvailable]);

  return (
    <section id="lista-de-presentes" className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[#FAFBFD]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF3FB] text-[#3A5D85] text-xs font-semibold uppercase tracking-widest mb-3"
          >
            <GiftIcon className="w-3.5 h-3.5 text-[#507299]" />
            <span>Lista de Casamento</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1E2E44] font-normal tracking-tight mb-3"
          >
            Lista de presentes
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <InvitationHeartFlourish className="w-48 sm:w-56 h-6" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="text-sm sm:text-base text-[#5D7287] font-light max-w-lg mx-auto"
          >
            Escolha um presente para fazer parte da nossa nova história.
          </motion.p>
        </div>

        {/* Dynamic Registry Statistics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto mb-10 p-4 sm:p-5 rounded-2xl bg-white shadow-[0_4px_20px_rgba(30,58,95,0.05)] border border-[#D5E3F0] flex flex-wrap items-center justify-around gap-4 text-center"
        >
          <div className="flex items-center gap-3 px-3">
            <div className="w-10 h-10 rounded-full bg-[#EAF3FA] text-[#345A82] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-xl sm:text-2xl font-serif font-medium text-[#2E4F75] tabular-nums">
                {stats.available_gifts}
              </div>
              <div className="text-xs text-[#6F869E] font-medium">presentes disponíveis</div>
            </div>
          </div>

          <div className="hidden sm:block w-px h-10 bg-[#E2ECF5]" />

          <div className="flex items-center gap-3 px-3">
            <div className="w-10 h-10 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-xl sm:text-2xl font-serif font-medium text-[#2E7D32] tabular-nums">
                {stats.reserved_gifts}
              </div>
              <div className="text-xs text-[#6F869E] font-medium">presentes já escolhidos</div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A93AA]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Procurar um presente..."
                className="w-full pl-10 pr-9 py-2.5 rounded-full bg-white border border-[#D5E3F0] text-sm text-[#1E2E44] placeholder:text-[#889EB5] focus:outline-none focus:ring-2 focus:ring-[#3A5D85]/20 focus:border-[#3A5D85] transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Toggle: Only Available */}
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs sm:text-sm text-[#4E6780] hover:text-[#2E4F75] transition-colors self-start sm:self-auto">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="w-4 h-4 rounded text-[#3A5D85] border-[#CADDEC] focus:ring-[#3A5D85] accent-[#3A5D85]"
              />
              <span>Mostrar apenas presentes disponíveis</span>
            </label>
          </div>

          {/* Category Filter Pills (Horizontal scrollable on mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth">
            <Filter className="w-3.5 h-3.5 text-[#728BA6] shrink-0 ml-1 mr-1" />
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 shrink-0 ${
                    isSelected
                      ? 'bg-[#3A5D85] text-white shadow-[0_2px_8px_rgba(58,93,133,0.3)]'
                      : 'bg-white text-[#4A6482] border border-[#D5E3F0] hover:border-[#ADC7DE] hover:bg-[#F2F7FC]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gift Cards Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-2 border-[#3A5D85] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-[#5D7287]">Carregando lista de presentes...</p>
          </div>
        ) : filteredGifts.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-[#D5E3F0] p-8 max-w-lg mx-auto">
            <GiftIcon className="w-12 h-12 text-[#8FAAC4] mx-auto mb-3" />
            <h3 className="font-serif text-xl text-[#1E2E44] mb-2 font-medium">
              Nenhum presente encontrado
            </h3>
            <p className="text-xs sm:text-sm text-[#6C8196] mb-4">
              Tente mudar o filtro de categoria ou buscar por outro termo.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Todos');
                setSearchQuery('');
                setOnlyAvailable(false);
              }}
              className="text-xs font-medium text-[#3A5D85] hover:underline"
            >
              Limpar filtros de busca
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            <AnimatePresence>
              {filteredGifts.map((gift) => {
                const isAvailable = gift.quantity_available > 0;
                const isLastUnit = gift.quantity_available === 1 && gift.quantity_total > 1;

                return (
                  <motion.div
                    key={gift.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className={`relative rounded-2xl bg-white p-5 sm:p-6 shadow-[0_2px_16px_rgba(30,58,95,0.04)] border flex flex-col justify-between transition-all duration-300 ${
                      isAvailable
                        ? 'border-[#D5E3F0] hover:shadow-[0_6px_25px_rgba(30,58,95,0.08)] hover:-translate-y-0.5'
                        : 'border-[#E2E8F0] bg-slate-50/70 opacity-90'
                    }`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-medium tracking-wide uppercase px-2.5 py-0.5 rounded-md bg-[#EDF4FB] text-[#406791]">
                          {gift.category}
                        </span>

                        {isAvailable ? (
                          isLastUnit ? (
                            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                              Última unidade disponível
                            </span>
                          ) : (
                            <span className="text-[11px] font-medium text-[#5D7A99]">
                              {gift.quantity_available}{' '}
                              {gift.quantity_available === 1 ? 'disponível' : 'disponíveis'}
                            </span>
                          )
                        ) : null}
                      </div>

                      {/* Gift Name */}
                      <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1E2E44] mb-2 leading-snug">
                        {gift.name}
                      </h3>

                      {/* Total quantity note if multi-unit */}
                      {gift.quantity_total > 1 && (
                        <p className="text-xs text-[#7A93AA] mb-4">
                          Total desejado pelos noivos: {gift.quantity_total} unidades
                        </p>
                      )}
                    </div>

                    {/* Action Area */}
                    <div className="mt-4 pt-3 border-t border-[#EDF3F8]">
                      {isAvailable ? (
                        <button
                          type="button"
                          onClick={() => onSelectGift(gift)}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#3A5D85] hover:bg-[#2A486A] text-white font-medium text-xs sm:text-sm tracking-wide transition-all shadow-[0_2px_10px_rgba(58,93,133,0.2)] active:scale-[0.98]"
                        >
                          <GiftIcon className="w-3.5 h-3.5" />
                          <span>Escolher presente</span>
                        </button>
                      ) : (
                        <div className="p-3 rounded-xl bg-[#EFF6FF]/60 border border-[#BFDBFE]/60 text-center">
                          <p className="text-xs sm:text-sm text-[#1E40AF] font-light leading-relaxed flex items-center justify-center gap-1.5">
                            <Heart className="w-3.5 h-3.5 text-[#2563EB] shrink-0 fill-[#2563EB]/20" />
                            <span>Este presente já encontrou um lugar na nossa nova casa 💙</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};
