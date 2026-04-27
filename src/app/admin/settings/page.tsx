import { Settings2, Save } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Ayarlar</h1>
        <p className="text-slate-500 mt-1">Sistem ve platform ayarlarını yönetin.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600">
              <Settings2 className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Genel Ayarlar</h2>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Firma Adı</label>
                <input 
                  type="text" 
                  defaultValue="Kılınç Turizm"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">İletişim E-posta</label>
                <input 
                  type="email" 
                  defaultValue="info@kilincturizm.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Telefon Numarası</label>
                <input 
                  type="tel" 
                  defaultValue="+90 555 123 4567"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Varsayılan Para Birimi</label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                  defaultValue="USD"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="TRY">TRY (₺)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 bg-slate-50 flex items-center justify-end">
          <button className="flex items-center gap-2 bg-brand-700 hover:bg-brand-800 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-brand-700/20 transition-all">
            <Save className="w-5 h-5" />
            Ayarları Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}
