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

    const {id } = body;

    const video = await Video.findById(id);
    console.log(id);
    console.log(video);
    const session = await Session.findOne({ video:id });
    console.log(session);
    if (!video || session) {
      return NextResponse.json({ error: 'An error occured' }, { status: 400 });
    }
    
    const newSession = new Session({ video:id});
    await newSession.save();

    return NextResponse.json({ session:newSession }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
