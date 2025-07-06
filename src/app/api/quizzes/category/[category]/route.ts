import { NextRequest, NextResponse } from 'next/server';
import { quizzesByCategory } from '@/data/quizzes';

export async function GET(req: NextRequest, { params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const quizzes = quizzesByCategory[category] || [];
  return NextResponse.json(quizzes);
} 