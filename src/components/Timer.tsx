'use client';

import { useEffect, useState } from 'react';
import { formatTime } from '@/lib/utils';

interface TimerProps {
  duration: number;
  started: number | null;
  onComplete?: () => void;
}

export function Timer({ duration, started, onComplete }: TimerProps) {
  const [remaining, setRemaining] = useState(duration);

  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - started) / 1000);
      const newRemaining = Math.max(0, duration - elapsed);
      setRemaining(newRemaining);

      if (newRemaining === 0) {
        clearInterval(interval);
        onComplete?.();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [started, duration, onComplete]);

  useEffect(() => {
    if (!started) {
      setRemaining(duration);
    }
  }, [duration, started]);

  const progress = started ? 1 - (remaining / duration) : 0;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-11 h-11 flex items-center justify-center">
        <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="var(--accent-green)"
            strokeWidth="2"
            strokeDasharray={`${progress * 282.7} 282.7`}
            className="transition-all duration-100"
          />
        </svg>
        <div className="text-center">
          <div className="text-xl font-bold text-accent-green leading-none">
            {remaining}
          </div>
        </div>
      </div>
      <p className="text-xs text-text-primary opacity-75 aria-live-polite" role="status" aria-live="polite">
        Time remaining: {formatTime(remaining)}
      </p>
    </div>
  );
}
