import { NextResponse } from 'next/server';
import pool from '@/utils/db';

interface Params {
  params: { id: number };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const taskFound = await pool.query('SELECT * FROM tasks WHERE id = $1', [
      params.id,
    ]);
    if (!taskFound.rows[0]) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }
    return NextResponse.json(taskFound.rows[0]);
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

export async function PUT(request: Request, { params }: Params) {
  try {
    const { title, description } = await request.json();

    const taskFound = await pool.query('SELECT * FROM tasks WHERE id = $1', [
      params.id,
    ]);
    if (!taskFound.rows[0]) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }
    const updateTask = await pool.query(
      'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      [title, description, params.id]
    );

    const { created_at } = updateTask.rows[0];

    return NextResponse.json(
      {
        id: params.id,
        title,
        description,
        created_at,
      },
      { status: 200 }
    );
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

export async function DELETE(request: Request, { params }: Params) {
  try {
    const taskFound = await pool.query('SELECT * FROM tasks WHERE id = $1', [
      params.id,
    ]);
    if (!taskFound.rows[0]) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }
    const deleteTask = await pool.query('DELETE FROM tasks WHERE id = $1', [
      params.id,
    ]);

    return NextResponse.json({ message: 'Task deleted' }, { status: 200 });
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
