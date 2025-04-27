import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function getCurrentUser(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) {
    throw new Error('Unauthorized: No token');
  }

  const JWT_SECRET = process.env.JWT_SECRET!;
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    return decoded;
  } catch (err) {
    throw new Error('Unauthorized: Invalid token');
  }
}
