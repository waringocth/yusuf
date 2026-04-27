import { getTours } from '@/app/actions/tour';
import { Map, Users, Star, TrendingUp } from 'lucide-react';

export default async function AdminDashboard() {
  const tours = await getTours();
  
  const totalTours = tours.length;
  const umreTours = tours.filter(t => t.category === 'umre').length;
  const hacTours = tours.filter(t => t.category === 'hac').length;
  const totalSeats = tours.reduce((acc, tour) => acc + tour.seats, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Dashboard Özeti</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
              <Map className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Toplam Program</p>
              <p className="text-2xl font-bold text-slate-900">{totalTours}</p>
            </div>
          </div>
          <div className="text-sm text-slate-500">
            <span className="text-emerald-500 font-medium">Aktif</span> yayında
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Kategori Dağılımı</p>
              <p className="text-2xl font-bold text-slate-900">{umreTours} Umre, {hacTours} Hac</p>
            </div>
          </div>
          <div className="text-sm text-slate-500">
            Sistemde kayıtlı programlar
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Toplam Kontenjan</p>
              <p className="text-2xl font-bold text-slate-900">{totalSeats}</p>
            </div>
          </div>
          <div className="text-sm text-slate-500">
            Açık kontenjan sayısı
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Ort. Değerlendirme</p>
              <p className="text-2xl font-bold text-slate-900">4.9 / 5.0</p>
            </div>
          </div>
          <div className="text-sm text-slate-500">
            Genel müşteri memnuniyeti
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Hoş Geldiniz</h2>
        <p className="text-slate-600">
          Sol taraftaki menüden "Programlar" sekmesine tıklayarak mevcut turlarınızı görüntüleyebilir ve düzenleme işlemlerini gerçekleştirebilirsiniz.
        </p>
      </div>
    </div>
  );
}
