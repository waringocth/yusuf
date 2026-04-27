'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin } from 'lucide-react';

interface ItineraryItem {
  day: number;
  title: string;
  description: string;
}

interface TourItineraryProps {
  itinerary: ItineraryItem[];
}

export default function TourItinerary({ itinerary }: TourItineraryProps) {
  const [openDay, setOpenDay] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {itinerary.map((item, idx) => {
        const isOpen = openDay === idx;
        return (
          <div
            key={idx}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen ? 'border-brand-200 shadow-md shadow-brand-50' : 'border-slate-100'
            }`}
          >
            <button
              onClick={() => setOpenDay(isOpen ? null : idx)}
              className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-colors ${
                isOpen ? 'bg-brand-50' : 'bg-white hover:bg-slate-50'
              }`}
            >
              {/* Day Badge */}
              <div className={`shrink-0 w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                isOpen ? 'bg-brand-700 text-white' : 'bg-slate-100 text-slate-700'
              }`}>
                {item.day}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold uppercase tracking-wider mb-0.5 ${isOpen ? 'text-brand-600' : 'text-slate-400'}`}>
                  Gün {item.day}
                </p>
                <h3 className="font-bold text-slate-900 leading-tight">{item.title}</h3>
              </div>

              <ChevronDown
                className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-500' : ''}`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <div className="px-6 pb-5 pt-1 bg-white border-t border-brand-50">
                    <p className="text-slate-600 leading-relaxed text-sm">{item.description}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
