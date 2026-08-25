import React from 'react';
import { Calendar } from 'lucide-react';

export default function Navbar({ activeTheme, onGeneralReserve }) {
  const theme = activeTheme;

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const navItems = [
    { name: 'Hakkımızda', id: 'concept' },
    { name: 'Menü', id: 'menu' },
    { name: 'Etkinlikler', id: 'events' },
    { name: 'İletişim', id: 'info' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-2xl bg-black/60 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <a 
          href="#hero" 
          onClick={(e) => scrollToSection(e, 'hero')}
          className={`text-2xl font-bold tracking-widest text-white cursor-pointer hover:opacity-80 transition-opacity ${theme?.fontStyle}`}
        >
          {theme?.name}
        </a>

        {/* GEZİNTİ BAĞLANTILARI */}
        <nav className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-widest font-medium">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              className="text-stone-300 hover:text-white transition-all cursor-pointer"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* TEK REZERVASYON AKSİYON BUTONU */}
        <button
          onClick={onGeneralReserve}
          className={`hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest font-bold transition-all cursor-pointer ${theme?.buttonPrimary}`}
        >
          <Calendar size={15} /> Masa Rezerve Et
        </button>

      </div>
    </header>
  );
}