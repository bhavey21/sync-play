import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  console.log('mmmmnnjj');
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (PUBLIC_PATHS.includes(pathname)) return NextResponse.next();

  // Check for JWT token in cookies
  const token = request.cookies.get('token')?.value;
  console.log(token);
  if (!token) {
    console.log('token not found');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
   console.log('token found');
    return NextResponse.next(); // Authenticated, allow access
  } catch (err) {
    console.error("Invalid token:", err);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: '/dashboard/:path*',
};

