import { NextResponse } from 'next/server';
import pool from '@/utils/db';

export async function GET() {
  try {
    const tasks = await pool.query('SELECT * FROM tasks');
    return NextResponse.json(tasks.rows);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 500 }
      );
    }
  }
}

export async function POST(request: Request) {
  const { title, description } = await request.json();

  try {
    const newTask = await pool.query(
      'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    return NextResponse.json(newTask.rows[0]);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 500 }
      );
    }
  }
}
