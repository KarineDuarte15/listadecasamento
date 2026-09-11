import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const AmbientAudio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Soft ambient chord notes for gentle romantic wedding melody
  const melodyNotes = [
    261.63, // C4
    329.63, // E4
    392.00, // G4
    523.25, // C5
    392.00, // G4
    329.63, // E4
    293.66, // D4
    349.23, // F4
    440.00, // A4
    523.25, // C5
    440.00, // A4
    349.23, // F4
  ];

  const playTone = (freq: number) => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1.9);
  };

  const toggleMusic = () => {
    if (!isPlaying) {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }

      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      let noteIndex = 0;
      playTone(melodyNotes[0]);

      intervalRef.current = window.setInterval(() => {
        noteIndex = (noteIndex + 1) % melodyNotes.length;
        playTone(melodyNotes[noteIndex]);
      }, 1400);

      setIsPlaying(true);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        type="button"
        onClick={toggleMusic}
        className={`group flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-md transition-all duration-300 shadow-md text-xs font-medium ${
          isPlaying
            ? 'bg-[#2E4F75] text-white ring-2 ring-[#7095BF]/40'
            : 'bg-white/90 text-[#3A5D85] border border-[#CBDDEC] hover:bg-white'
        }`}
        aria-label={isPlaying ? 'Pausar música ambiente' : 'Tocar música ambiente'}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-3.5 h-3.5 animate-pulse text-blue-200" />
            <span>♫ Música: Ligada</span>
          </>
        ) : (
          <>
            <Music className="w-3.5 h-3.5 text-[#5A80A8]" />
            <span>♫ Música</span>
          </>
        )}
      </button>
    </div>
  );
};
