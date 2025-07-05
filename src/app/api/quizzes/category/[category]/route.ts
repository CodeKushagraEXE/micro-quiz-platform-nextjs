import { NextRequest, NextResponse } from 'next/server';

const quizzesByCategory: Record<string, any[]> = {
  history: [
    { id: 'h1', title: 'World War II Basics', description: 'Test your knowledge of WWII.' },
    { id: 'h2', title: 'Ancient Civilizations', description: 'Quiz on ancient history.' },
  ],
  science: [
    { id: 's1', title: 'Physics Fundamentals', description: 'Basic physics concepts.' },
    { id: 's2', title: 'Biology 101', description: 'Intro to biology.' },
  ],
  math: [
    { id: 'm1', title: 'Algebra Essentials', description: 'Key algebra topics.' },
    { id: 'm2', title: 'Geometry Basics', description: 'Test your geometry skills.' },
  ],
  programming: [
    { id: 'p1', title: 'JavaScript Basics', description: 'JS fundamentals.' },
    { id: 'p2', title: 'Python for Beginners', description: 'Intro to Python.' },
  ],
};

export async function GET(req: NextRequest, { params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const quizzes = quizzesByCategory[category] || [];
  return NextResponse.json(quizzes);
} 