"use client";

import { useState } from 'react';

interface Question {
  question: string;
  options: string[];
  answer: number;
}

interface QuizPlayerProps {
  questions: Question[];
}

export default function QuizPlayer({ questions }: QuizPlayerProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSelect = (idx: number) => {
    setSelected(idx);
    if (idx === questions[current].answer) {
      setScore((s) => s + 1);
      setFeedback('Correct!');
    } else {
      setFeedback('Incorrect.');
    }
  };

  const handleNext = () => {
    setSelected(null);
    setFeedback(null);
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="text-center mt-8">
        <h2 className="text-3xl font-extrabold mb-4 text-blue-700">Quiz Complete!</h2>
        <p className="text-xl mb-6">Your score: <span className="font-semibold text-blue-700">{score} / {questions.length}</span></p>
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow"
          onClick={() => {
            setCurrent(0);
            setScore(0);
            setShowResult(false);
            setSelected(null);
            setFeedback(null);
          }}
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-10">
      {/* Progress Bar */}
      <div className="w-full h-3 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <h2 className="text-xl font-bold mb-4 text-blue-700">Question {current + 1} of {questions.length}</h2>
      <p className="mb-8 text-gray-800 font-medium text-lg">{q.question}</p>
      <div className="flex flex-col gap-4 mb-8">
        {q.options.map((opt, idx) => (
          <button
            key={idx}
            className={`w-full py-3 px-4 rounded-lg border text-left transition-colors font-semibold text-base
              ${selected === idx
                ? idx === q.answer
                  ? 'bg-green-100 border-green-400 text-green-800'
                  : 'bg-red-100 border-red-400 text-red-800'
                : 'bg-gray-50 border-gray-200 hover:bg-blue-50'}
            `}
            disabled={selected !== null}
            onClick={() => handleSelect(idx)}
          >
            {opt}
          </button>
        ))}
      </div>
      {feedback && <div className={`mb-4 text-lg font-bold text-center ${feedback === 'Correct!' ? 'text-green-600' : 'text-red-600'}`}>{feedback}</div>}
      {selected !== null && (
        <button
          className="mt-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow"
          onClick={handleNext}
        >
          {current + 1 < questions.length ? 'Next Question' : 'See Results'}
        </button>
      )}
    </div>
  );
} 