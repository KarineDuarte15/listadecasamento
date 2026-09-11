import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { WeddingHero } from './components/WeddingHero';
import { WeddingStory } from './components/WeddingStory';
import { CoupleGallery } from './components/CoupleGallery';
import { Countdown } from './components/Countdown';
import { StoryToRegistryTransition } from './components/StoryToRegistryTransition';
import { GiftRegistry } from './components/GiftRegistry';
import { HowItWorks } from './components/HowItWorks';
import { DeliveryInformation } from './components/DeliveryInformation';
import { FinalThankYou } from './components/FinalThankYou';
import { Footer } from './components/Footer';
import { FloatingPetals } from './components/FloralDecorations';
import { AmbientAudio } from './components/AmbientAudio';
import { GiftReservationModal } from './components/GiftReservationModal';
import { ConfirmationSuccessModal } from './components/ConfirmationSuccessModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Gift, GiftReservation, RegistryStats } from './types';
import { INITIAL_GIFTS } from './data/initialGifts';

export default function App() {
  const [gifts, setGifts] = useState<Gift[]>(() =>
    INITIAL_GIFTS.map((item) => ({
      ...item,
      status: item.quantity_available > 0 ? 'disponivel' : 'esgotado',
    }))
  );
  const [stats, setStats] = useState<RegistryStats>({
    total_gifts: INITIAL_GIFTS.reduce((sum, g) => sum + g.quantity_total, 0),
    available_gifts: INITIAL_GIFTS.reduce((sum, g) => sum + g.quantity_available, 0),
    reserved_gifts: 0,
    total_guests: 0,
  });
  const [loading, setLoading] = useState(true);

  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [confirmedReservation, setConfirmedReservation] = useState<GiftReservation | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);

  // Fetch real-time gifts and stats from backend
  const loadRegistryData = useCallback(async () => {
    try {
      const [giftsRes, statsRes] = await Promise.all([
        fetch('/api/gifts'),
        fetch('/api/stats'),
      ]);

      if (giftsRes.ok) {
        const giftsData = await giftsRes.json();
        setGifts(giftsData);
      }
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
    } catch (err) {
      console.warn('Backend API inicializando ou offline, utilizando dados locais:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRegistryData();
  }, [loadRegistryData]);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReservationSuccess = (data: {
    reservation: GiftReservation;
    updated_gift: Gift;
  }) => {
    setSelectedGift(null);
    setConfirmedReservation(data.reservation);
    // Refresh registry data
    loadRegistryData();
  };

  return (
    <div className="relative min-h-screen bg-[#FAFBFD] text-[#1E293B] font-sans antialiased selection:bg-[#D9E9F7] selection:text-[#1E3A5F]">
      {/* Floating flower petals animation */}
      <FloatingPetals />

      {/* Floating ambient audio button */}
      <AmbientAudio />

      {/* Sticky Navigation */}
      <Navbar
        onOpenAdmin={() => setAdminOpen(true)}
        onScrollToSection={scrollToSection}
      />

      <main id="inicio">
        {/* SECTION 01 — HERO */}
        <WeddingHero
          onScrollToRegistry={() => scrollToSection('lista-de-presentes')}
          onScrollToStory={() => scrollToSection('nossa-historia')}
        />

        {/* SECTION 02 — NOSSA HISTÓRIA */}
        <WeddingStory />

        {/* SECTION 03 — FOTOS DO CASAL */}
        <CoupleGallery />

        {/* SECTION 04 — CONTAGEM REGRESSIVA */}
        <Countdown />

        {/* SECTION 05 — UM PRESENTE PARA NOSSA NOVA HISTÓRIA */}
        <StoryToRegistryTransition
          onScrollToRegistry={() => scrollToSection('lista-de-presentes')}
        />

        {/* SECTION 06 — LISTA DE PRESENTES */}
        <GiftRegistry
          gifts={gifts}
          stats={stats}
          loading={loading}
          onSelectGift={(gift) => setSelectedGift(gift)}
        />

        {/* SECTION 07 — COMO FUNCIONA */}
        <HowItWorks />

        {/* SECTION 08 — ENTREGA DOS PRESENTES */}
        <DeliveryInformation />

        {/* SECTION 09 — AGRADECIMENTO */}
        <FinalThankYou />
      </main>

      {/* SECTION 10 — FOOTER */}
      <Footer onOpenAdmin={() => setAdminOpen(true)} />

      {/* MODALS */}
      {selectedGift && (
        <GiftReservationModal
          gift={selectedGift}
          onClose={() => setSelectedGift(null)}
          onSuccess={handleReservationSuccess}
        />
      )}

      {confirmedReservation && (
        <ConfirmationSuccessModal
          reservation={confirmedReservation}
          onClose={() => setConfirmedReservation(null)}
        />
      )}

      {adminOpen && (
        <AdminDashboard
          isOpen={adminOpen}
          onClose={() => setAdminOpen(false)}
          onDataChanged={loadRegistryData}
        />
      )}
    </div>
  );
}
