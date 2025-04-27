// app/api/register/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import bcrypt from 'bcryptjs';
import Session from '../../models/Session';
import Video from '../../models/Video';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const {play,id } = body;

    const session = await Session.updateOne({ video:id },{play});

    return NextResponse.json({ session }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
