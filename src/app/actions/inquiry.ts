'use server';

import prisma from '@/lib/prisma';
import { Resend } from 'resend';
import { revalidatePath } from 'next/cache';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function createInquiry(data: {
  tourId: number;
  name: string;
  phone: string;
  email?: string;
  message?: string;
}) {
  try {
    const inquiry = await prisma.inquiry.create({
      data: {
        tourId: data.tourId,
        name: data.name,
        phone: data.phone,
        email: data.email,
        message: data.message,
      },
      include: {
        tour: true,
      },
    });

    // Determine the admin email. Fallback to a hardcoded one if not found in db.
    const adminUser = await prisma.adminUser.findFirst();
    const adminEmail = adminUser?.email || 'yigitcankerimbusiness@gmail.com';

    // Send email notification using Resend
    await resend.emails.send({
      from: 'Kılınç Turizm Bildirim <onboarding@resend.dev>',
      to: adminEmail,
      subject: `Yeni Talep: ${inquiry.tour.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1e3a8a;">Yeni Müşteri Talebi</h2>
          <p><strong>Tur:</strong> ${inquiry.tour.title}</p>
          <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Ad Soyad:</strong> ${inquiry.name}</p>
            <p style="margin: 0 0 10px 0;"><strong>Telefon:</strong> ${inquiry.phone}</p>
            <p style="margin: 0 0 10px 0;"><strong>E-posta:</strong> ${inquiry.email || '-'}</p>
            <p style="margin: 0;"><strong>Mesaj:</strong><br/> ${inquiry.message || '-'}</p>
          </div>
          <p>Yönetim paneline giriş yaparak talepleri yönetebilirsiniz.</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to create inquiry:', error);
    return { success: false, error: 'Talebiniz alınırken bir hata oluştu. Lütfen telefon ile ulaşın.' };
  }
}

export async function getInquiries() {
  try {
    return await prisma.inquiry.findMany({
      include: {
        tour: {
          select: { title: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Failed to get inquiries:', error);
    return [];
  }
}

export async function updateInquiryStatus(id: number, status: 'NEW' | 'CONTACTED' | 'CLOSED') {
  try {
    await prisma.inquiry.update({
      where: { id },
      data: { status },
    });
    revalidatePath('/admin/talepler');
    return { success: true };
  } catch (error) {
    console.error('Failed to update inquiry status:', error);
    return { success: false, error: 'Durum güncellenirken bir hata oluştu.' };
  }
}
