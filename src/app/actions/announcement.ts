'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const DEFAULT_ANNOUNCEMENT = {
  text: 'Temmuz 2026 Umre Kayıtları Başladı — Sınırlı Kontenjan!',
  isActive: true,
  bgColor: '#1d5dd5',
  textColor: '#ffffff',
};

export async function getAnnouncement() {
  try {
    let announcement = await prisma.announcement.findFirst({ orderBy: { id: 'asc' } });
    if (!announcement) {
      announcement = await prisma.announcement.create({ data: DEFAULT_ANNOUNCEMENT });
    }
    return announcement;
  } catch (error) {
    console.error('Failed to fetch announcement:', error);
    return null;
  }
}

export async function updateAnnouncement(data: {
  id: number;
  text: string;
  isActive: boolean;
  bgColor: string;
  textColor: string;
}) {
  try {
    await prisma.announcement.update({
      where: { id: data.id },
      data: {
        text: data.text,
        isActive: data.isActive,
        bgColor: data.bgColor,
        textColor: data.textColor,
      },
    });
    revalidatePath('/');
    revalidatePath('/admin/duyuru');
    return { success: true };
  } catch (error: any) {
    console.error('Failed to update announcement:', error);
    return { success: false, error: error.message };
  }
}
