import QuizPlayer from '@/components/QuizPlayer';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface QuizDetail {
  id: string;
  title: string;
  questions: { question: string; options: string[]; answer: number }[];
}

function getBaseUrl() {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'http://localhost:3000';
}

async function getQuiz(id: string) {
  try {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/quizzes/id/${id}`, { cache: 'no-store' });
    if (!res.ok) {
      return null;
    }
    const quiz = await res.json();
    return quiz;
  } catch (error) {
    console.error(`Failed to fetch quiz ${id}:`, error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const quiz = await getQuiz(id);
  
  if (!quiz) {
    return {
      title: 'Quiz Not Found | Micro-Quiz Platform',
    };
  }

  return {
    title: `${quiz.title} | Micro-Quiz Platform`,
    description: `Take the quiz: ${quiz.title}`,
  };
}

export default async function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quiz: QuizDetail | null = await getQuiz(id);
  
  if (!quiz) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 flex flex-col items-center">
      <div className="w-full max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4 tracking-tight">{quiz.title}</h1>
        <p className="text-lg text-gray-600 font-medium">Answer the questions below:</p>
      </div>
      <QuizPlayer questions={quiz.questions} />
    </main>
  );
} 