import Image from 'next/image';
import Link from 'next/link';

interface CategoryCardProps {
  id: string;
  name: string;
  icon: string;
  quizCount?: number;
}

export default function CategoryCard({ id, name, icon, quizCount }: CategoryCardProps) {
  return (
    <Link
      href={`/quizzes/${id}`}
      className="group block rounded-2xl shadow-xl border border-blue-200 bg-white hover:bg-blue-50 transition-all duration-200 p-8 text-center relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-400 transform hover:scale-105 hover:-translate-y-1"
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <span className="inline-block rounded-full bg-gradient-to-tr from-blue-400 to-blue-600 p-4 shadow-md group-hover:scale-110 transition-transform">
            <Image src={icon} alt={name} width={56} height={56} className="" />
          </span>
          {quizCount !== undefined && (
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-lg animate-bounce">
              {quizCount}
            </span>
          )}
        </div>
        <span className="text-xl font-extrabold tracking-tight text-gray-800 group-hover:text-blue-700 transition-colors font-sans">
          {name}
        </span>
      </div>
    </Link>
  );
} 