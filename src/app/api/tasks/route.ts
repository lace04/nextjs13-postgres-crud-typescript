import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({ message: 'Get tasks' });
}

export function POST() {
  return NextResponse.json({ message: 'Create task' });
}
