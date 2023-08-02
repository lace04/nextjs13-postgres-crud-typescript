import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({ message: 'Get task' });
}

export function PUT() {
  return NextResponse.json({ message: 'Update task' });
}

export function DELETE() {
  return NextResponse.json({ message: 'Delete task' });
}
