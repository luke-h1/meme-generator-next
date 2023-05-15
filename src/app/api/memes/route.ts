import memes from '@frontend/app/(data)/database';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(memes);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  memes.unshift({
    id: Math.random().toString(),
    ...body,
  });

  return NextResponse.json(memes);
}
