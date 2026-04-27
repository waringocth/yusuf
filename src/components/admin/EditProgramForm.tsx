'use client';

import { useState } from 'react';
import { Tour } from '../../data/tours';
import { Save, AlertCircle, Plus, Trash2 } from 'lucide-react';

interface EditProgramFormProps {
  initialData: Tour;
}

import { updateTour } from '../../../app/actions/tour';

export default function EditProgramForm({ initialData }: EditProgramFormProps) {
  const [formData, setFormData] = useState<Tour>({
    ...initialData,
    itinerary: initialData.itinerary || [],
    included: initialData.included || [],
    excluded: initialData.excluded || [],
    hotels: initialData.hotels || [],
    highlights: initialData.highlights || [],
    importantNotes: initialData.importantNotes || [],
  });
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Call server action
    const result = await updateTour(formData.id, formData);
    
    setIsSaving(false);
    if (result.success) {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } else {
      alert(result.error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- Dynamic Array Handlers ---

  const handleStringArrayChange = (field: 'highlights' | 'included' | 'excluded' | 'importantNotes', index: number, value: string) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const addStringItem = (field: 'highlights' | 'included' | 'excluded' | 'importantNotes') => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeStringItem = (field: 'highlights' | 'included' | 'excluded' | 'importantNotes', index: number) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray.splice(index, 1);
      return { ...prev, [field]: newArray };
    });
  };

  const handleItineraryChange = (index: number, key: keyof Tour['itinerary'][0], value: string | number) => {
    setFormData(prev => {
      const newArray = [...prev.itinerary];
      newArray[index] = { ...newArray[index], [key]: value };
      return { ...prev, itinerary: newArray };
    });
  };

  const addItineraryItem = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, { day: prev.itinerary.length + 1, title: '', description: '' }]
    }));
  };

  const removeItineraryItem = (index: number) => {
    setFormData(prev => {
      const newArray = [...prev.itinerary];
      newArray.splice(index, 1);
      const reindexed = newArray.map((item, i) => ({ ...item, day: i + 1 }));
      return { ...prev, itinerary: reindexed };
    });
  };

  const handleHotelChange = (index: number, key: keyof Tour['hotels'][0], value: string | number) => {
    setFormData(prev => {
      const newArray = [...prev.hotels];
      newArray[index] = { ...newArray[index], [key]: value };
      return { ...prev, hotels: newArray };
    });
  };

  const addHotelItem = () => {
    setFormData(prev => ({
      ...prev,
      hotels: [...prev.hotels, { name: '', location: 'Mekke', distance: '', rating: 4 }]
    }));
  };

  const removeHotelItem = (index: number) => {
    setFormData(prev => {
      const newArray = [...prev.hotels];
      newArray.splice(index, 1);
      return { ...prev, hotels: newArray };
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-12 bg-slate-50">
      
      {isSaved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3 sticky top-4 z-50 shadow-md">
          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
            <Save className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="font-medium">Program başarıyla güncellendi (Simülasyon). Konsolu kontrol edebilirsiniz.</p>
        </div>
      )}

      <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-sm">
          <strong>Simülasyon Modu:</strong> Bu form mevcut verilerinizi değiştirmez. Tüm değişiklikler React State üzerinde tutulur ve Kaydet dendiğinde konsola yazdırılır.
        </p>
      </div>

      {/* 1. TEMEL BİLGİLER */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6">1. Temel Bilgiler</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Program Adı</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Kategori</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 bg-white outline-none">
              <option value="umre">Umre</option>
              <option value="hac">Hac</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Rozet (Badge)</label>
            <input type="text" name="badge" value={formData.badge || ''} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="Örn: Çok Satan, VIP" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Görsel URL</label>
            <input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Tarih</label>
            <input type="text" name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="Örn: 5 Temmuz 2026" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Süre</label>
            <input type="text" name="duration" value={formData.duration} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="Örn: 14 Gece / 15 Gün" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Fiyat</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">{formData.currency}</span>
                <input type="text" name="price" value={formData.price} onChange={handleChange} className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Puan</label>
              <input type="number" step="0.1" name="rating" value={formData.rating} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Kontenjan (Kişi)</label>
            <input type="number" name="seats" value={formData.seats} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" />
          </div>
        </div>
      </section>

      {/* 2. PROGRAM ÖZETİ */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6">2. Program Özeti</h3>
        
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Kısa Açıklama</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none resize-none" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">Öne Çıkan Özellikler (Highlights)</label>
          <div className="space-y-3 mb-4">
            {formData.highlights.map((item, idx) => (
              <div key={idx} className="flex gap-3">
                <input type="text" value={item} onChange={(e) => handleStringArrayChange('highlights', idx, e.target.value)} className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="Örn: 4★ Otel Konaklaması" />
                <button type="button" onClick={() => removeStringItem('highlights', idx)} className="w-12 shrink-0 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl flex items-center justify-center transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => addStringItem('highlights')} className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-800 transition-colors">
            <Plus className="w-5 h-5" /> Özellik Ekle
          </button>
        </div>
      </section>

      {/* 3. GÜN GÜN PROGRAM */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6">3. Gün Gün Program</h3>
        
        <div className="space-y-4 mb-6">
          {formData.itinerary.map((item, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 p-5 rounded-2xl relative group">
              <button type="button" onClick={() => removeItineraryItem(idx)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pr-8">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Gün No</label>
                  <input type="number" value={item.day} onChange={(e) => handleItineraryChange(idx, 'day', parseInt(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" />
                </div>
                <div className="md:col-span-10">
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Başlık</label>
                  <input type="text" value={item.title} onChange={(e) => handleItineraryChange(idx, 'title', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="Mekke'ye Geçiş" />
                </div>
                <div className="md:col-span-12">
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Açıklama</label>
                  <textarea value={item.description} onChange={(e) => handleItineraryChange(idx, 'description', e.target.value)} rows={2} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none resize-none" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={addItineraryItem} className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-800 transition-colors">
          <Plus className="w-5 h-5" /> Yeni Gün Ekle
        </button>
      </section>

      {/* 4. KONAKLAMA BİLGİLERİ */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6">4. Konaklama Bilgileri</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {formData.hotels.map((hotel, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 p-5 rounded-2xl relative">
              <button type="button" onClick={() => removeHotelItem(idx)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
              
              <div className="space-y-4 pr-8">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Otel Adı</label>
                  <input type="text" value={hotel.name} onChange={(e) => handleHotelChange(idx, 'name', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Konum</label>
                    <select value={hotel.location} onChange={(e) => handleHotelChange(idx, 'location', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none bg-white">
                      <option value="Mekke">Mekke</option>
                      <option value="Medine">Medine</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Yıldız</label>
                    <input type="number" min="1" max="5" value={hotel.rating} onChange={(e) => handleHotelChange(idx, 'rating', parseInt(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Hareme Uzaklık</label>
                  <input type="text" value={hotel.distance} onChange={(e) => handleHotelChange(idx, 'distance', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="Örn: 200m" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={addHotelItem} className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-800 transition-colors">
          <Plus className="w-5 h-5" /> Otel Ekle
        </button>
      </section>

      {/* 5. DAHİL OLANLAR & OLMAYANLAR */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6">5. Fiyata Dahil Olanlar & Olmayanlar</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Dahil Olanlar */}
          <div>
            <h4 className="font-bold text-emerald-600 mb-4 flex items-center gap-2">Dahil Olanlar</h4>
            <div className="space-y-3 mb-4">
              {formData.included.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <input type="text" value={item} onChange={(e) => handleStringArrayChange('included', idx, e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none text-sm" />
                  <button type="button" onClick={() => removeStringItem('included', idx)} className="w-10 shrink-0 text-slate-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4 mx-auto" />
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => addStringItem('included')} className="text-sm inline-flex items-center gap-1.5 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
              <Plus className="w-4 h-4" /> Ekle
            </button>
          </div>

          {/* Dahil Olmayanlar */}
          <div>
            <h4 className="font-bold text-rose-600 mb-4 flex items-center gap-2">Dahil Olmayanlar</h4>
            <div className="space-y-3 mb-4">
              {formData.excluded.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <input type="text" value={item} onChange={(e) => handleStringArrayChange('excluded', idx, e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none text-sm" />
                  <button type="button" onClick={() => removeStringItem('excluded', idx)} className="w-10 shrink-0 text-slate-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4 mx-auto" />
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => addStringItem('excluded')} className="text-sm inline-flex items-center gap-1.5 text-rose-600 font-semibold hover:text-rose-700 transition-colors">
              <Plus className="w-4 h-4" /> Ekle
            </button>
          </div>
        </div>
      </section>

      {/* 6. ÖNEMLİ NOTLAR */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6">6. Önemli Notlar</h3>
        <div className="space-y-3 mb-4">
          {formData.importantNotes.map((item, idx) => (
            <div key={idx} className="flex gap-3">
              <input type="text" value={item} onChange={(e) => handleStringArrayChange('importantNotes', idx, e.target.value)} className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none" />
              <button type="button" onClick={() => removeStringItem('importantNotes', idx)} className="w-12 shrink-0 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl flex items-center justify-center transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => addStringItem('importantNotes')} className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-800 transition-colors">
          <Plus className="w-5 h-5" /> Not Ekle
        </button>
      </section>

      {/* SUBMIT BUTTON */}
      <div className="sticky bottom-0 p-6 bg-white border-t border-slate-200 flex items-center justify-end gap-4 rounded-3xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
        <button 
          type="submit" 
          disabled={isSaving}
          className="flex items-center gap-2 bg-brand-700 hover:bg-brand-800 text-white font-semibold px-10 py-4 rounded-xl shadow-lg shadow-brand-700/20 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:-translate-y-0"
        >
          <Save className="w-5 h-5" />
          {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </button>
      </div>

    </form>
  );
}
