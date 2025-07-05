import { NextRequest, NextResponse } from 'next/server';

const quizDetails: Record<string, any> = {
  h1: {
    id: 'h1',
    title: 'World War II Basics',
    questions: [
      {
        question: 'When did World War II end?',
        options: ['1942', '1945', '1939', '1950'],
        answer: 1,
      },
      {
        question: 'Who was the British Prime Minister during WWII?',
        options: ['Winston Churchill', 'Neville Chamberlain', 'Clement Attlee', 'Stanley Baldwin'],
        answer: 0,
      },
    ],
  },
  s1: {
    id: 's1',
    title: 'Physics Fundamentals',
    questions: [
      {
        question: 'What is the unit of force?',
        options: ['Joule', 'Newton', 'Watt', 'Pascal'],
        answer: 1,
      },
      {
        question: 'What planet is known as the Red Planet?',
        options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
        answer: 1,
      },
    ],
  },
  m1: {
    id: 'm1',
    title: 'Algebra Essentials',
    questions: [
      {
        question: 'What is x if 2x + 3 = 7?',
        options: ['1', '2', '3', '4'],
        answer: 1,
      },
      {
        question: 'What is the square root of 16?',
        options: ['2', '4', '8', '16'],
        answer: 1,
      },
    ],
  },
  p1: {
    id: 'p1',
    title: 'JavaScript Basics',
    questions: [
      {
        question: 'Which company developed JavaScript?',
        options: ['Microsoft', 'Netscape', 'Google', 'Apple'],
        answer: 1,
      },
      {
        question: 'What is the output of 2 + "2" in JS?',
        options: ['4', '22', 'undefined', 'NaN'],
        answer: 1,
      },
    ],
  },
};

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quiz = quizDetails[id];
  if (!quiz) {
    return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
  }
  return NextResponse.json(quiz);
} 