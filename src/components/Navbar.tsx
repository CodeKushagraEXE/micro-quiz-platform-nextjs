"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/quizzes/history', label: 'Quizzes' },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-400 shadow sticky top-0 z-50 text-white">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="text-2xl font-bold tracking-tight hover:opacity-90 transition">
          Micro-Quiz
        </Link>
        <div className="flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1 rounded-lg transition text-lg font-medium ${pathname === link.href ? 'bg-white bg-opacity-20 shadow text-white font-bold' : 'opacity-80 hover:bg-white hover:bg-opacity-10'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
} 