import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check for the admin session cookie
  const session = request.cookies.get('admin_session');
  const { pathname } = request.nextUrl;

  // Protect all /admin routes EXCEPT /admin/login
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (!session || session.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // If logged in, don't let them visit the login page again
  if (pathname.startsWith('/admin/login') && session?.value === 'authenticated') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
