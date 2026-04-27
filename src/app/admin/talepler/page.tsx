import { getInquiries, updateInquiryStatus } from '@/app/actions/inquiry';
import { Mail, Phone, Calendar, Search } from 'lucide-react';
import { revalidatePath } from 'next/cache';

export default async function TaleplerPage() {
  const inquiries = await getInquiries();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'NEW':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">Yeni</span>;
      case 'CONTACTED':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-700 border border-amber-200">Arandı</span>;
      case 'CLOSED':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-700 border border-slate-200">Kapandı</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Müşteri Talepleri</h1>
          <p className="text-sm text-slate-500 mt-1">Siteniz üzerinden gelen tüm ön kayıt ve bilgi talepleri.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {inquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Müşteri</th>
                  <th className="px-6 py-4">İletişim</th>
                  <th className="px-6 py-4">Tur Programı</th>
                  <th className="px-6 py-4">Tarih</th>
                  <th className="px-6 py-4">Durum</th>
                  <th className="px-6 py-4 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{inquiry.name}</div>
                      {inquiry.message && (
                        <div className="text-xs text-slate-500 mt-1 max-w-[200px] truncate" title={inquiry.message}>
                          "{inquiry.message}"
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-medium text-slate-700">{inquiry.phone}</span>
                      </div>
                      {inquiry.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-xs">{inquiry.email}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex font-medium text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md">
                        {inquiry.tour.title}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(inquiry.createdAt).toLocaleDateString('tr-TR', {
                          day: 'numeric',
                          month: 'long',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(inquiry.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <form action={async (formData) => {
                        'use server';
                        const id = Number(formData.get('id'));
                        const currentStatus = formData.get('status') as string;
                        const nextStatus = currentStatus === 'NEW' ? 'CONTACTED' : currentStatus === 'CONTACTED' ? 'CLOSED' : 'NEW';
                        await updateInquiryStatus(id, nextStatus as any);
                        revalidatePath('/admin/talepler');
                      }}>
                        <input type="hidden" name="id" value={inquiry.id} />
                        <input type="hidden" name="status" value={inquiry.status} />
                        <button 
                          type="submit"
                          className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Durumu Değiştir
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-1">Henüz Talep Yok</h3>
            <p className="text-slate-500">Müşterilerinizden gelen talepler burada listelenecektir.</p>
          </div>
        )}
      </div>
    </div>
  );
}
