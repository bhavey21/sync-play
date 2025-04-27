import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/app/lib/dbConnect';
import Video from '../../../models/Video';

export async function POST(req: NextRequest): Promise<Response> {
  const { name, key } = await req.json();
  await dbConnect();
  const token = req.cookies.get('token')?.value;
  let userId;
  const JWT_SECRET = process.env.JWT_SECRET;
  const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
  userId = decoded.id;
  
  const video = new Video({ name, key, user:userId});
  await video.save();

  return NextResponse.json({ message: 'Video Saved' }, { status: 201 });
}
