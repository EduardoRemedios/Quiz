'use client';

import { useQuizStore } from '@/store/quiz';
import { Button } from './Button';
import { cn } from '@/lib/utils';

interface HostControlsProps {
  onNextQuestion?: () => void;
  onPrevQuestion?: () => void;
  onRevealAnswer?: () => void;
  onTogglePause?: () => void;
}

export function HostControls({
  onNextQuestion,
  onPrevQuestion,
  onRevealAnswer,
  onTogglePause,
}: HostControlsProps) {
  const phase = useQuizStore(state => state.phase);
  const largeText = useQuizStore(state => state.largeText);
  const highContrast = useQuizStore(state => state.highContrast);
  const soundOn = useQuizStore(state => state.soundOn);
  const toggleSetting = useQuizStore(state => state.toggleSetting);

  const isRevealed = phase === 'revealed';

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-bg-card border-t-2 border-accent-green safe-padding safe-bottom">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-4 gap-2 p-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={onPrevQuestion}
            disabled={phase === 'idle'}
            title="Previous Question (←)"
            className="text-xs"
          >
            ← Prev
          </Button>

          <Button
            variant={isRevealed ? 'outline' : 'primary'}
            size="sm"
            onClick={onRevealAnswer}
            disabled={phase === 'idle' || phase === 'finished'}
            title="Reveal Answer (R)"
            className="text-xs"
          >
            {isRevealed ? 'Revealed' : 'Reveal'}
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={onNextQuestion}
            disabled={phase === 'idle'}
            title="Next Question (→)"
            className="text-xs"
          >
            Next →
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={onTogglePause}
            title="Play/Pause (Space)"
            className="text-xs"
          >
            {phase === 'showing' ? '⏸' : '▶'}
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-2 px-3 pb-3">
          <button
            onClick={() => toggleSetting('soundOn')}
            className={cn(
              'p-2 rounded-lg font-semibold text-xs transition-all',
              'border-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green',
              soundOn
                ? 'bg-accent-green text-white border-accent-green'
                : 'bg-bg-card border-border-default text-text-primary'
            )}
            title="Toggle Sound"
          >
            🔊
          </button>

          <button
            onClick={() => toggleSetting('largeText')}
            className={cn(
              'p-2 rounded-lg font-semibold text-xs transition-all',
              'border-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green',
              largeText
                ? 'bg-accent-green text-white border-accent-green'
                : 'bg-bg-card border-border-default text-text-primary'
            )}
            title="Large Text"
          >
            A+
          </button>

          <button
            onClick={() => toggleSetting('highContrast')}
            className={cn(
              'p-2 rounded-lg font-semibold text-xs transition-all',
              'border-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green',
              highContrast
                ? 'bg-accent-green text-white border-accent-green'
                : 'bg-bg-card border-border-default text-text-primary'
            )}
            title="High Contrast"
          >
            ◐
          </button>

          <button
            className={cn(
              'p-2 rounded-lg font-semibold text-xs transition-all',
              'border-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green',
              'bg-bg-card border-border-default text-text-primary hover:border-accent-green'
            )}
            onClick={() => document.documentElement.requestFullscreen?.()}
            title="Fullscreen"
          >
            ⛶
          </button>
        </div>
      </div>
    </div>
  );
}
