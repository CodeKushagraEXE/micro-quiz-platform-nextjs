import Link from 'next/link';

interface QuizCardProps {
  id: string;
  title: string;
  description: string;
}

export default function QuizCard({ id, title, description }: QuizCardProps) {
  return (
    <Link href={`/quiz/${id}`}
      className="block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow border border-gray-100 hover:border-blue-400 p-6 focus:outline-none focus:ring-2 focus:ring-blue-400 transform hover:scale-105 hover:-translate-y-1 cursor-pointer">
      <h3 className="text-2xl font-bold text-blue-700 mb-2 tracking-tight">{title}</h3>
      <p className="text-gray-600 text-base font-medium">{description}</p>
    </Link>
  );
} 