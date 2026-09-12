import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Gift } from '../types';
import { GiftReservationModal } from './GiftReservationModal';
import { Loader2, Gift as GiftIcon, Copy, CheckCircle } from 'lucide-react';

export const GiftRegistry = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedRandom, setCopiedRandom] = useState(false);

  useEffect(() => {
    fetchGifts();
  }, []);

  const fetchGifts = async () => {
    try {
      const { data, error } = await supabase
        .from('presentes')
        .select('*')
        .order('nome_presente', { ascending: true });

      if (error) throw error;

      if (data) {
        const formattedGifts: Gift[] = data.map((item) => ({
          id: item.id,
          name: item.nome_presente,
          category: item.categoria,
          quantity_total: item.quantidade_total,
          quantity_available: item.quantidade_disponivel,
          status: item.quantidade_disponivel > 0 ? 'disponivel' : 'esgotado'
        }));
        setGifts(formattedGifts);
      }
    } catch (err) {
      console.error("Erro ao carregar presentes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, type: 'phone' | 'random') => {
    navigator.clipboard.writeText(text);
    if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedRandom(true);
      setTimeout(() => setCopiedRandom(false), 2000);
    }
  };

  return (
    <section className="py-20 bg-slate-50" id="presentes">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-slate-800 mb-4">Um presente para nossa nova história</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Mais do que presentes, queremos celebrar com pessoas especiais o início de uma nova fase da nossa história. Se você quiser nos presentear, preparamos uma lista com itens que farão parte do nosso novo lar ou, se preferir, contribua com uma cota via PIX.
          </p>
        </div>

        {/* Card PIX */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8 mb-16 max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="w-48 h-48 shrink-0 bg-white rounded-2xl overflow-hidden p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative z-10">
            <img src="/qr-pix.jpeg" alt="QR Code PIX PagBank" className="w-full h-full object-contain" />
          </div>
          
          <div className="flex-1 w-full text-center md:text-left relative z-10">
            <h3 className="text-2xl font-serif text-slate-800 mb-2">Cota Gravata / Sapatinho</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              O valor mínimo sugerido para esta categoria é de <strong>R$ 100,00</strong>. Fique à vontade para presentear com o valor que tocar o seu coração!
            </p>
            
            <div className="space-y-3">
              {/* PIX Celular */}
              <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-50/80 p-3 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider w-20">Celular</span>
                <span className="font-mono text-slate-600 text-sm flex-1">85989103367</span>
                <button 
                  onClick={() => handleCopy('85989103367', 'phone')} 
                  className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-white font-medium px-4 py-2 bg-blue-50 hover:bg-blue-600 rounded-lg transition-all"
                >
                  {copiedPhone ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} {copiedPhone ? 'Copiado!' : 'Copiar'}
                </button>
              </div>

              {/* PIX Aleatório */}
              <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-50/80 p-3 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider w-20">Aleatória</span>
                <span className="font-mono text-slate-600 text-xs flex-1 truncate" title="00020126580014br.gov.bcb.pix0136db0aae3c-0bbf-41b1-9a73-c77c7b2b2b9427600016BR.COM.PAGSEGURO0136CF09C032-ACA8-4FE3-80B3-37487FC6B8E65204569753039865802BR5925BRUNA ROCHELE DE SALES RI6009FORTALEZA62290525PAGS0000000002609120954966304485F">
                  00020126580014br.gov.bcb.pix...
                </span>
                <button 
                  onClick={() => handleCopy('00020126580014br.gov.bcb.pix0136db0aae3c-0bbf-41b1-9a73-c77c7b2b2b9427600016BR.COM.PAGSEGURO0136CF09C032-ACA8-4FE3-80B3-37487FC6B8E65204569753039865802BR5925BRUNA ROCHELE DE SALES RI6009FORTALEZA62290525PAGS0000000002609120954966304485F', 'random')} 
                  className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-white font-medium px-4 py-2 bg-blue-50 hover:bg-blue-600 rounded-lg transition-all"
                >
                   {copiedRandom ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} {copiedRandom ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Lista Física */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-blue-500" />
            <p className="font-serif">Preparando a lista de presentes...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gifts.map((gift) => (
              <div key={gift.id} className={`bg-white rounded-2xl shadow-sm border p-6 flex flex-col transition-all duration-300 ${gift.status === 'esgotado' ? 'opacity-60 border-slate-100 grayscale-[0.2]' : 'border-blue-50 hover:shadow-[0_8px_30px_rgb(58,93,133,0.08)] hover:-translate-y-1'}`}>
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-full bg-[#F0F5FA] flex items-center justify-center text-[#3A5D85]">
                    <GiftIcon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#728BA6] bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                      {gift.category}
                    </span>
                    {gift.quantity_available > 0 && (
                      <span className="text-[10px] font-semibold text-[#3A5D85]">
                        {gift.quantity_available} de {gift.quantity_total} disponíveis
                      </span>
                    )}
                  </div>
                </div>
                
                <h3 className="text-lg font-serif text-slate-800 mb-6 flex-1">{gift.name}</h3>
                
                <button
                  onClick={() => setSelectedGift(gift)}
                  disabled={gift.status === 'esgotado'}
                  className={`w-full py-3 rounded-xl text-sm font-medium transition-all ${
                    gift.status === 'esgotado' 
                      ? 'bg-slate-50 text-slate-400 border border-slate-200 cursor-not-allowed'
                      : gift.quantity_available === 1
                        ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                        : 'bg-[#3A5D85] text-white hover:bg-[#2C4869] shadow-md hover:shadow-lg'
                  }`}
                >
                  {gift.status === 'esgotado' 
                    ? 'Já encontrou um lugar na nossa casa 💙' 
                    : gift.quantity_available === 1 
                      ? 'Última unidade disponível' 
                      : 'Escolher presente'}
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedGift && (
          <GiftReservationModal
            gift={selectedGift}
            onClose={() => setSelectedGift(null)}
            onSuccess={() => {
              setSelectedGift(null);
              fetchGifts();
            }}
          />
        )}
      </div>
    </section>
  );
};