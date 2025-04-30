import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const response = NextResponse.redirect(new URL('/login', request.url));

    // Remove the token cookie by setting its expiration date to the past
    response.cookies.set('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensure secure cookies in production
        path: '/',
        expires: new Date(0), // Expire the cookie immediately
        sameSite: 'lax',
    });

    return response;
}
