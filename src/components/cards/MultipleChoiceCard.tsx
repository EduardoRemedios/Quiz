'use client';

import { Question } from '@/lib/types';
import { cn, shuffleWithMapping } from '@/lib/utils';
import { useMemo } from 'react';

interface MultipleChoiceCardProps {
  question: Question;
  isRevealed?: boolean;
  onAnswer?: (answer: number | string) => void;
}

export function MultipleChoiceCard({ question, isRevealed, onAnswer }: MultipleChoiceCardProps) {
  if (!question.options) return null;

  // Shuffle options once per question
  const { shuffled: shuffledOptions, originalIndexMap } = useMemo(
    () => shuffleWithMapping(question.options!),
    [question.id] // Re-shuffle only when question changes
  );

  // Find where the correct answer is in the shuffled array
  const shuffledCorrectIndex = useMemo(() => {
    if (question.correctAnswer === undefined) return undefined;
    return originalIndexMap.findIndex(origIdx => origIdx === question.correctAnswer);
  }, [question.correctAnswer, originalIndexMap]);

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex-1 flex flex-col justify-center items-center px-4">
        <h2 className="text-2xl font-bold text-center text-text-primary">
          {question.question}
        </h2>
      </div>

      <div className="space-y-3 px-4">
        {shuffledOptions.map((option, shuffledIdx) => {
          const isCorrect = shuffledCorrectIndex === shuffledIdx;
          const isSelected = isCorrect;
          // Map shuffled index back to original index for onAnswer callback
          const originalIdx = originalIndexMap[shuffledIdx];

          return (
            <button
              key={shuffledIdx}
              onClick={() => !isRevealed && onAnswer?.(originalIdx)}
              disabled={isRevealed}
              className={cn(
                'w-full p-4 rounded-lg font-semibold transition-all text-left',
                'border-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green',
                'min-h-14 flex items-center',
                isRevealed && isSelected
                  ? 'bg-accent-green text-white border-accent-green shadow-md shadow-accent-green/20'
                  : isRevealed && shuffledCorrectIndex !== undefined && shuffledCorrectIndex !== shuffledIdx
                  ? 'bg-accent-red text-white border-accent-red opacity-50'
                  : 'bg-bg-card border-border-default text-text-primary hover:border-accent-green hover:shadow-sm hover:shadow-accent-green/10 transition-all'
              )}
            >
              <span className="text-lg font-bold mr-3 min-w-8">
                {String.fromCharCode(65 + shuffledIdx)})
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
