import { getAnnouncement, updateAnnouncement } from '@/app/actions/announcement';
import { revalidatePath } from 'next/cache';
import { Megaphone, Eye, EyeOff } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DuyuruPage() {
  const announcement = await getAnnouncement();

  if (!announcement) {
    return (
      <div className="text-slate-500 text-sm">
        Duyuru sistemi başlatılamadı. Veritabanı bağlantısını kontrol edin.
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Duyuru Bandı</h1>
        <p className="text-sm text-slate-500 mt-1">
          Sitenin en üstünde görünen duyuru metnini ve görünürlüğünü yönetin.
        </p>
      </div>

      {/* Preview */}
      <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
        <div
          className="flex items-center justify-center gap-2 px-8 py-2.5 text-center"
          style={{ backgroundColor: announcement.bgColor, color: announcement.textColor }}
        >
          <span className="w-2 h-2 rounded-full bg-white/60 animate-pulse shrink-0" />
          <span className="text-sm font-medium">{announcement.text}</span>
        </div>
        <div className="bg-slate-50 px-4 py-2 text-xs text-slate-400 text-center">
          Önizleme
        </div>
      </div>

      <form
        action={async (formData: FormData) => {
          'use server';
          const text = formData.get('text') as string;
          const isActive = formData.get('isActive') === 'true';
          const bgColor = formData.get('bgColor') as string;
          const textColor = formData.get('textColor') as string;

          await updateAnnouncement({
            id: announcement.id,
            text,
            isActive,
            bgColor,
            textColor,
          });
          revalidatePath('/admin/duyuru');
        }}
        className="bg-white rounded-2xl shadow-sm border border-slate-200 p-7 space-y-5"
      >
        {/* Text */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1.5">
            Duyuru Metni
          </label>
          <input
            name="text"
            type="text"
            defaultValue={announcement.text}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-sm"
            placeholder="Temmuz 2026 Kayıtları Başladı!"
          />
        </div>

        {/* Colors */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Arka Plan Rengi
            </label>
            <div className="flex items-center gap-3">
              <input
                name="bgColor"
                type="color"
                defaultValue={announcement.bgColor}
                className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer"
              />
              <input
                type="text"
                defaultValue={announcement.bgColor}
                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono outline-none"
                readOnly
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Yazı Rengi
            </label>
            <div className="flex items-center gap-3">
              <input
                name="textColor"
                type="color"
                defaultValue={announcement.textColor}
                className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer"
              />
              <input
                type="text"
                defaultValue={announcement.textColor}
                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono outline-none"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Active toggle */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
          <div>
            <p className="font-semibold text-slate-800 text-sm">Duyuruyu Göster</p>
            <p className="text-xs text-slate-500 mt-0.5">Sitenin üst kısmında görünür</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="isActiveCheckbox"
              defaultChecked={announcement.isActive}
              className="sr-only peer"
              id="isActiveToggle"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-brand-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600" />
          </label>
        </div>

        {/* Hidden isActive from checkbox */}
        <input type="hidden" name="isActive" id="isActiveHidden" value={announcement.isActive ? 'true' : 'false'} />

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-brand-700 hover:bg-brand-800 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          <Megaphone className="w-4 h-4" />
          Değişiklikleri Kaydet
        </button>
      </form>

      <script dangerouslySetInnerHTML={{ __html: `
        const cb = document.getElementById('isActiveToggle');
        const hidden = document.getElementById('isActiveHidden');
        if (cb && hidden) {
          cb.addEventListener('change', () => { hidden.value = cb.checked ? 'true' : 'false'; });
        }
      `}} />
    </div>
  );
}
