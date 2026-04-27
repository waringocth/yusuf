'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const DEFAULT_SETTINGS = [
  { key: 'gtm_id', value: '', description: 'Google Tag Manager ID (GTM-XXXXX formatında)' },
  { key: 'google_ads_conversion_id', value: '', description: 'Google Ads Dönüşüm ID (AW-XXXXXXXXX)' },
  { key: 'google_ads_conversion_label', value: '', description: 'Google Ads Dönüşüm Etiketi' },
  { key: 'meta_pixel_id', value: '', description: 'Meta (Facebook) Pixel ID' },
  { key: 'whatsapp_number', value: '905001234567', description: 'WhatsApp numarası (başında 90 ile, boşluksuz)' },
  { key: 'whatsapp_message', value: 'Merhaba, tur hakkında bilgi almak istiyorum.', description: 'WhatsApp karşılama mesajı' },
];

export async function getSettings(): Promise<Record<string, string>> {
  try {
    // Seed defaults if not present
    for (const s of DEFAULT_SETTINGS) {
      await prisma.settings.upsert({
        where: { key: s.key },
        update: {},
        create: s,
      });
    }

    const settings = await prisma.settings.findMany();
    return Object.fromEntries(settings.map((s) => [s.key, s.value]));
  } catch (error) {
    console.error('Failed to fetch settings:', error);
    return {};
  }
}

export async function getSettingsWithMeta() {
  try {
    // Seed defaults if not present
    for (const s of DEFAULT_SETTINGS) {
      await prisma.settings.upsert({
        where: { key: s.key },
        update: {},
        create: s,
      });
    }
    return await prisma.settings.findMany({ orderBy: { id: 'asc' } });
  } catch (error) {
    console.error('Failed to fetch settings with meta:', error);
    return DEFAULT_SETTINGS.map((s, i) => ({ id: i, ...s }));
  }
}

export async function updateSetting(key: string, value: string) {
  try {
    await prisma.settings.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
    revalidatePath('/admin/ayarlar');
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('Failed to update setting:', error);
    return { success: false, error: error.message };
  }
}
