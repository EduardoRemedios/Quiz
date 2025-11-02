'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { cn } from '@/lib/utils';

export default function JoinPage() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState('');
  const [step, setStep] = useState<'code' | 'name'>('code');

  const handleSubmitCode = () => {
    if (roomCode.length === 4) {
      setStep('name');
    }
  };

  const handleSubmitName = (name: string) => {
    if (name.trim()) {
      router.push(`/join/${roomCode}?name=${encodeURIComponent(name)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 safe-padding">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-accent-green mb-2">Join</h1>
          <p className="text-sm text-text-primary opacity-75">
            {step === 'code'
              ? 'Enter the room code from the host'
              : 'What is your name?'}
          </p>
        </div>

        <div className="bg-bg-card rounded-lg border-2 border-border-default p-8 space-y-6">
          {step === 'code' ? (
            <>
              <div className="space-y-3">
                <label className="text-sm font-semibold text-text-primary">
                  Room Code
                </label>
                <input
                  type="text"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase().slice(0, 4))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && roomCode.length === 4) {
                      handleSubmitCode();
                    }
                  }}
                  placeholder="E.g., A1B2"
                  maxLength={4}
                  autoFocus
                  className={cn(
                    'w-full px-4 py-4 text-2xl font-bold text-center tracking-widest rounded-lg',
                    'border-2 border-border-default bg-bg-primary text-text-primary',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green'
                  )}
                />
              </div>
              <Button
                variant="primary"
                size="lg"
                onClick={handleSubmitCode}
                disabled={roomCode.length !== 4}
                className="w-full"
              >
                Next
              </Button>
            </>
          ) : (
            <NameInput onSubmit={handleSubmitName} />
          )}
        </div>

        <Button
          variant="outline"
          size="lg"
          onClick={() => (step === 'code' ? router.push('/') : setStep('code'))}
          className="w-full"
        >
          {step === 'code' ? 'Cancel' : 'Back'}
        </Button>
      </div>
    </div>
  );
}

function NameInput({ onSubmit }: { onSubmit: (name: string) => void }) {
  const [name, setName] = useState('');

  return (
    <>
      <div className="space-y-3">
        <label className="text-sm font-semibold text-text-primary">
          Your Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && name.trim()) {
              onSubmit(name);
            }
          }}
          placeholder="Enter your name"
          autoFocus
          className={cn(
            'w-full px-4 py-3 rounded-lg',
            'border-2 border-border-default bg-bg-primary text-text-primary',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green'
          )}
        />
      </div>
      <Button
        variant="primary"
        size="lg"
        onClick={() => onSubmit(name)}
        disabled={!name.trim()}
        className="w-full"
      >
        Continue
      </Button>
    </>
  );
}
