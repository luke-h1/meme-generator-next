import memeTemplates from '@frontend/app/(data)/memeTemplates';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(memeTemplates);
}
