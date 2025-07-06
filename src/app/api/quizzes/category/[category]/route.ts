import { NextRequest, NextResponse } from 'next/server';

interface Quiz {
  id: string;
  title: string;
  description: string;
}

const quizzesByCategory: Record<string, Quiz[]> = {
  history: [
    { id: 'h1', title: 'World War II Basics', description: 'Test your knowledge of WWII.' },
    { id: 'h2', title: 'History Quiz 2', description: 'A quiz on US presidents and the Berlin Wall.' },
  ],
  science: [
    { id: 's1', title: 'Physics Fundamentals', description: 'Basic physics concepts.' },
    { id: 's2', title: 'Science Quiz 2', description: 'Water and planets.' },
  ],
  math: [
    { id: 'm1', title: 'Algebra Essentials', description: 'Key algebra topics.' },
    { id: 'm2', title: 'Math Quiz 2', description: 'Pi and multiplication.' },
  ],
  programming: [
    { id: 'p1', title: 'JavaScript Basics', description: 'JS fundamentals.' },
    { id: 'p2', title: 'Programming Quiz 2', description: 'CSS and browser languages.' },
  ],
};

export async function GET(req: NextRequest, { params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const quizzes = quizzesByCategory[category] || [];
  return NextResponse.json(quizzes);
} 