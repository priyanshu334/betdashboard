import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Retrieve the token from cookies
  const token = request.cookies.get('auth_token')?.value;

  // If there's no token and the user is trying to access a protected route, redirect to login
  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If there's a token and the user is accessing the login page, redirect to dashboard
  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Specify the paths where this middleware should run
export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
