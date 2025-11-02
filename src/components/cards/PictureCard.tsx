'use client';

import { Question } from '@/lib/types';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface PictureCardProps {
  question: Question;
  isRevealed?: boolean;
  onAnswer?: (answer: number | string) => void;
}

export function PictureCard({ question, isRevealed, onAnswer }: PictureCardProps) {
  if (!question.options || !question.image) return null;

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex-1 flex flex-col justify-center items-center px-4 pt-4">
        <div className="relative w-full max-w-xs h-48 rounded-lg overflow-hidden bg-border-default">
          <Image
            src={question.image}
            alt={question.question}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 400px"
            priority
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center px-4">
        <h2 className="text-xl font-bold text-center text-text-primary">
          {question.question}
        </h2>
      </div>

      <div className="space-y-2 px-4 pb-4">
        {question.options.map((option, idx) => {
          const isCorrect = question.correctAnswer === idx;

          return (
            <button
              key={idx}
              onClick={() => !isRevealed && onAnswer?.(idx)}
              disabled={isRevealed}
              className={cn(
                'w-full p-3 rounded-lg font-semibold transition-all text-left',
                'border-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green',
                'min-h-12 flex items-center',
                isRevealed && isCorrect
                  ? 'bg-accent-green text-white border-accent-green'
                  : isRevealed && question.correctAnswer !== undefined && question.correctAnswer !== idx
                  ? 'bg-accent-red text-white border-accent-red opacity-50'
                  : 'bg-bg-card border-border-default text-text-primary hover:border-accent-green'
              )}
            >
              {option}
            </button>
          );
        })}
      </div>

      {isRevealed && question.explanation && (
        <div className="px-4 text-sm text-text-primary opacity-75 animate-fadeIn">
          {question.explanation}
        </div>
      )}
    </div>
  );
}
