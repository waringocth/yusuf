'use server';

import prisma from '@/lib/prisma';
import { Resend } from 'resend';
import { revalidatePath } from 'next/cache';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function createInquiry(data: {
  tourId?: number;
  name: string;
  phone: string;
  email?: string;
  message?: string;
}) {
  try {
    console.log('Starting createInquiry with data:', data);

    const inquiryData: any = {
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      message: data.message || undefined,
    };

    // Use tourId directly (unchecked input) — avoids Prisma "Argument tour is missing" error
    if (data.tourId && !isNaN(Number(data.tourId))) {
      inquiryData.tourId = Number(data.tourId);
    }

    const inquiry = await prisma.inquiry.create({
      data: inquiryData,
    });
    
    console.log('Inquiry created in DB successfully:', inquiry.id);

    const adminEmail = 'yigitcankerimbusiness@gmail.com';
    const tourTitle = (data.tourId && !isNaN(Number(data.tourId)))
      ? `Tur #${data.tourId}`
      : 'Genel İletişim Formu';

    console.log('Sending email to:', adminEmail);

    const resendResponse = await resend.emails.send({
      from: 'Kılınç Turizm <onboarding@resend.dev>',
      to: adminEmail,
      subject: `Yeni Talep: ${tourTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1e3a8a;">Yeni Müşteri Talebi</h2>
          <p><strong>İlgilenilen Konu:</strong> ${tourTitle}</p>
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

    if (resendResponse.error) {
      console.error('Resend API Error:', resendResponse.error);
      // We still return success: true because the lead was saved to DB, 
      // but maybe we want to inform the user or just log it.
    } else {
      console.log('Resend email sent successfully:', resendResponse.data);
    }

    revalidatePath('/admin/talepler');
    return { success: true };
  } catch (error: any) {
    console.error('Failed to create inquiry. Full error:', error);
    return { success: false, error: error.message || 'Talebiniz alınırken bir hata oluştu. Lütfen telefon ile ulaşın.' };
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
