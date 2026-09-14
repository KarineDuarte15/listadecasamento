import React, { useState, useRef } from 'react';
import { Music, VolumeX } from 'lucide-react';

export const AmbientAudio = () => {
  // Estados para controlar se a música está tocando ou pausada
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Tenta iniciar a música e lida com bloqueios do navegador
        audioRef.current.play().catch(error => {
          console.error("O navegador bloqueou a reprodução automática:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* 
        A tag audio busca o arquivo direto da pasta public.
        O atributo loop faz a música reiniciar automaticamente ao terminar.
      */}
      <audio ref={audioRef} src="/musica-noiva.mp3" loop />
      
      <button
        onClick={togglePlay}
        className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2.5 rounded-full shadow-[0_4px_14px_rgba(58,93,133,0.15)] border border-[#D5E3F0] text-[#3A5D85] hover:bg-[#F0F5FA] hover:-translate-y-1 transition-all"
        aria-label="Tocar música ambiente"
      >
        {isPlaying ? (
          <>
            <VolumeX className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#728BA6]">Pausar</span>
          </>
        ) : (
          <>
            <Music className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#3A5D85]">Música</span>
          </>
        )}
      </button>
    </div>
  );
};