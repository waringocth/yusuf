import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Sadece /admin ile başlayan sayfaları kontrol et, ama /admin/login'i hariç tut
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const adminSession = request.cookies.get('admin_session');

    if (!adminSession?.value) {
      // Çerez yoksa, /admin/login sayfasına yönlendir
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // /admin/login sayfasındayken halihazırda oturum varsa /admin sayfasına at
  if (pathname === '/admin/login') {
    const adminSession = request.cookies.get('admin_session');
    
    if (adminSession?.value) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Sadece admin altındaki tüm rotalar için çalıştır
  matcher: ['/admin/:path*'],
};
