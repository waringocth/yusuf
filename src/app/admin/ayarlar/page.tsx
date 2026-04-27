import { getSettingsWithMeta, updateSetting } from '@/app/actions/settings';
import { revalidatePath } from 'next/cache';
import { Settings, Tag, Share2, MessageCircle, ChevronRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

const SETTING_META: Record<string, { label: string; icon: any; group: string; placeholder: string; type?: string }> = {
  gtm_id: {
    label: 'Google Tag Manager ID',
    icon: Tag,
    group: 'Google',
    placeholder: 'GTM-XXXXXXX',
  },
  google_ads_conversion_id: {
    label: 'Google Ads Dönüşüm ID',
    icon: Tag,
    group: 'Google',
    placeholder: 'AW-XXXXXXXXX',
  },
  google_ads_conversion_label: {
    label: 'Google Ads Dönüşüm Etiketi',
    icon: Tag,
    group: 'Google',
    placeholder: 'AbCdEfGhIj',
  },
  meta_pixel_id: {
    label: 'Meta Pixel ID',
    icon: Share2,
    group: 'Meta',
    placeholder: '1234567890123456',
  },
  whatsapp_number: {
    label: 'WhatsApp Numarası',
    icon: MessageCircle,
    group: 'İletişim',
    placeholder: '905001234567',
  },
  whatsapp_message: {
    label: 'WhatsApp Karşılama Mesajı',
    icon: MessageCircle,
    group: 'İletişim',
    placeholder: 'Merhaba, bilgi almak istiyorum.',
  },
};

export default async function AyarlarPage() {
  const settings = await getSettingsWithMeta();

  const groups = ['Google', 'Meta', 'İletişim'];

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Pazarlama Ayarları</h1>
        <p className="text-sm text-slate-500 mt-1">
          Analitik ve pazarlama araçlarınızı buradan yönetin. Boş bırakılan alanlar devre dışı kalır.
        </p>
      </div>

      {groups.map((group) => {
        const groupSettings = settings.filter((s) => SETTING_META[s.key]?.group === group);
        if (groupSettings.length === 0) return null;

        return (
          <div key={group} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h2 className="font-semibold text-slate-700">{group} Entegrasyonu</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {groupSettings.map((setting) => {
                const meta = SETTING_META[setting.key];
                if (!meta) return null;

                return (
                  <form
                    key={setting.key}
                    action={async (formData: FormData) => {
                      'use server';
                      const value = formData.get('value') as string;
                      await updateSetting(setting.key, value);
                      revalidatePath('/admin/ayarlar');
                    }}
                    className="px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4"
                  >
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-slate-800 mb-0.5">
                        {meta.label}
                      </label>
                      <p className="text-xs text-slate-500">{setting.description}</p>
                    </div>
                    <div className="flex items-center gap-3 sm:w-72">
                      <input
                        type="text"
                        name="value"
                        defaultValue={setting.value}
                        placeholder={meta.placeholder}
                        className="flex-1 min-w-0 px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition-all"
                      />
                      <button
                        type="submit"
                        className="shrink-0 px-4 py-2 text-sm font-semibold bg-brand-700 text-white rounded-xl hover:bg-brand-800 transition-colors"
                      >
                        Kaydet
                      </button>
                    </div>
                  </form>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <p className="text-sm text-amber-800 font-medium">
          💡 GTM veya Pixel ID girildiğinde, ilgili script otomatik olarak tüm sayfalara eklenir.
          Boş bırakılan alanlar hiçbir script yüklemez.
        </p>
      </div>
    </div>
  );
}
