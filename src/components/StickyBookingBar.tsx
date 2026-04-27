'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface StickyBookingBarProps {
  price: string;
  currency: string;
  title: string;
  targetId?: string;
}

export default function StickyBookingBar({ price, currency, title, targetId = 'iletisim' }: StickyBookingBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
        >
          <div className="bg-white border-t border-slate-200 shadow-2xl px-4 py-3 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-500 truncate">{title}</p>
              <p className="font-display text-xl font-bold text-brand-700">
                {currency}{price}
                <span className="text-xs font-sans font-normal text-slate-500 ml-1">/ kişi</span>
              </p>
            </div>
            <button
              onClick={scrollToForm}
              className="shrink-0 flex items-center gap-2 bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm px-5 py-3 rounded-full transition-colors shadow-lg shadow-brand-700/30"
            >
              Hemen Bilgi Al
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
