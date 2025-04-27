// app/api/register/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import Session from '../../models/Session';
import Video from '../../models/Video';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';


const s3 = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});


export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const {id } = body;
    Video;  
    const session = await Session.findById(id).populate('video');
    const signedUrl = await generateSignedUrl(session.video.key);


    //videoObject.videoUrl = signedUrl;
    return NextResponse.json({ session,signedUrl }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


async function generateSignedUrl(videoKey: string) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: videoKey,
  };

  const command = new GetObjectCommand(params);
  return await getSignedUrl(s3, command, { expiresIn: 60 * 60 * 24 });
}
