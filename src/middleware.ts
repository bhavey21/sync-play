import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  const token = request.cookies.get('token')?.value;
  if (PUBLIC_PATHS.includes(pathname)){
    if(token) {
      return NextResponse.redirect(new URL('/dashboard/video/list', request.url));
    }
    return NextResponse.next()
  }

  // Check for JWT token in cookies
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    return NextResponse.next(); // Authenticated, allow access
  } catch (err) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};

