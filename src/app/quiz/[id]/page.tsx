import QuizPlayer from '@/components/QuizPlayer';
import Head from 'next/head';
import { notFound } from 'next/navigation';

interface QuizDetail {
  id: string;
  title: string;
  questions: { question: string; options: string[]; answer: number }[];
}

interface QuizPageProps {
  params: { id: string };
}

function getBaseUrl() {
  if (typeof window !== 'undefined') return '';
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

async function getQuiz(id: string) {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/quizzes/id/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quiz: QuizDetail | null = await getQuiz(id);
  if (!quiz) return notFound();

  return (
    <>
      <Head>
        <title>{quiz.title} | Micro-Quiz Platform</title>
        <meta name="description" content={`Take the quiz: ${quiz.title}`} />
      </Head>
      <main className="min-h-screen bg-gray-50 py-16 px-4 flex flex-col items-center">
        <div className="w-full max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-4 tracking-tight">{quiz.title}</h1>
          <p className="text-lg text-gray-600 font-medium">Answer the questions below:</p>
        </div>
        <QuizPlayer questions={quiz.questions} />
      </main>
    </>
  );
} 