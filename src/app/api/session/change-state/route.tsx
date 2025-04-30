import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import bcrypt from 'bcryptjs';
import Session from '../../models/Session';
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const {play,id } = body;
    const session = await Session.findOneAndUpdate(
      { video: id },
      { play },
      { new: true }
    );
    
    // @ts-ignore
    const io = global._io;
    if (io) {
      io.to(session._id.toString()).emit("change-state", { play });
    }
    return NextResponse.json({ session }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
