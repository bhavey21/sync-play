import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/app/lib/dbConnect';
import Video from '../../../models/Video';

interface DecodedToken {
  id: string;
}

function isDecodedToken(decoded: any): decoded is DecodedToken {
  return decoded && typeof decoded.id === 'string';
}

export async function POST(req: NextRequest): Promise<Response> {
  const { name, key } = await req.json();
  await dbConnect();
  const token = req.cookies.get('token')?.value as string;
  const JWT_SECRET = process.env.JWT_SECRET as string;
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check if the decoded token has the 'id' property
    if (!isDecodedToken(decoded)) {
      throw new Error('Invalid token');
    }

    const userId = decoded.id;
    const video = new Video({ name, key, user: userId });
    await video.save();

    return NextResponse.json({ message: 'Video Saved' }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
  }
}