"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { categories } from '@/data/quizzes';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-400 shadow sticky top-0 z-50 text-white">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="text-2xl font-bold tracking-tight hover:opacity-90 transition">
          Micro-Quiz
        </Link>
        <div className="flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1 rounded-lg transition text-lg font-medium ${pathname === link.href ? 'bg-white bg-opacity-20 shadow text-white font-bold' : 'opacity-80 hover:bg-white hover:bg-opacity-10'}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="relative">
            <button
              className="px-3 py-1 rounded-lg transition text-lg font-medium opacity-80 hover:bg-white hover:bg-opacity-10 flex items-center gap-1"
              onClick={() => setDropdownOpen((open) => !open)}
              onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              Categories
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-50 py-2 animate-fade-in">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/quizzes/${cat.id}`}
                    className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-700 transition-colors text-base font-medium"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span className="mr-2" style={{ fontSize: 20 }}>{cat.icon}</span>
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 