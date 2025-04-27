import { NextRequest, NextResponse } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import Video from '@/app/api/models/Video';
import dbConnect from '@/app/lib/dbConnect';
import Session from '@/app/api/models/Session';
import mongoose from 'mongoose';
// Configure AWS S3
const s3 = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export async function GET(req: NextRequest) {
  await dbConnect();

  // Extract video ID from URL pathname
  const pathParts = req.nextUrl.pathname.split('/');
  const id = pathParts[pathParts.length - 1];

  // Fetch video metadata
  const video = await Video.findById(id);
  if (!video) {
    return NextResponse.json({ message: 'Video not found' }, { status: 404 });
  }

  // Generate signed URL for video
  const signedUrl = await generateSignedUrl(video.key);

  // Convert to plain object and attach signed URL
  const videoObject = video.toObject();
  videoObject.videoUrl = signedUrl;
  const session = await Session.findOne({ video: video._id });
  return NextResponse.json({ video: videoObject, session });
}

// Helper to generate signed URL
async function generateSignedUrl(videoKey: string) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: videoKey,
  };

  const command = new GetObjectCommand(params);
  return await getSignedUrl(s3, command, { expiresIn: 60 * 60 * 24 });
}
