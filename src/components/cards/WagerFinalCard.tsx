'use client';

import { Question } from '@/lib/types';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface WagerFinalCardProps {
  question: Question;
  isRevealed?: boolean;
  onAnswer?: (answer: number | string) => void;
  currentScore?: number;
}

export function WagerFinalCard({ question, isRevealed, onAnswer, currentScore = 100 }: WagerFinalCardProps) {
  const [wager, setWager] = useState(currentScore);

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex-1 flex flex-col justify-center items-center px-4 pt-4">
        <h2 className="text-2xl font-bold text-center text-accent-red">
          {question.question}
        </h2>
        <p className="text-sm text-text-primary opacity-75 mt-2">
          Current score: {currentScore} points
        </p>
      </div>

      <div className="px-4 space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-text-primary">
            Wager amount:
          </label>
          <input
            type="range"
            min="0"
            max={currentScore}
            value={wager}
            onChange={(e) => setWager(parseInt(e.target.value))}
            disabled={isRevealed}
            className={cn(
              'w-full h-2 rounded-lg appearance-none bg-border-default',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green',
              isRevealed && 'opacity-50 cursor-not-allowed'
            )}
          />
          <div className="text-center font-bold text-lg text-accent-red">
            {wager} points
          </div>
        </div>

        <button
          onClick={() => !isRevealed && onAnswer?.(wager)}
          disabled={isRevealed}
          className={cn(
            'w-full p-4 rounded-lg font-bold text-lg transition-all',
            'border-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green',
            'min-h-14 active:scale-95',
            isRevealed
              ? 'bg-border-default text-text-primary opacity-50'
              : 'bg-accent-red text-white border-accent-red hover:bg-opacity-90'
          )}
        >
          Lock in Wager
        </button>
      </div>

      {isRevealed && question.explanation && (
        <div className="px-4 text-sm text-text-primary opacity-75 animate-fadeIn">
          {question.explanation}
        </div>
      )}
    </div>
  );
}
