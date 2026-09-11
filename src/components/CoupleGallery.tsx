import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, X, ChevronLeft, ChevronRight, Upload, ZoomIn } from 'lucide-react';
import { PhotoItem } from '../types';
import { InvitationHeartFlourish } from './FloralDecorations';

const DEFAULT_PHOTOS: PhotoItem[] = [
  {
    id: 'photo-1',
    title: 'Bruna & Riclaube',
    subtitle: 'Nossa Certeza',
    url: '', // User can upload / set their photo
    caption: 'O momento em que nossos corações decidiram caminhar juntos para sempre.',
  },
  {
    id: 'photo-2',
    title: 'Sorrisos Compartilhados',
    subtitle: 'Cumplicidade',
    url: '',
    caption: 'A beleza dos dias simples vividos lado a lado com muito carinho.',
  },
  {
    id: 'photo-3',
    title: 'Rumo ao Altar',
    subtitle: '05/12/2026',
    url: '',
    caption: 'A celebração do nosso amor diante de Deus e dos nossos familiares e amigos.',
  },
];

export const CoupleGallery: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    try {
      const saved = localStorage.getItem('br_wedding_photos');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return DEFAULT_PHOTOS;
  });

  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [uploadingSlotId, setUploadingSlotId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Also try to fetch photos from backend
    fetch('/api/photos')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0 && data.some(p => p.url)) {
          setPhotos(data);
        }
      })
      .catch(() => {});
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') {
        setActiveLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
      } else if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : null));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, photos.length]);

  const handleOpenUpload = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadingSlotId(id);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadingSlotId) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (result) {
        const updated = photos.map((p) =>
          p.id === uploadingSlotId ? { ...p, url: result } : p
        );
        setPhotos(updated);
        try {
          localStorage.setItem('br_wedding_photos', JSON.stringify(updated));
        } catch {}
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <section id="fotos-do-casal" className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[#F5F8FC]">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#507299] mb-2"
          >
            Galeria do Casal
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1E2E44] font-normal tracking-tight mb-4"
          >
            Dois caminhos, uma nova história
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
            className="text-sm sm:text-base text-[#5A6E82] font-light max-w-xl mx-auto"
          >
            Alguns dos momentos mais preciosos que guardamos no coração. Clique em qualquer foto para ampliar.
          </motion.p>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* Main Featured Photo (Left, 7 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-7 flex flex-col"
          >
            <div
              onClick={() => setActiveLightboxIndex(0)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white p-2.5 sm:p-3 shadow-[0_4px_24px_rgba(30,58,95,0.06)] border border-[#D5E4F3] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(30,58,95,0.12)] h-[380px] sm:h-[480px] flex flex-col justify-between"
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-tr from-[#EAF2FA] via-[#F4F8FC] to-[#FFFFFF] flex items-center justify-center">
                {photos[0]?.url ? (
                  <img
                    src={photos[0].url}
                    alt="Bruna & Riclaube"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="text-center p-6 flex flex-col items-center justify-center max-w-sm">
                    <div className="w-16 h-16 rounded-full bg-[#E1EDF8] text-[#3D628B] flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                      <Camera className="w-7 h-7" />
                    </div>
                    <span className="text-xs uppercase tracking-widest text-[#728BA6] font-semibold mb-1">
                      Foto 1 • Destaque
                    </span>
                    <h3 className="font-serif text-2xl text-[#1E2E44] mb-2 font-medium">
                      Bruna & Riclaube
                    </h3>
                    <p className="text-xs sm:text-sm text-[#62778C] font-light leading-relaxed mb-4">
                      Uma foto especial de vocês dois juntos para eternizar esse momento.
                    </p>
                    <button
                      type="button"
                      onClick={(e) => handleOpenUpload('photo-1', e)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#3A5D85] text-white hover:bg-[#2C4869] transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Inserir ou trocar foto</span>
                    </button>
                  </div>
                )}

                {/* Subtle hover overlay */}
                <div className="absolute inset-0 bg-[#1E3A5F]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="p-3 rounded-full bg-white/90 text-[#1E3A5F] shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-5 h-5" />
                  </span>
                </div>
              </div>

              {/* Caption Bar */}
              <div className="mt-2.5 px-2 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-base text-[#1E2E44] font-medium">
                    {photos[0]?.title}
                  </h4>
                  <p className="text-xs text-[#62778C]">{photos[0]?.subtitle}</p>
                </div>
                {photos[0]?.url && (
                  <button
                    type="button"
                    onClick={(e) => handleOpenUpload('photo-1', e)}
                    className="text-xs text-[#4B7099] hover:underline flex items-center gap-1"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Trocar</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Supporting Photos (Right, 5 columns) */}
          <div className="md:col-span-5 flex flex-col gap-5 sm:gap-6">
            {/* Photo 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex-1"
            >
              <div
                onClick={() => setActiveLightboxIndex(1)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white p-2.5 sm:p-3 shadow-[0_4px_24px_rgba(30,58,95,0.06)] border border-[#D5E4F3] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(30,58,95,0.12)] h-[230px] sm:h-[228px] flex flex-col justify-between"
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-tr from-[#EAF2FA] via-[#F4F8FC] to-[#FFFFFF] flex items-center justify-center">
                  {photos[1]?.url ? (
                    <img
                      src={photos[1].url}
                      alt={photos[1].title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="text-center p-4 flex flex-col items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#E1EDF8] text-[#3D628B] flex items-center justify-center mb-2 shadow-sm">
                        <Camera className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] uppercase tracking-widest text-[#728BA6] font-semibold">
                        Foto 2
                      </span>
                      <h4 className="font-serif text-lg text-[#1E2E44] font-medium">
                        {photos[1]?.title}
                      </h4>
                      <button
                        type="button"
                        onClick={(e) => handleOpenUpload('photo-2', e)}
                        className="mt-2 text-xs text-[#3A5D85] hover:underline flex items-center gap-1"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Carregar foto</span>
                      </button>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-[#1E3A5F]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="p-2 rounded-full bg-white/90 text-[#1E3A5F] shadow">
                      <ZoomIn className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <div className="mt-2 px-1 flex items-center justify-between">
                  <p className="text-xs text-[#48607A] font-medium">{photos[1]?.subtitle}</p>
                </div>
              </div>
            </motion.div>

            {/* Photo 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="flex-1"
            >
              <div
                onClick={() => setActiveLightboxIndex(2)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white p-2.5 sm:p-3 shadow-[0_4px_24px_rgba(30,58,95,0.06)] border border-[#D5E4F3] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(30,58,95,0.12)] h-[230px] sm:h-[228px] flex flex-col justify-between"
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-tr from-[#EAF2FA] via-[#F4F8FC] to-[#FFFFFF] flex items-center justify-center">
                  {photos[2]?.url ? (
                    <img
                      src={photos[2].url}
                      alt={photos[2].title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="text-center p-4 flex flex-col items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#E1EDF8] text-[#3D628B] flex items-center justify-center mb-2 shadow-sm">
                        <Camera className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] uppercase tracking-widest text-[#728BA6] font-semibold">
                        Foto 3
                      </span>
                      <h4 className="font-serif text-lg text-[#1E2E44] font-medium">
                        {photos[2]?.title}
                      </h4>
                      <button
                        type="button"
                        onClick={(e) => handleOpenUpload('photo-3', e)}
                        className="mt-2 text-xs text-[#3A5D85] hover:underline flex items-center gap-1"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Carregar foto</span>
                      </button>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-[#1E3A5F]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="p-2 rounded-full bg-white/90 text-[#1E3A5F] shadow">
                      <ZoomIn className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <div className="mt-2 px-1 flex items-center justify-between">
                  <p className="text-xs text-[#48607A] font-medium">{photos[2]?.subtitle}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxIndex(null)}
            className="fixed inset-0 z-50 bg-[#0F1E33]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Fechar visualização"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveLightboxIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : 0));
              }}
              className="absolute left-4 sm:left-8 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveLightboxIndex((prev) => (prev !== null ? (prev + 1) % photos.length : 0));
              }}
              className="absolute right-4 sm:right-8 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              aria-label="Próxima foto"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] w-full bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="relative bg-[#0D1826] flex items-center justify-center min-h-[360px] sm:min-h-[500px]">
                {photos[activeLightboxIndex]?.url ? (
                  <img
                    src={photos[activeLightboxIndex].url}
                    alt={photos[activeLightboxIndex].title}
                    className="max-h-[70vh] w-auto max-w-full object-contain mx-auto"
                  />
                ) : (
                  <div className="text-center p-8 text-white max-w-md">
                    <Camera className="w-12 h-12 mx-auto mb-3 text-blue-200" />
                    <h3 className="font-serif text-2xl mb-2 font-medium">
                      {photos[activeLightboxIndex]?.title}
                    </h3>
                    <p className="text-sm text-blue-200/80 mb-5">
                      {photos[activeLightboxIndex]?.subtitle}
                    </p>
                    <p className="text-xs text-slate-300 font-light mb-6">
                      {photos[activeLightboxIndex]?.caption}
                    </p>
                    <button
                      type="button"
                      onClick={(e) => handleOpenUpload(photos[activeLightboxIndex].id, e)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#1E2E44] text-xs font-semibold hover:bg-blue-50 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Carregar fotografia</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Lightbox Footer */}
              <div className="p-4 sm:p-5 bg-white border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div>
                  <h4 className="font-serif text-lg text-[#1E2E44] font-medium">
                    {photos[activeLightboxIndex]?.title}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {photos[activeLightboxIndex]?.caption || photos[activeLightboxIndex]?.subtitle}
                  </p>
                </div>
                <span className="text-xs font-semibold text-slate-400">
                  {activeLightboxIndex + 1} / {photos.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
