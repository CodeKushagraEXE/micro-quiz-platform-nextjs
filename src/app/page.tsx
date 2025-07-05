import CategoryCard from '@/components/CategoryCard';
import Head from 'next/head';

function getBaseUrl() {
  if (typeof window !== 'undefined') return '';
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

async function getCategoriesWithCounts() {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/categories`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error('Failed to fetch categories');
  const categories = await res.json();
  // Fetch quiz counts for each category
  const quizCounts = await Promise.all(
    categories.map(async (cat: any) => {
      const quizRes = await fetch(`${baseUrl}/api/quizzes/category/${cat.id}`);
      if (!quizRes.ok) return 0;
      const quizzes = await quizRes.json();
      return quizzes.length;
    })
  );
  return categories.map((cat: any, i: number) => ({ ...cat, quizCount: quizCounts[i] }));
}

export default async function Home() {
  const categories = await getCategoriesWithCounts();

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
          {categories.map((cat: any) => (
            <CategoryCard key={cat.id} {...cat} />
          ))}
        </div>
      </main>
    </>
  );
}
