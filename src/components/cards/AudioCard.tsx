'use client';

import { Question } from '@/lib/types';
import { useState, useRef, useMemo } from 'react';
import { cn, shuffleWithMapping } from '@/lib/utils';

interface AudioCardProps {
  question: Question;
  isRevealed?: boolean;
  onAnswer?: (answer: number | string) => void;
}

export function AudioCard({ question, isRevealed, onAnswer }: AudioCardProps) {
  if (!question.options || !question.audio) return null;
  
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex-1 flex flex-col justify-center items-center px-4 pt-4">
        <audio
          ref={audioRef}
          src={question.audio}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        />
        <button
          onClick={isPlaying ? handlePause : handlePlay}
          disabled={isRevealed}
          className={cn(
            'w-16 h-16 rounded-full font-bold transition-all flex items-center justify-center',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green',
            isRevealed
              ? 'bg-border-default text-text-primary opacity-50'
              : 'bg-accent-green text-white hover:bg-opacity-90 active:scale-95'
          )}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center px-4">
        <h2 className="text-xl font-bold text-center text-text-primary">
          {question.question}
        </h2>
      </div>

      <div className="space-y-2 px-4 pb-4">
        {shuffledOptions.map((option, shuffledIdx) => {
          const isCorrect = shuffledCorrectIndex === shuffledIdx;
          // Map shuffled index back to original index for onAnswer callback
          const originalIdx = originalIndexMap[shuffledIdx];

          return (
            <button
              key={shuffledIdx}
              onClick={() => !isRevealed && onAnswer?.(originalIdx)}
              disabled={isRevealed}
              className={cn(
                'w-full p-3 rounded-lg font-semibold transition-all text-left',
                'border-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green',
                'min-h-12 flex items-center',
                isRevealed && isCorrect
                  ? 'bg-accent-green text-white border-accent-green'
                  : isRevealed && shuffledCorrectIndex !== undefined && shuffledCorrectIndex !== shuffledIdx
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
