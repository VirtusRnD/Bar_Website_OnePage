import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { THEMES } from './theme/themeConfig.js';

import HeroSection from './components/HeroSection.jsx';
import Concept from './components/Concept.jsx';
import Menu from './components/Menu.jsx';
import Events from './components/Events.jsx';
import Reservation from './components/Reservation.jsx';
import InfoAndMap from './components/InfoAndMap.jsx';
import Navbar from './components/Navbar.jsx';

const BACKEND_URL = 'https://theme-backend-vh34.onrender.com';
const socket = io(BACKEND_URL);
const CURRENT_SITE_ID = 'bar-onepage';

export default function App() {
  const [selectedEventForReserve, setSelectedEventForReserve] = useState(null);
  
  const [currentThemeKey, setCurrentThemeKey] = useState(() => {
    const savedTheme = localStorage.getItem(`${CURRENT_SITE_ID}-theme`);
    return savedTheme || 'dillerRoom';
  });

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/themes/${CURRENT_SITE_ID}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.activeTheme && THEMES[data.activeTheme]) {
          setCurrentThemeKey(data.activeTheme);
        }
      })
      .catch((err) => console.error(err));

    const handleThemeChange = (data) => {
      if (data.siteId === CURRENT_SITE_ID && THEMES[data.activeTheme]) {
        setCurrentThemeKey(data.activeTheme);
      }
    };

    socket.on('theme_changed', handleThemeChange);

    return () => {
      socket.off('theme_changed', handleThemeChange);
    };
  }, []);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === "THEME_CHANGE" && event.data.themeKey && event.data.siteId === CURRENT_SITE_ID) {
        setCurrentThemeKey(event.data.themeKey);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    localStorage.setItem(`${CURRENT_SITE_ID}-theme`, currentThemeKey);
  }, [currentThemeKey]);

  const activeTheme = THEMES[currentThemeKey] || THEMES.dillerRoom;

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleGeneralReservation = () => {
    setSelectedEventForReserve(null);
    scrollToSection('reservation');
  };

  const handleSelectEvent = (eventTitle, eventDate) => {
    setSelectedEventForReserve({ title: eventTitle, date: eventDate });
    scrollToSection('reservation');
  };

  const handleClearEvent = () => {
    setSelectedEventForReserve(null);
  };

  return (
    <div className={`min-h-screen ${activeTheme.bgClass} relative selection:bg-white selection:text-black overflow-x-hidden ${activeTheme.fontStyle} transition-colors duration-700`}>
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <div 
          className="w-full h-full bg-cover bg-center filter brightness-[0.45] saturate-85 transition-all duration-1000 ease-in-out"
          style={{ 
            backgroundImage: `url('${activeTheme.heroBgImage}')`,
            backgroundAttachment: 'fixed'
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70" />
      </div>

      <Navbar activeTheme={activeTheme} onGeneralReserve={handleGeneralReservation} />

      <main className="relative z-10 flex flex-col pt-20">
        <div id="hero" className="w-full">
          <HeroSection activeTheme={activeTheme} />
        </div>
        
        <div id="concept" className="w-full">
          <Concept activeTheme={activeTheme} />
        </div>
        
        <div id="menu" className="w-full">
          <Menu activeTheme={activeTheme} />
        </div>
        
        <div id="events" className="w-full">
          <Events activeTheme={activeTheme} onSelectEvent={handleSelectEvent} />
        </div>
        
        <div id="reservation" className="w-full">
          <Reservation 
            activeTheme={activeTheme}
            selectedEvent={selectedEventForReserve} 
            onClearEvent={handleClearEvent} 
          />
        </div>
        
        <div id="info" className="w-full">
          <InfoAndMap activeTheme={activeTheme} />
        </div>
      </main>

      <footer className="relative z-10 py-10 text-center text-xs opacity-60 border-t border-white/10 tracking-wider bg-black/80 backdrop-blur-md">
        © 2026 {activeTheme.name}. Gece hayatı tutkunları için özenle tasarlandı.
      </footer>
    </div>
  );
}