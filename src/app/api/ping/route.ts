import { NextResponse } from 'next/server';
import pool from '@/utils/db';

export async function GET() {
  //now
  const { rows } = await pool.query('SELECT NOW()');
  return NextResponse.json(rows[0].now);
}
