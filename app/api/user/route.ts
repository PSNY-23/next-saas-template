import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();

    //Basic validation
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    //Create the new User in database
    const newUser = await prisma.user.create({
      data: {
        email,
        password,
      },
    });

    return NextResponse.json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating user', error }, { status: 500 });
  }
};
