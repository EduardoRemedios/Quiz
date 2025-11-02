'use client';

import { Question } from '@/lib/types';
import { cn } from '@/lib/utils';

interface MultipleChoiceCardProps {
  question: Question;
  isRevealed?: boolean;
  onAnswer?: (answer: number | string) => void;
}

export function MultipleChoiceCard({ question, isRevealed, onAnswer }: MultipleChoiceCardProps) {
  if (!question.options) return null;

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex-1 flex flex-col justify-center items-center px-4">
        <h2 className="text-2xl font-bold text-center text-text-primary">
          {question.question}
        </h2>
      </div>

      <div className="space-y-3 px-4">
        {question.options.map((option, idx) => {
          const isCorrect = question.correctAnswer === idx;
          const isSelected = isCorrect;

          return (
            <button
              key={idx}
              onClick={() => !isRevealed && onAnswer?.(idx)}
              disabled={isRevealed}
              className={cn(
                'w-full p-4 rounded-lg font-semibold transition-all text-left',
                'border-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green',
                'min-h-14 flex items-center',
                isRevealed && isSelected
                  ? 'bg-accent-green text-white border-accent-green'
                  : isRevealed && question.correctAnswer !== undefined && question.correctAnswer !== idx
                  ? 'bg-accent-red text-white border-accent-red opacity-50'
                  : 'bg-bg-card border-border-default text-text-primary hover:border-accent-green'
              )}
            >
              <span className="text-lg font-bold mr-3 min-w-8">
                {String.fromCharCode(65 + idx)})
              </span>
              {option}
            </button>
          );
        })}
      </div>

      {isRevealed && question.explanation && (
        <div className="px-4 pb-4 text-sm text-text-primary opacity-75 animate-fadeIn">
          {question.explanation}
        </div>
      )}
    </div>
  );
}
