import React from 'react';

export const CoupleGallery = () => {
  return (
    <section className="py-20 bg-blue-50/50" id="galeria">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <p className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-2">
          Galeria do Casal
        </p>
        <h2 className="text-4xl font-serif text-slate-800 mb-4">
          Dois caminhos, uma nova história
        </h2>
        <p className="text-slate-600 mb-12">
          Um dos momentos mais preciosos que guardamos no coração.
        </p>

        <div className="rounded-2xl overflow-hidden shadow-xl bg-white p-4">
          {/* O src "/foto-casal.jpg" busca a imagem direto da pasta public */}
          <img
            src="/foto-casal.jpeg"
            alt="Bruna e Riclaube"
            className="w-full h-auto object-contain rounded-xl"
          />
          <div className="mt-6 mb-2 text-slate-700 font-serif text-xl">
            Bruna & Riclaube
          </div>
          <p className="text-slate-400 text-sm">Nossa Certeza</p>
        </div>
      </div>
    </section>
  );
};