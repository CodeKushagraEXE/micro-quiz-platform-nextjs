import { NextResponse } from 'next/server';

const categories = [
  { id: 'history', name: 'History', icon: '/images/history.png' },
  { id: 'science', name: 'Science', icon: '/images/science.png' },
  { id: 'math', name: 'Math', icon: '/images/math.png' },
  { id: 'programming', name: 'Programming', icon: '/images/programming.png' },
];

export async function GET() {
  return NextResponse.json(categories);
} 