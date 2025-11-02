'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/quiz';
import { YAMLEditor } from '@/components/YAMLEditor';
import { RoomCode } from '@/components/RoomCode';
import { HostControls } from '@/components/HostControls';
import { Scoreboard } from '@/components/Scoreboard';
import { Button } from '@/components/Button';
import { QuizCard } from '@/components/QuizCard';
import { Timer } from '@/components/Timer';
import type { QuizSpec } from '@/lib/types';
import { cn } from '@/lib/utils';
import { EXAMPLE_QUIZ } from '@/lib/constants';
import { parseYAML } from '@/lib/yaml-parser';

export default function HostPage() {
  const router = useRouter();
  const quizSpec = useQuizStore(state => state.quizSpec);
  const roomCode = useQuizStore(state => state.roomCode);
  const setHostMode = useQuizStore(state => state.setHostMode);
  const createRoom = useQuizStore(state => state.createRoom);
  const loadQuiz = useQuizStore(state => state.loadQuiz);
  const store = useQuizStore();
  const [step, setStep] = useState<'editor' | 'session'>('editor');
  const [showScoreboard, setShowScoreboard] = useState(false);

  useEffect(() => {
    setHostMode(true);
  }, [setHostMode]);

  // Auto-load the quiz if not already loaded
  useEffect(() => {
    if (!quizSpec) {
      const { spec } = parseYAML(EXAMPLE_QUIZ);
      if (spec) {
        loadQuiz(spec);
      }
    }
  }, [quizSpec, loadQuiz]);

  useEffect(() => {
    if (quizSpec) {
      setStep('session');
      if (!roomCode) {
        createRoom();
      }
    }
  }, [quizSpec, roomCode, createRoom]);

  if (step === 'editor') {
    return (
      <div className="min-h-screen flex flex-col p-4 safe-padding">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-accent-green mb-2">Host Quiz</h1>
          <p className="text-sm text-text-primary opacity-75">Paste or edit your quiz YAML below</p>
        </div>

        <div className="flex-1 flex flex-col gap-4 min-h-0">
          <YAMLEditor
            initialValue={store.quizSpec ? '' : ''}
            onValidated={(spec: QuizSpec) => {
              store.loadQuiz(spec);
              setStep('session');
            }}
          />
        </div>
      </div>
    );
  }

  if (!store.quizSpec) {
    return null;
  }

  const currentRound = store.quizSpec.rounds[store.roundIdx];
  const currentQuestion = currentRound?.questions[store.questionIdx];
  const roomUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/join/${store.roomCode}`;

  return (
    <div
      className="min-h-screen flex flex-col pb-32"
      data-large-text={store.largeText || undefined}
      data-high-contrast={store.highContrast || undefined}
    >
      <div className="flex-1 flex flex-col overflow-auto p-4 safe-padding">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-accent-green">
            {store.quizSpec.title}
          </h1>
          {currentRound && (
            <p className="text-sm text-text-primary opacity-75">
              {currentRound.title} • Q{store.questionIdx + 1}/{currentRound.questions.length}
            </p>
          )}
        </div>

        {showScoreboard ? (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-accent-green">Scoreboard</h2>
            <Scoreboard />
            <Button
              variant="secondary"
              size="md"
              onClick={() => setShowScoreboard(false)}
              className="w-full"
            >
              Back to Question
            </Button>
          </div>
        ) : store.phase === 'idle' ? (
          <div className="flex flex-col items-center justify-center gap-6 flex-1">
            <h2 className="text-2xl font-bold text-center text-text-primary">
              Ready to start?
            </h2>
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                store.setPhase('showing');
                store.startTimer();
              }}
              className="w-full max-w-sm"
            >
              Start Session
            </Button>

            <div className="mt-6 pt-6 border-t-2 border-border-default w-full">
              <h3 className="text-sm font-semibold text-text-primary opacity-75 mb-4">
                Share with players:
              </h3>
              <RoomCode code={store.roomCode || ''} roomUrl={roomUrl} />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col gap-6">
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
              <div className="flex-1 flex flex-col bg-bg-card rounded-lg border-2 border-border-default p-6 min-h-0">
                <QuizCard
                  question={currentQuestion}
                  isRevealed={store.phase === 'revealed'}
                  onAnswer={() => {}}
                />
              </div>
            )}

            <Button
              variant="secondary"
              size="md"
              onClick={() => setShowScoreboard(!showScoreboard)}
              className="w-full"
            >
              {showScoreboard ? 'Hide' : 'Show'} Scoreboard
            </Button>
          </div>
        )}
      </div>

      <HostControls
        onNextQuestion={() => store.nextQuestion()}
        onPrevQuestion={() => store.prevQuestion()}
        onRevealAnswer={() => {
          if (store.phase === 'showing') {
            store.setPhase('revealed');
          } else {
            store.setPhase('showing');
          }
        }}
        onTogglePause={() => {
          if (store.phase === 'showing') {
            store.stopTimer();
          } else {
            store.startTimer();
          }
        }}
      />
    </div>
  );
}
