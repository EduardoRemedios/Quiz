'use client';

import { Question } from '@/lib/types';
import { cn, shuffleWithMapping } from '@/lib/utils';
import { useMemo } from 'react';

interface SpeedCardProps {
  question: Question;
  isRevealed?: boolean;
  onAnswer?: (answer: number | string) => void;
}

export function SpeedCard({ question, isRevealed, onAnswer }: SpeedCardProps) {
  if (!question.options) return null;

  // Shuffle options once per question
  const { shuffled: shuffledOptions, originalIndexMap } = useMemo(
    () => shuffleWithMapping(question.options!),
    [question.id, question.question, question.options?.join('|')] // Re-shuffle when question changes
  );

  return (
    <div className="flex flex-col h-full gap-8">
      <div className="flex-1 flex flex-col justify-center items-center px-4">
        <h2 className="text-3xl font-bold text-center text-accent-green">
          {question.question}
        </h2>
      </div>

      <div className="space-y-3 px-4 pb-4">
        {shuffledOptions.map((option, shuffledIdx) => {
          // Map shuffled index back to original index for onAnswer callback
          const originalIdx = originalIndexMap[shuffledIdx];
          
          return (
            <button
              key={shuffledIdx}
              onClick={() => !isRevealed && onAnswer?.(originalIdx)}
              disabled={isRevealed}
              className={cn(
                'w-full p-6 rounded-lg font-bold text-xl transition-all',
                'border-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green',
                'min-h-20 active:scale-95',
                isRevealed
                  ? 'bg-accent-green text-white border-accent-green'
                  : 'bg-accent-green text-white border-accent-green hover:bg-opacity-90'
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
