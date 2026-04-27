'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function StickyContact() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="bg-slate-900 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg whitespace-nowrap"
          >
            Bize Ulaşın
          </motion.span>
        )}
      </AnimatePresence>

      <div className="relative">
        {/* Ping ring */}
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-40" />
        <motion.a
          href="https://wa.me/905001234567"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-xl shadow-green-500/30 transition-colors"
          aria-label="WhatsApp ile iletişim"
        >
          <MessageCircle className="w-7 h-7 text-white fill-white" />
        </motion.a>
      </div>
    </div>
  );
}
