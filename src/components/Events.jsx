import React from 'react';
import { motion } from 'framer-motion';
import { BAR_DATA } from '../theme/themeConfig';
import { Calendar, Music, Ticket, ArrowUpRight } from 'lucide-react';

export default function Events({ activeTheme, onSelectEvent }) {
  const theme = activeTheme;
  const eventsList = BAR_DATA?.events || [];

  return (
    <section 
      id="events" 
      className="py-20 px-6 w-full max-w-5xl mx-auto relative text-left min-h-screen flex flex-col justify-center items-center"
    >
      <div className="w-full my-auto space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className={`text-xs uppercase font-bold tracking-[0.3em] block ${theme?.accentText}`}>
            CANLI PERFORMANSLAR & GÖSTERİLER
          </span>
          <h2 className={`text-3xl sm:text-5xl font-extrabold text-white tracking-tight ${theme?.fontStyle}`}>
            Gelecek Etkinlikler
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {eventsList.map((ev, index) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative p-6 rounded-3xl border transition-all duration-500 flex flex-col justify-between ${theme?.cardBg}`}
            >
              <div>
                <div className="w-full h-36 sm:h-40 overflow-hidden mb-5 relative rounded-2xl border border-white/10">
                  <img 
                    src={ev.image} 
                    alt={ev.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full backdrop-blur-md text-[10px] font-bold flex items-center gap-1.5 ${theme?.badgeBg}`}>
                    <Calendar size={12} /> {ev.date}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className={`text-[10px] uppercase font-bold tracking-widest flex items-center gap-1.5 ${theme?.accentText}`}>
                    <Music size={12} /> {ev.performer}
                  </span>

                  <h3 className={`text-xl font-bold text-white group-hover:opacity-80 transition-opacity ${theme?.fontStyle}`}>
                    {ev.title}
                  </h3>

                  <p className="text-xs text-stone-300 font-light leading-relaxed line-clamp-2">
                    {ev.desc}
                  </p>
                </div>
              </div>

              {/* YUVARLATILMIŞ & BELİRGİN NEOMORFİK / GLASSMORPHİC REZERVE ET BUTONU */}
              <div className="pt-5 mt-5 border-t border-white/5 flex justify-end">
                <button
                  onClick={() => onSelectEvent && onSelectEvent(ev.title, ev.date)}
                  className={`px-6 py-3 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md border border-white/10 shadow-[6px_6px_16px_#070608,-6px_-6px_16px_rgba(255,255,255,0.08)] hover:shadow-[2px_2px_8px_#070608,-2px_-2px_8px_rgba(255,255,255,0.12)] active:shadow-[inset_3px_3px_6px_#000] ${theme?.buttonPrimary}`}
                >
                  <Ticket size={14} /> Rezerve Et <ArrowUpRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}