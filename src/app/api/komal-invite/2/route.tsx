import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import bcrypt from 'bcryptjs';
import KomalInvite2 from '../../models/KomalInvite2';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const {response} = body;
    const invite = new KomalInvite2({ response });
    await invite.save();
    return NextResponse.json( { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


export async function GET(req: Request) {
  try {
    await dbConnect();

    const latestInvite = await KomalInvite2.findOne().sort({ createdAt: -1 });

    return NextResponse.json({ response: latestInvite?.response }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
