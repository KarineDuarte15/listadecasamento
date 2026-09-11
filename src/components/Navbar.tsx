import React, { useState, useEffect } from 'react';
import { Gift, Menu, X, Lock } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, onScrollToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', id: 'inicio' },
    { label: 'Nossa História', id: 'nossa-historia' },
    { label: 'Fotos', id: 'fotos-do-casal' },
    { label: 'Presentes', id: 'lista-de-presentes' },
    { label: 'Como Funciona', id: 'como-funciona' },
    { label: 'Entrega', id: 'entrega' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onScrollToSection(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-[0_2px_15px_rgba(30,58,95,0.06)] border-b border-[#D5E3F0]/80 py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Couple Monogram */}
        <button
          type="button"
          onClick={() => handleNavClick('inicio')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="flex items-center gap-1.5 font-serif text-lg sm:text-xl font-normal text-[#3A5D85] tracking-wide">
            <span className="font-medium">B</span>
            <span className="w-px h-4 bg-[#7A9BBF]/40" />
            <span className="font-medium">R</span>
          </div>
          <span className="hidden sm:inline font-serif text-sm text-[#1E2E44] font-medium tracking-wide">
            Bruna & Riclaube
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs sm:text-sm text-[#4E6780] font-medium">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="hover:text-[#2A486A] transition-colors focus:outline-none py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#3A5D85] hover:after:w-full after:transition-all"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA & Admin */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleNavClick('lista-de-presentes')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3A5D85] hover:bg-[#2C4869] text-white text-xs font-medium tracking-wide transition-all shadow-sm active:scale-95"
          >
            <Gift className="w-3.5 h-3.5 text-blue-100" />
            <span>Escolher Presente</span>
          </button>

          <button
            type="button"
            onClick={onOpenAdmin}
            className="p-2 rounded-full text-slate-400 hover:text-[#3A5D85] hover:bg-slate-100 transition-colors"
            title="Área restrita dos noivos"
            aria-label="Acessar painel de administração"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={onOpenAdmin}
            className="p-2 text-slate-400 hover:text-[#3A5D85]"
            title="Admin"
          >
            <Lock className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#3A5D85] hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#D5E3F0] px-5 py-6 shadow-xl space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-left text-sm font-medium text-[#2E455D] hover:text-[#3A5D85] py-2 border-b border-slate-100"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => handleNavClick('lista-de-presentes')}
              className="w-full py-3 rounded-full bg-[#3A5D85] text-white text-sm font-medium flex items-center justify-center gap-2"
            >
              <Gift className="w-4 h-4" />
              <span>Escolher Presente</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
