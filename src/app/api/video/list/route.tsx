

import { NextRequest, NextResponse } from 'next/server';

import dbConnect from '@/app/lib/dbConnect';
import { getCurrentUser } from '@/app/lib/auth';
import Video from '../../models/Video';

export async function GET(req: NextRequest) {
  await dbConnect();

  let user = getCurrentUser(req);

  const videos = await Video.find({ user: user.id }).sort({ createdAt: -1 });

  return NextResponse.json({ videos });
}
