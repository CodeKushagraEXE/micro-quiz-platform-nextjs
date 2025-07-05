// micro-quiz-platform-nextjs/src/app/api/categories/route.ts
import { NextResponse } from 'next/server';

const categories = [
  { id: 'history', name: 'History', icon: '⏳' },
  { id: 'science', name: 'Science', icon: '🔬' },
  { id: 'math', name: 'Math', icon: '🧮' },
  { id: 'programming', name: 'Programming', icon: '💻' },
];

export async function GET() {
  return NextResponse.json(categories);
}