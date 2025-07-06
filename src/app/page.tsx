import CategoryCard from '@/components/CategoryCard';
import Head from 'next/head';
import { headers } from 'next/headers';

interface Category {
  id: string;
  name: string;
  icon: string;
  quizCount?: number;
}

function getBaseUrl() {
  const headersList = headers();
  const host = headersList.get('host');
  const protocol = host && host.includes('localhost') ? 'http' : 'https';
  return `${protocol}://${host}`;
}

async function getCategoriesWithCounts(): Promise<Category[]> {
  try {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/categories`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error('Failed to fetch categories');
    const categories: Category[] = await res.json();
    // Fetch quiz counts for each category
    const quizCounts = await Promise.all(
      categories.map(async (cat: Category) => {
        try {
          const quizRes = await fetch(`${baseUrl}/api/quizzes/category/${cat.id}`);
          if (!quizRes.ok) return 0;
          const quizzes = await quizRes.json();
          return quizzes.length;
        } catch (error) {
          console.error(`Failed to fetch quiz count for category ${cat.id}:`, error);
          return 0;
        }
      })
    );
    return categories.map((cat: Category, i: number) => ({ ...cat, quizCount: quizCounts[i] }));
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    // Return default categories if API is not available
    return [
      { id: 'history', name: 'History', icon: '⏳', quizCount: 2 },
      { id: 'science', name: 'Science', icon: '🔬', quizCount: 2 },
      { id: 'math', name: 'Math', icon: '🧮', quizCount: 2 },
      { id: 'programming', name: 'Programming', icon: '💻', quizCount: 2 },
    ];
  }
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
          {categories.map((cat: Category) => (
            <CategoryCard key={cat.id} {...cat} />
          ))}
        </div>
      </main>
    </>
  );
}
