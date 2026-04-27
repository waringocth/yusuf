'use server';

import prisma from '@/lib/prisma';
import { Resend } from 'resend';
import { cookies } from 'next/headers';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOtp(email: string) {
  try {
    // Check if user exists and is an admin
    const adminUser = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (!adminUser) {
      return { success: false, error: 'Bu e-posta adresi yetkili değil.' };
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Save token to DB (Delete old tokens for this email first)
    await prisma.verificationToken.deleteMany({
      where: { email },
    });

    await prisma.verificationToken.create({
      data: {
        email,
        token: otp,
        expiresAt,
      },
    });

    // Send email via Resend
    // Important: For testing without a verified domain, Resend requires you to send TO your registered email.
    // Replace 'onboarding@resend.dev' with your verified domain email if you have one.
    const { error } = await resend.emails.send({
      from: 'Kılınç Turizm Admin <onboarding@resend.dev>',
      to: email,
      subject: 'Yönetim Paneli Giriş Kodunuz',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1e3a8a; text-align: center;">Kılınç Turizm Yönetim Paneli</h2>
          <p>Merhaba,</p>
          <p>Yönetim paneline giriş yapmak için tek kullanımlık şifreniz (OTP) aşağıdadır:</p>
          <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; text-align: center; margin: 24px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #1e3a8a;">${otp}</span>
          </div>
          <p style="color: #6b7280; font-size: 14px;">Bu kod <strong>5 dakika</strong> boyunca geçerlidir. Lütfen kodu kimseyle paylaşmayın.</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />
          <p style="color: #9ca3af; font-size: 12px; text-align: center;">Bu işlemi siz talep etmediyseniz, bu e-postayı görmezden gelebilirsiniz.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return { success: false, error: 'E-posta gönderilirken bir hata oluştu. Lütfen tekrar deneyin.' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error in sendOtp:', error);
    return { success: false, error: 'Sunucu hatası oluştu.' };
  }
}

export async function verifyOtp(email: string, token: string) {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        email,
        token,
      },
    });

    if (!verificationToken) {
      return { success: false, error: 'Girdiğiniz kod hatalı.' };
    }

    if (new Date() > verificationToken.expiresAt) {
      return { success: false, error: 'Girdiğiniz kodun süresi dolmuş. Lütfen yeni kod isteyin.' };
    }

    // Token is valid! Clean it up.
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });

    // Create session cookie
    const cookieStore = await cookies();
    cookieStore.set('admin_session', email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return { success: true };
  } catch (error) {
    console.error('Error in verifyOtp:', error);
    return { success: false, error: 'Sunucu hatası oluştu.' };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
}
