'use client';

import { Button } from './Button';
import { useQuizStore } from '@/store/quiz';
import { EXAMPLE_QUIZ } from '@/lib/constants';
import { parseYAML } from '@/lib/yaml-parser';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();
  const loadQuiz = useQuizStore(state => state.loadQuiz);

  const handleHostQuiz = () => {
    const { spec } = parseYAML(EXAMPLE_QUIZ);
    if (spec) {
      loadQuiz(spec);
      router.push('/host');
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center px-4 py-6 safe-padding">
      <div className="text-center mb-8">
        <div className="mb-6 flex items-center justify-center gap-2.5">
          <div className="w-4 h-4 rounded-full bg-accent-green shadow-sm"></div>
          <div className="w-4 h-4 rounded-full bg-accent-white border-2 border-accent-green shadow-sm"></div>
          <div className="w-4 h-4 rounded-full bg-accent-red shadow-sm"></div>
        </div>
        <h1 className="text-5xl font-bold text-accent-green mb-3 tracking-tight">Roamin' in Rome</h1>
        <p className="text-lg text-text-primary/80 mb-2 font-medium">20-Minute Pub Quiz</p>
        <p className="text-sm text-text-primary/60">
          Host reads questions ? Players write answers on paper
        </p>
      </div>

      <div className="w-full max-w-sm space-y-3">
        <Button 
          variant="primary" 
          size="lg" 
          className="w-full"
          onClick={handleHostQuiz}
        >
          Host Quiz
        </Button>
      </div>

      <div className="mt-auto pt-8 text-center text-xs text-text-primary/50">
        <p>Symphony Solutions, Rome</p>
      </div>
    </div>
  );
}
