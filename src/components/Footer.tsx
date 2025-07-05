export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between text-gray-600 text-sm text-center sm:text-left">
        <div>
          © {new Date().getFullYear()} Micro-Quiz Platform. All rights reserved.
        </div>
        <div className="flex gap-4 mt-2 sm:mt-0 justify-center sm:justify-end">
          <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="hover:underline">Built with Next.js</a>
          <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Styled with Tailwind CSS</a>
        </div>
      </div>
    </footer>
  );
} 