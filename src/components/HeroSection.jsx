import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection({ activeTheme }) {
  const theme = activeTheme;

  return (
    <section id="hero" className="min-h-[calc(100vh-80px)] w-full flex flex-col justify-center items-center px-6 text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-8 relative z-10 my-auto flex flex-col items-center justify-center">
        
        {/* TAGLINE BADGE */}
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`inline-block text-xs uppercase tracking-[0.3em] font-bold px-6 py-2 rounded-full bg-[#0d0c0e] border border-white/5 shadow-[inset_3px_3px_6px_#020203,inset_-3px_-3px_6px_#181619] ${theme?.accentText}`}
        >
          {theme?.tagline}
        </motion.span>

        {/* ANA BAŞLIK */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className={`text-4xl sm:text-7xl font-extrabold text-white tracking-tight leading-tight ${theme?.fontStyle}`}
        >
          {theme?.heroTitle}
        </motion.h1>

        {/* AÇIKLAMA METNİ */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Özenle seçilmiş miksoloji kokteylleri, zengin mahzen seçkisi ve unutulmaz canlı performanslarla gecenize yön verin.
        </motion.p>

      </div>
    </section>
  );
}