// micro-quiz-platform-nextjs/src/app/api/categories/route.ts
import { NextResponse } from 'next/server';
import { categories } from '@/data/quizzes';

export async function GET() {
  return NextResponse.json(categories);
}