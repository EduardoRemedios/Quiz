'use client';

import Link from 'next/link';
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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 safe-padding">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-accent-green mb-2">Roamin' in Rome</h1>
        <p className="text-text-primary opacity-75">20-Minute Pub Quiz</p>
      </div>

      <div className="w-full max-w-sm space-y-4">
        <Button 
          variant="primary" 
          size="lg" 
          className="w-full"
          onClick={handleHostQuiz}
        >
          Host Quiz
        </Button>

        <Link href="/join" className="block">
          <Button variant="secondary" size="lg" className="w-full">
            Join with Code
          </Button>
        </Link>
      </div>

      <div className="mt-16 text-center text-xs text-text-primary opacity-50">
        <p>Symphony Solutions, Rome</p>
      </div>
    </div>
  );
}
