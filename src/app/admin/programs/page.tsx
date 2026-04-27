import { getTours } from '../../actions/tour';
import Image from 'next/image';
import Link from 'next/link';
import { Edit, Eye, Plus } from 'lucide-react';

export default async function AdminProgramsPage() {
  const tours = await getTours();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Programlar</h1>
          <p className="text-slate-500 mt-1">Sistemdeki tüm Hac ve Umre programlarını yönetin.</p>
        </div>
        <button className="bg-brand-700 hover:bg-brand-800 text-white font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="w-5 h-5" />
          Yeni Program Ekle
        </button>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Görsel</th>
                <th className="px-6 py-4 font-semibold">Program Adı</th>
                <th className="px-6 py-4 font-semibold">Kategori</th>
                <th className="px-6 py-4 font-semibold">Fiyat</th>
                <th className="px-6 py-4 font-semibold">Kontenjan</th>
                <th className="px-6 py-4 font-semibold text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tours.map((tour) => (
                <tr key={tour.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-slate-100">
                      <Image 
                        src={tour.image} 
                        alt={tour.title} 
                        fill 
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{tour.title}</div>
                    <div className="text-sm text-slate-500">{tour.duration}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      tour.category === 'hac' 
                        ? 'bg-amber-100 text-amber-800' 
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {tour.categoryLabel}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {tour.currency}{tour.price}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {tour.seats} Kişi
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <Link 
                        href={`/program/${tour.slug}`}
                        target="_blank"
                        className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                        title="Görüntüle"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <Link 
                        href={`/admin/programs/${tour.id}`}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Düzenle"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
