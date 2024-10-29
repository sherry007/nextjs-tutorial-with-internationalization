import NextAuth from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { authConfig } from './auth.config';

const intlMiddleware = createMiddleware(routing);
const auth = NextAuth(authConfig).auth;

const authMiddleware = auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.includes('/dashboard');
  const localeCookie = req.cookies.get('NEXT_LOCALE');
  const locale = localeCookie?.value;

  if (isOnDashboard && isLoggedIn) return intlMiddleware(req);

  if (isLoggedIn && req.nextUrl.pathname === '/') {
    // redirect to dashboard
    return Response.redirect(new URL(`/${locale}/dashboard`, req.nextUrl.origin));
  }

  if (!isLoggedIn && !req.nextUrl.pathname.includes('login') && req.nextUrl.pathname !== '/' && req.nextUrl.pathname !== `/${locale}`) {
    // redirect to login
    return Response.redirect(new URL(`/${locale}/login`, req.nextUrl.origin));
  }

  if (!isLoggedIn && req.nextUrl.pathname === `/${locale}/`) {
    // redirect to public index when not logged in
    return;
  }

  return intlMiddleware(req);
});

export default function middleware(req: NextRequest) {
  return (authMiddleware as any)(req);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};