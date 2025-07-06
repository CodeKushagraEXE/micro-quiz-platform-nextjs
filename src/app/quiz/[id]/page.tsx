import QuizPlayer from '@/components/QuizPlayer';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { quizDetails } from '@/data/quizzes';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const quiz = quizDetails[id];
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
  const quiz = quizDetails[id] || null;
  if (!quiz) return notFound();

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