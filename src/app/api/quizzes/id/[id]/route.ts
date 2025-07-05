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
  p2: {
    id: 'p2',
    title: 'Programming Quiz 2',
    questions: [
      {
        question: 'What does CSS stand for?',
        options: [
          'Computer Style Sheets',
          'Cascading Style Sheets',
          'Creative Style Syntax',
          'Colorful Style Sheets',
        ],
        answer: 1,
      },
      {
        question: 'Which language runs in a web browser?',
        options: [
          'Java',
          'C',
          'Python',
          'JavaScript',
        ],
        answer: 3,
      },
    ],
  },
  h2: {
    id: 'h2',
    title: 'History Quiz 2',
    questions: [
      {
        question: 'Who was the first President of the United States?',
        options: ['Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'John Adams'],
        answer: 1,
      },
      {
        question: 'In which year did the Berlin Wall fall?',
        options: ['1989', '1991', '1975', '1961'],
        answer: 0,
      },
    ],
  },
  s2: {
    id: 's2',
    title: 'Science Quiz 2',
    questions: [
      {
        question: 'What is the chemical symbol for water?',
        options: ['O2', 'H2O', 'CO2', 'NaCl'],
        answer: 1,
      },
      {
        question: 'What planet is known as the Morning Star?',
        options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
        answer: 1,
      },
    ],
  },
  m2: {
    id: 'm2',
    title: 'Math Quiz 2',
    questions: [
      {
        question: 'What is the value of π (pi) rounded to two decimal places?',
        options: ['3.12', '3.14', '3.16', '3.18'],
        answer: 1,
      },
      {
        question: 'What is 7 x 8?',
        options: ['54', '56', '58', '60'],
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