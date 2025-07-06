import { NextRequest, NextResponse } from 'next/server';
import { quizDetails } from '@/data/quizzes';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quiz = quizDetails[id];
  if (!quiz) {
    return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
  }
  return NextResponse.json(quiz);
} 