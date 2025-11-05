'use client';

import { useState, useEffect } from 'react';
import { useQuizStore } from '@/store/quiz';
import { QuizCard } from '@/components/QuizCard';
import { Timer } from '@/components/Timer';
import { Scoreboard } from '@/components/Scoreboard';
import { Button } from '@/components/Button';
import { useRouter } from 'next/navigation';
import { TEAM_COLORS } from '@/lib/constants';

export default function PlayPage() {
  const router = useRouter();
  const store = useQuizStore();
  const [newTeamName, setNewTeamName] = useState('');
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [step, setStep] = useState<'setup' | 'playing'>('setup');

  const currentRound = store.quizSpec?.rounds[store.roundIdx];
  const currentQuestion = currentRound?.questions[store.questionIdx];
  const setHostMode = useQuizStore(state => state.setHostMode);

  useEffect(() => {
    setHostMode(true);
  }, [setHostMode]);

  const addTeam = (name: string) => {
    if (!name.trim()) return;
    const color = TEAM_COLORS[store.teams.length % TEAM_COLORS.length];
    store.addTeam(name, color);
    setNewTeamName('');
  };

  if (!store.quizSpec) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-lg text-text-primary mb-4">No quiz loaded</p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push('/')}
            className="w-full max-w-sm"
          >
            Load a Quiz
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'setup') {
    return (
      <div className="h-full flex flex-col items-center justify-center p-4 safe-padding overflow-auto">
        <div className="w-full max-w-md space-y-5">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-accent-green mb-2">
              {store.quizSpec.title}
            </h1>
            <p className="text-sm text-text-primary/70">
              Team Mode • Pass the Phone
            </p>
          </div>

          <div className="bg-bg-card rounded-2xl border-2 border-border-default shadow-sm p-5 space-y-4">
            <h2 className="text-lg font-bold text-text-primary">Setup Teams</h2>

            <div className="space-y-2">
              {store.teams.map((team) => (
                <div
                  key={team.id}
                  className="flex items-center gap-3 p-3 bg-bg-primary rounded-xl border border-border-default"
                >
                  <div
                    className="w-4 h-4 rounded-full shadow-sm"
                    style={{ backgroundColor: team.color }}
                  />
                  <span className="flex-1 font-semibold text-text-primary">
                    {team.name}
                  </span>
                  <button
                    onClick={() => store.removeTeam(team.id)}
                    className="text-accent-red opacity-70 hover:opacity-100 text-lg font-bold transition-opacity"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') addTeam(newTeamName);
                }}
                placeholder="Team name"
                className="flex-1 px-4 py-2.5 rounded-xl border-2 border-border-default bg-bg-primary text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green transition-colors"
              />
              <Button
                variant="primary"
                size="sm"
                onClick={() => addTeam(newTeamName)}
              >
                Add
              </Button>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={() => setStep('playing')}
            disabled={store.teams.length === 0}
            className="w-full"
          >
            Start Playing
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => router.push('/')}
            className="w-full"
          >
            Change Quiz
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-full flex flex-col pb-24"
      data-large-text={store.largeText || undefined}
      data-high-contrast={store.highContrast || undefined}
    >
      <div className="flex-1 flex flex-col overflow-auto p-4 safe-padding">
        <div className="mb-4 flex-shrink-0">
          <h1 className="text-xl font-bold text-accent-green">
            {store.quizSpec.title}
          </h1>
          {currentRound && (
            <p className="text-xs text-text-primary/70">
              {currentRound.title} • Q{store.questionIdx + 1}/{currentRound.questions.length}
            </p>
          )}
        </div>

        {showScoreboard ? (
          <div className="space-y-4">
            <Scoreboard />
          </div>
        ) : (
          <>
            {store.timerStarted && currentRound && (
              <Timer
                duration={currentRound.duration || 30}
                started={store.timerStarted}
                onComplete={() => {
                  store.setPhase('revealed');
                }}
              />
            )}

            {currentQuestion && (
              <div className="flex-1 flex flex-col bg-bg-card rounded-2xl border-2 border-border-default shadow-sm p-6 min-h-0 mt-4 overflow-auto">
                <QuizCard
                  key={`${store.roundIdx}-${store.questionIdx}-${currentQuestion.id || currentQuestion.question}`}
                  question={currentQuestion}
                  isRevealed={store.phase === 'revealed'}
                  onAnswer={() => {}}
                />
              </div>
            )}
          </>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-bg-card/95 backdrop-blur-xl border-t-2 border-accent-green shadow-lg safe-padding safe-bottom">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-2 p-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => store.prevQuestion()}
              className="text-xs"
            >
              ← Prev
            </Button>

            <Button
              variant={store.phase === 'revealed' ? 'outline' : 'primary'}
              size="sm"
              onClick={() => {
                if (store.phase === 'showing') {
                  store.setPhase('revealed');
                } else {
                  store.setPhase('showing');
                  store.startTimer();
                }
              }}
              className="text-xs"
            >
              {store.phase === 'revealed' ? 'Reveal' : 'Hide'}
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => store.nextQuestion()}
              className="text-xs"
            >
              Next →
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2 px-3 pb-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowScoreboard(!showScoreboard)}
              className="text-xs"
            >
              {showScoreboard ? 'Hide' : 'Show'} Scores
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/')}
              className="text-xs"
            >
              Menu
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
