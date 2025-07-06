# Micro-Quiz Platform

A modern, interactive quiz platform built with Next.js 15, featuring topic-specific quizzes in History, Science, Math, and Programming. Users can browse categories, take quizzes, and see their results in real-time.

## 🚀 Features

- **Category-based Quiz Navigation**: Browse quizzes by subject (History, Science, Math, Programming)
- **Interactive Quiz Player**: Real-time feedback, progress tracking, and score calculation
- **Responsive Design**: Beautiful UI that works on desktop and mobile devices
- **Modern Tech Stack**: Built with Next.js 15, TypeScript, and Tailwind CSS
- **Performance Optimized**: Static generation, server-side rendering, and efficient data fetching

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Fonts**: Geist (optimized with next/font)
- **Deployment**: Ready for Vercel deployment

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd micro-quiz-platform-nextjs
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 4. Open Your Browser

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

```
micro-quiz-platform-nextjs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   ├── categories/    # Categories endpoint
│   │   │   └── quizzes/       # Quiz data endpoints
│   │   ├── quiz/[id]/         # Individual quiz pages
│   │   ├── quizzes/[category]/ # Category listing pages
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # Reusable components
│   │   ├── CategoryCard.tsx   # Category display cards
│   │   ├── QuizCard.tsx       # Quiz display cards
│   │   ├── QuizPlayer.tsx     # Interactive quiz interface
│   │   ├── Navbar.tsx         # Navigation component
│   │   └── Footer.tsx         # Footer component
│   └── globals.css            # Global styles with Tailwind
├── public/                    # Static assets
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
└── package.json               # Dependencies and scripts
```

## 🎯 Next.js Requirements Implementation

### 1. **Static Site Generation (SSG)**
- **Implementation**: Homepage (`/`) uses `getCategoriesWithCounts()` with `revalidate: 60` for ISR
- **Benefit**: Fast initial page loads and reduced server load
- **Code Example**:
```typescript
const res = await fetch(`${baseUrl}/api/categories`, {
  next: { revalidate: 60 },
});
```

### 2. **Server-Side Rendering (SSR)**
- **Implementation**: Dynamic routes (`/quiz/[id]`, `/quizzes/[category]`) use `cache: 'no-store'`
- **Benefit**: Fresh data for each request and SEO-friendly content
- **Code Example**:
```typescript
const res = await fetch(`${baseUrl}/api/quizzes/id/${id}`, { 
  cache: 'no-store' 
});
```

### 3. **API Routes**
- **Implementation**: RESTful API endpoints in `src/app/api/`
- **Endpoints**:
  - `GET /api/categories` - Returns all quiz categories
  - `GET /api/quizzes/category/[category]` - Returns quizzes for a category
  - `GET /api/quizzes/id/[id]` - Returns specific quiz with questions
- **Benefit**: Clean separation of data and presentation layers

### 4. **next/font Optimization**
- **Implementation**: Geist font family with optimized loading
- **Benefit**: Improved performance and Core Web Vitals
- **Code Example**:
```typescript
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
```

### 5. **Metadata API**
- **Implementation**: Dynamic metadata generation for SEO
- **Benefit**: Proper page titles and descriptions for search engines
- **Code Example**:
```typescript
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const quiz = await getQuiz(id);
  
  return {
    title: `${quiz.title} | Micro-Quiz Platform`,
    description: `Take the quiz: ${quiz.title}`,
  };
}
```

## 🎨 Design Decisions

### 1. **Component Architecture**
- **Decision**: Modular, reusable components with clear separation of concerns
- **Rationale**: Maintainable codebase and consistent UI patterns
- **Implementation**: Each component has a single responsibility (CategoryCard, QuizPlayer, etc.)

### 2. **State Management**
- **Decision**: Local component state with React hooks
- **Rationale**: Simple state requirements don't warrant complex state management
- **Implementation**: `useState` for quiz progress, scores, and user interactions

### 3. **Styling Approach**
- **Decision**: Tailwind CSS for utility-first styling
- **Rationale**: Rapid development, consistent design system, and small bundle size
- **Implementation**: Responsive design with mobile-first approach

### 4. **Data Fetching Strategy**
- **Decision**: Server-side data fetching with error handling
- **Rationale**: Better SEO, performance, and user experience
- **Implementation**: Graceful fallbacks for build-time and runtime errors

## 🚧 Challenges Faced & Solutions

### 1. **Tailwind CSS v4 Compatibility Issues**
- **Challenge**: Initial setup used Tailwind CSS v4 which has different PostCSS requirements
- **Solution**: Downgraded to stable Tailwind CSS v3 with proper PostCSS configuration
- **Learning**: Always verify package compatibility and use stable versions for production

### 2. **Build-Time Data Fetching Errors**
- **Challenge**: API routes unavailable during build process causing build failures
- **Solution**: Implemented comprehensive error handling with fallback data
- **Code Example**:
```typescript
try {
  const res = await fetch(`${baseUrl}/api/categories`);
  // ... handle response
} catch (error) {
  console.error('Failed to fetch categories:', error);
  return defaultCategories; // Fallback data
}
```

### 3. **TypeScript Strict Mode Compliance**
- **Challenge**: ESLint errors for `any` types and unused variables
- **Solution**: Created proper TypeScript interfaces and removed unused imports
- **Learning**: Type safety improves code quality and developer experience

### 4. **Responsive Design Implementation**
- **Challenge**: Ensuring consistent experience across devices
- **Solution**: Mobile-first approach with Tailwind's responsive utilities
- **Implementation**: Grid layouts that adapt from 1 column (mobile) to 4 columns (desktop)

## 🤖 AI Development Tools Usage

### **Cursor.ai Integration**
This project was developed with significant assistance from Cursor.ai, demonstrating the power of AI-assisted development:

#### **Code Generation & Refactoring**
- **Component Development**: AI helped generate the QuizPlayer component with proper state management
- **API Route Implementation**: Assisted in creating RESTful endpoints with proper error handling
- **TypeScript Interfaces**: Generated type-safe interfaces for quiz data structures

#### **Problem Solving**
- **Tailwind CSS Issues**: AI helped diagnose and resolve PostCSS configuration problems
- **Build Errors**: Assisted in implementing error handling for build-time data fetching
- **TypeScript Errors**: Helped fix ESLint issues and improve type safety

#### **Best Practices Implementation**
- **Next.js Patterns**: Guided implementation of SSG, SSR, and API routes
- **Performance Optimization**: Suggested proper caching strategies and metadata implementation
- **Code Organization**: Helped structure components and maintain clean architecture

#### **Development Workflow**
- **Rapid Prototyping**: AI enabled quick iteration and feature development
- **Code Review**: Assisted in identifying potential issues and improvements
- **Documentation**: Helped generate comprehensive README and code comments

## 🚀 Deployment

### Vercel 
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with zero configuration

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for the deployment platform
- Tailwind CSS for the utility-first styling
- Cursor.ai for AI-assisted development capabilities
