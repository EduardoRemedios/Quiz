'use client';

import { useQuizStore } from '@/store/quiz';
import { Scoreboard } from '@/components/Scoreboard';
import { Button } from '@/components/Button';
import { useRouter } from 'next/navigation';

export default function ScoreboardPage() {
  const router = useRouter();
  const teams = useQuizStore(state => state.teams);

  if (teams.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-lg text-text-primary mb-4">No teams yet</p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push('/')}
            className="w-full max-w-sm"
          >
            Back Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-full flex flex-col p-4 safe-padding overflow-auto"
      data-large-text={useQuizStore(state => state.largeText) || undefined}
      data-high-contrast={useQuizStore(state => state.highContrast) || undefined}
    >
      <div className="mb-6 flex-shrink-0">
        <h1 className="text-2xl font-bold text-accent-green">Scoreboard</h1>
        <p className="text-sm text-text-primary/70 mt-1.5">
          Live standings
        </p>
      </div>

      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full gap-4">
        <Scoreboard />
      </div>

      <div className="mt-6 flex-shrink-0">
        <Button
          variant="secondary"
          size="lg"
          onClick={() => window.location.reload()}
          className="w-full"
        >
          Refresh
        </Button>
      </div>
    </div>
  );
}
