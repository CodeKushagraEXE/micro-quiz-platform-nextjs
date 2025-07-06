import QuizCard from '@/components/QuizCard';
import Head from 'next/head';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';

interface Quiz {
  id: string;
  title: string;
  description: string;
}

function getBaseUrl() {
  const headersList = headers();
  const host = headersList.get('host');
  const protocol = host && host.includes('localhost') ? 'http' : 'https';
  return `${protocol}://${host}`;
}

async function getQuizzes(category: string) {
  try {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/quizzes/category/${category}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(`Failed to fetch quizzes for category ${category}:`, error);
    return null;
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const quizzes: Quiz[] | null = await getQuizzes(category);
  if (!quizzes) return notFound();

  return (
    <>
      <Head>
        <title>{category.charAt(0).toUpperCase() + category.slice(1)} Quizzes | Micro-Quiz Platform</title>
        <meta name="description" content={`Quizzes for ${category}`} />
      </Head>
      <main className="min-h-screen bg-gray-50 py-16 px-4 flex flex-col items-center">
        <div className="w-full max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-4 tracking-tight">{category.charAt(0).toUpperCase() + category.slice(1)} Quizzes</h1>
          <p className="text-lg text-gray-600 font-medium">Select a quiz to begin!</p>
        </div>
        <div className="w-full max-w-3xl mx-auto">
          {quizzes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <span className="text-6xl mb-4">📭</span>
              <p className="text-gray-500 text-lg">No quizzes found for this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {quizzes.map((quiz) => <QuizCard key={quiz.id} {...quiz} />)}
            </div>
          )}
        </div>
      </main>
    </>
  );
} 