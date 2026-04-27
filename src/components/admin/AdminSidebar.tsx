'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Map, Settings, LogOut, MessageSquare } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/programs', label: 'Programlar', icon: Map },
    { href: '/admin/talepler', label: 'Talepler', icon: MessageSquare },
    { href: '/admin/ayarlar', label: 'Pazarlama Ayarları', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 min-h-screen">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <Link href="/admin" className="text-xl font-bold text-white tracking-tight">
          Kılınç Admin
        </Link>
      </div>
      
      <nav className="flex-1 py-6 px-4 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href || (link.href !== '/admin' && pathname?.startsWith(link.href));
          const Icon = link.icon;
          
          return (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-900/20' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-slate-800">
        <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white text-slate-400 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Siteye Dön</span>
        </Link>
      </div>
    </aside>
  );
}
