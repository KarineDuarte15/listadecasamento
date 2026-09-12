import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Gift } from '../types';
import { GiftReservationModal } from './GiftReservationModal';
import { Loader2, Gift as GiftIcon, Copy, CheckCircle } from 'lucide-react';

export const GiftRegistry = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [copied, setCopied] = useState(false);

  // Busca os dados diretamente do Supabase ao abrir a tela
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
        // Formata os dados do banco para o padrão que o React entende
        const formattedGifts: Gift[] = data.map((item) => ({
          id: item.id,
          name: item.nome_presente,
          category: 'Outros itens para casa',
          quantity_total: 1,
          quantity_available: item.disponivel ? 1 : 0,
          status: item.disponivel ? 'disponivel' : 'esgotado'
        }));
        setGifts(formattedGifts);
      }
    } catch (err) {
      console.error("Erro ao carregar presentes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPix = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 bg-slate-50" id="presentes">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-slate-800 mb-4">Lista de Presentes</h2>
          <p className="text-slate-600">Escolha um item da lista ou nos presenteie com uma cota via PIX.</p>
        </div>

        {/* Card de Contribuição via PIX */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 mb-16 max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-48 shrink-0 bg-slate-100 rounded-xl overflow-hidden p-2 border-2 border-blue-100">
            {/* Imagem do QR Code que foi salva na pasta public */}
            <img src="/qr-pix.jpeg" alt="QR Code PIX PagBank" className="w-full h-full object-contain mix-blend-multiply" />
          </div>
          <div className="flex-1 w-full text-center md:text-left">
            <h3 className="text-2xl font-serif text-slate-800 mb-2">Cota Gravata / Sapatinho</h3>
            <p className="text-slate-600 text-sm mb-6">
              O valor mínimo sugerido para esta categoria é de <strong>R$ 100,00</strong>. Fique à vontade para presentear com o valor que tocar o seu coração!
            </p>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase w-24">Celular</span>
                <span className="font-mono text-slate-700 text-sm flex-1 break-all">85989103367</span>
                <button onClick={() => handleCopyPix('85989103367')} className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium px-3 py-1.5 bg-blue-50 rounded-md">
                  {copied ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />} Copiar
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase w-24">Aleatória</span>
                <span className="font-mono text-slate-700 text-xs flex-1 truncate" title="00020126580014br.gov.bcb.pix0136db0aae3c-0bbf-41b1-9a73-c77c7b2b2b9427600016BR.COM.PAGSEGURO0136CF09C032-ACA8-4FE3-80B3-37487FC6B8E65204569753039865802BR5925BRUNA ROCHELE DE SALES RI6009FORTALEZA62290525PAGS0000000002609120954966304485F">
                  00020126580014br.gov.bcb.pix...
                </span>
                <button onClick={() => handleCopyPix('00020126580014br.gov.bcb.pix0136db0aae3c-0bbf-41b1-9a73-c77c7b2b2b9427600016BR.COM.PAGSEGURO0136CF09C032-ACA8-4FE3-80B3-37487FC6B8E65204569753039865802BR5925BRUNA ROCHELE DE SALES RI6009FORTALEZA62290525PAGS0000000002609120954966304485F')} className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium px-3 py-1.5 bg-blue-50 rounded-md">
                   <Copy className="w-4 h-4" /> Copiar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Presentes Físicos */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-blue-500" />
            <p>Carregando lista de presentes...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gifts.map((gift) => (
              <div key={gift.id} className={`bg-white rounded-xl shadow-sm border p-6 transition-all ${gift.status === 'esgotado' ? 'opacity-60 border-slate-200' : 'border-blue-100 hover:shadow-md'}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <GiftIcon className="w-6 h-6" />
                  </div>
                  {gift.status === 'esgotado' && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-50 px-2 py-1 rounded-md">Já Presenteado</span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">{gift.name}</h3>
                <p className="text-sm text-slate-500 mb-6">{gift.category}</p>
                
                <button
                  onClick={() => setSelectedGift(gift)}
                  disabled={gift.status === 'esgotado'}
                  className="w-full py-2.5 rounded-lg text-sm font-medium transition-colors border disabled:cursor-not-allowed border-blue-600 text-blue-600 hover:bg-blue-50 disabled:border-slate-200 disabled:text-slate-400 disabled:bg-slate-50"
                >
                  {gift.status === 'esgotado' ? 'Indisponível' : 'Presentear'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Modal de Confirmação */}
        {selectedGift && (
          <GiftReservationModal
            gift={selectedGift}
            onClose={() => setSelectedGift(null)}
            onSuccess={() => {
              setSelectedGift(null);
              fetchGifts(); // Recarrega a lista para ocultar o item automaticamente
            }}
          />
        )}
      </div>
    </section>
  );
};