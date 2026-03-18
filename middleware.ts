import { NextRequest, NextResponse } from 'next/server';
import { PUBLIC_PATHS, USER_COOKIE_KEY } from "@/lib/auth";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const user = request.cookies.get(USER_COOKIE_KEY);
  if (!user) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/projects/:path*', '/recorder/:path*', '/settings/:path*'],
};
