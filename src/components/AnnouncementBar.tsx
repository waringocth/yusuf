'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface AnnouncementBarProps {
  text: string;
  bgColor: string;
  textColor: string;
}

export default function AnnouncementBar({ text, bgColor, textColor }: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      id="announcement-bar"
      className="relative w-full z-[70] flex items-center justify-center px-10 py-2 text-center"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <p className="text-xs sm:text-sm font-medium font-sans">
        <span className="inline-block w-2 h-2 rounded-full bg-white/60 animate-pulse mr-2 align-middle" />
        {text}
      </p>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Kapat"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/20 transition-colors"
        style={{ color: textColor }}
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
