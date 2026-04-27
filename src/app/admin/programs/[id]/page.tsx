import { getTourById } from '../../../../actions/tour';
import { notFound } from 'next/navigation';
import EditProgramForm from '../../../../components/admin/EditProgramForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProgramPage({ params }: PageProps) {
  const { id } = await params;
  const tourResponse = await getTourById(parseInt(id, 10));

  if (!tourResponse) {
    notFound();
  }

  // Cast JSON arrays to known types for the Edit Form
  const tour = {
    ...tourResponse,
    highlights: tourResponse.highlights as string[] || [],
    itinerary: tourResponse.itinerary as any[] || [],
    hotels: tourResponse.hotels as any[] || [],
    included: tourResponse.included as string[] || [],
    excluded: tourResponse.excluded as string[] || [],
    importantNotes: tourResponse.importantNotes as string[] || [],
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <Link 
          href="/admin/programs" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Programlara Dön
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Program Düzenle</h1>
        <p className="text-slate-500 mt-1">Sistemdeki veriler tamamen korunacak, bu form sadece bir arayüz simülasyonudur.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <EditProgramForm initialData={tour} />
      </div>
    </div>
  );
}
