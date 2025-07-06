import CategoryCard from '@/components/CategoryCard';
import Head from 'next/head';
import { categories, quizzesByCategory } from '@/data/quizzes';

export default async function Home() {
  // Calculate quiz counts for each category
  const categoriesWithCounts = categories.map((cat) => ({
    ...cat,
    quizCount: quizzesByCategory[cat.id]?.length || 0,
  }));

  return (
    <>
      <Head>
        <title>Micro-Quiz Platform</title>
        <meta name="description" content="Take short, topic-specific quizzes in History, Science, Math, Programming and more!" />
      </Head>
      <main className="min-h-screen bg-gray-50 py-16 px-4 flex flex-col items-center">
        <div className="w-full max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4 text-blue-700 tracking-tight">Micro-Quiz Platform</h1>
          <p className="text-xl text-gray-600 font-medium">Choose a category to get started!</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 w-full max-w-4xl mx-auto">
          {categoriesWithCounts.map((cat) => (
            <CategoryCard key={cat.id} {...cat} />
          ))}
        </div>
      </main>
    </>
  );
}
