// app/api/register/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import User from '../models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const { name, email, password } = body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }
    const hashedPassword =await bcrypt.hash(password, 10)
    const newUser = new User({ name, email, password:hashedPassword });
    await newUser.save();

    return NextResponse.json({ message: 'User registered' }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
