import QuizCard from '@/components/QuizCard';
import Head from 'next/head';
import { notFound } from 'next/navigation';
import { quizzesByCategory, categories } from '@/data/quizzes';

export async function generateStaticParams() {
  return categories.map(cat => ({ category: cat.id }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const quizzes = quizzesByCategory[category] || null;
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