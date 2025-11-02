'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/quiz';
import { QuizCard } from '@/components/QuizCard';
import { Timer } from '@/components/Timer';
import { Scoreboard } from '@/components/Scoreboard';
import { Button } from '@/components/Button';
import { vibrate, playSound, cn } from '@/lib/utils';
import { TEAM_COLORS, EXAMPLE_QUIZ } from '@/lib/constants';
import { parseYAML } from '@/lib/yaml-parser';

interface JoinRoomPageProps {
  params: { room: string };
}

export default function JoinRoomPage({ params }: JoinRoomPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const store = useQuizStore();
  const loadQuiz = useQuizStore(state => state.loadQuiz);
  const setRoomCode = useQuizStore(state => state.setRoomCode);
  const [name] = useState(searchParams.get('name') || '');
  const [step, setStep] = useState<'team' | 'waiting' | 'playing'>('team');
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [buzzed, setBuzzed] = useState(false);
  const [locked, setLocked] = useState(false);
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [showCreateTeam, setShowCreateTeam] = useState(false);

  // Set room code and load quiz when joining
  useEffect(() => {
    // Set the room code from URL
    if (params.room && params.room !== store.roomCode) {
      setRoomCode(params.room.toUpperCase());
    }
    
    // Load quiz spec if not already loaded (use default Rome quiz)
    if (!store.quizSpec) {
      const { spec } = parseYAML(EXAMPLE_QUIZ);
      if (spec) {
        loadQuiz(spec);
      }
    }
  }, [params.room, store.roomCode, store.quizSpec, setRoomCode, loadQuiz]);

  useEffect(() => {
    if (!store.playerId) {
      store.setPlayerId(`player_${Date.now()}`);
    }
    if (name && !selectedTeamId) {
      setStep('team');
      // Show create team option if no teams exist
      if (store.teams.length === 0) {
        setShowCreateTeam(true);
      }
    }
  }, [store, name, selectedTeamId]);

  const currentRound = store.quizSpec?.rounds[store.roundIdx];
  const currentQuestion = currentRound?.questions[store.questionIdx];
  const playerTeam = store.teams.find((t) => t.id === selectedTeamId);

  // Reset buzzer state when question changes
  useEffect(() => {
    if (currentQuestion) {
      setBuzzed(false);
      setLocked(false);
    }
  }, [store.roundIdx, store.questionIdx, currentQuestion]);

  const handleSelectTeam = (teamId: string) => {
    setSelectedTeamId(teamId);
    store.setPlayerTeamId(teamId);
    setStep('playing');
  };

  const handleCreateTeam = () => {
    if (newTeamName.trim()) {
      const color = TEAM_COLORS[store.teams.length % TEAM_COLORS.length];
      const teamId = store.addTeam(newTeamName.trim(), color);
      setSelectedTeamId(teamId);
      store.setPlayerTeamId(teamId);
      setNewTeamName('');
      setShowCreateTeam(false);
      setStep('playing');
    }
  };

  const handleBuzz = () => {
    if (store.phase === 'showing' && !buzzed) {
      setBuzzed(true);
      vibrate(100);
      if (store.soundOn) playSound('buzz');
      store.buzzIn(selectedTeamId);
    }
  };

  const handleLockAnswer = (answer: number | string) => {
    store.lockAnswer(selectedTeamId, answer);
    setLocked(true);
    vibrate([50, 50, 50]);
    if (store.soundOn) playSound('correct');
  };

  if (step === 'team') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 safe-padding">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-accent-green mb-2">
              Join {params.room}
            </h1>
            <p className="text-sm text-text-primary opacity-75">
              Hi {name}, {store.teams.length > 0 ? 'choose your team:' : 'create a team to get started:'}
            </p>
          </div>

          {store.teams.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-text-primary opacity-75">Existing Teams:</p>
              {store.teams.map((team, idx) => (
                <button
                  key={team.id}
                  onClick={() => handleSelectTeam(team.id)}
                  className="w-full p-4 rounded-lg border-2 border-border-default bg-bg-card text-text-primary hover:border-accent-green transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: team.color }}
                    />
                    <span className="font-semibold">{team.name}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {showCreateTeam || store.teams.length === 0 ? (
            <div className="space-y-3 bg-bg-card rounded-lg border-2 border-border-default p-4">
              <p className="text-sm font-semibold text-text-primary opacity-75">
                {store.teams.length > 0 ? 'Or create a new team:' : 'Create Team:'}
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newTeamName.trim()) {
                      handleCreateTeam();
                    }
                  }}
                  placeholder="Team name"
                  autoFocus={store.teams.length === 0}
                  className={cn(
                    'flex-1 px-3 py-2 rounded-lg border-2 border-border-default bg-bg-primary text-text-primary',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green'
                  )}
                />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleCreateTeam}
                  disabled={!newTeamName.trim()}
                >
                  Create
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowCreateTeam(true)}
              className="w-full"
            >
              Create New Team
            </Button>
          )}

          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push('/')}
            className="w-full"
          >
            Back
          </Button>
        </div>
      </div>
    );
  }

  if (!store.quizSpec || !playerTeam) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-primary">Loading...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col pb-32"
      data-large-text={store.largeText || undefined}
      data-high-contrast={store.highContrast || undefined}
    >
      <div className="flex-1 flex flex-col overflow-auto p-4 safe-padding">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-accent-green">{playerTeam.name}</h1>
            <p className="text-xs text-text-primary opacity-75">
              Score: {store.scores[selectedTeamId] || 0}
            </p>
          </div>
          <button
            onClick={() => setShowScoreboard(!showScoreboard)}
            className="text-sm font-semibold text-accent-green opacity-75 hover:opacity-100"
          >
            {showScoreboard ? 'Hide' : 'Show'}
          </button>
        </div>

        {showScoreboard ? (
          <Scoreboard />
        ) : (
          <>
            {store.phase === 'idle' && (
              <div className="mb-4 p-4 bg-bg-card rounded-lg border-2 border-accent-green/50">
                <p className="text-sm text-text-primary opacity-75 text-center">
                  ? Waiting for the host to start the quiz...
                </p>
                <p className="text-xs text-text-primary opacity-50 text-center mt-2">
                  You can preview the questions below
                </p>
              </div>
            )}
            
            {store.timerStarted && currentRound && (
              <Timer
                duration={currentRound.duration || 30}
                started={store.timerStarted}
                onComplete={() => {}}
              />
            )}

            {currentQuestion && (
              <div className="flex-1 flex flex-col bg-bg-card rounded-lg border-2 border-border-default p-6 min-h-0 mt-4">
                <QuizCard
                  question={currentQuestion}
                  isRevealed={store.phase === 'revealed'}
                  onAnswer={handleLockAnswer}
                />
              </div>
            )}
            
            {!currentQuestion && store.quizSpec && (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-lg text-text-primary opacity-75 text-center">
                  Quiz ready! Waiting for host to start...
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {store.phase !== 'idle' && store.phase !== 'finished' && (
        <div className="fixed bottom-0 left-0 right-0 bg-bg-card border-t-2 border-border-default safe-padding safe-bottom">
          <div className="max-w-4xl mx-auto">
            {store.phase === 'showing' && !locked && (
              <Button
                variant="primary"
                size="lg"
                onClick={handleBuzz}
                disabled={buzzed}
                className={`w-full min-h-20 text-2xl font-bold ${
                  buzzed ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {buzzed ? '? Buzzed!' : 'BUZZ!'}
              </Button>
            )}

            {store.phase === 'revealed' && (
              <div className="text-center space-y-2">
                <p className="text-sm text-text-primary opacity-75">
                  Round complete. Waiting for next question...
                </p>
                {store.scores[selectedTeamId] ? (
                  <p className="text-2xl font-bold text-accent-green">
                    +{store.scores[selectedTeamId]}
                  </p>
                ) : null}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
