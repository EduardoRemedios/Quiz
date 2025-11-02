'use client';

import { useState, useEffect } from 'react';
import { useQuizStore } from '@/store/quiz';
import { YAMLEditor } from '@/components/YAMLEditor';
import { Button } from '@/components/Button';
import type { QuizSpec } from '@/lib/types';
import { EXAMPLE_QUIZ } from '@/lib/constants';
import { parseYAML } from '@/lib/yaml-parser';

export default function HostPage() {
  const quizSpec = useQuizStore(state => state.quizSpec);
  const setHostMode = useQuizStore(state => state.setHostMode);
  const loadQuiz = useQuizStore(state => state.loadQuiz);
  const store = useQuizStore();
  const [step, setStep] = useState<'editor' | 'session' | 'summary'>('editor');
  const [showAnswers, setShowAnswers] = useState(false);

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
    }
  }, [quizSpec]);
  
  // Check if quiz is finished
  useEffect(() => {
    if (store.phase === 'finished' && step === 'session') {
      setStep('summary');
    }
  }, [store.phase, step]);

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

  // Summary view - show all questions and answers
  if (step === 'summary') {
    return (
      <div className="min-h-screen flex flex-col p-4 safe-padding pb-32">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-accent-green mb-2">
            {store.quizSpec.title} - Answers
          </h1>
          <p className="text-sm text-text-primary opacity-75">
            All questions and answers
          </p>
        </div>

        <div className="space-y-8 overflow-auto flex-1">
          {store.quizSpec.rounds.map((round, roundIdx) => (
            <div key={round.id} className="space-y-6">
              <h2 className="text-2xl font-bold text-accent-green border-b-2 border-accent-green pb-2">
                {round.title}
              </h2>
              {round.questions.map((question, qIdx) => {
                const questionNum = roundIdx === 0 
                  ? qIdx + 1 
                  : store.quizSpec!.rounds.slice(0, roundIdx).reduce((sum, r) => sum + r.questions.length, 0) + qIdx + 1;
                
                return (
                  <div key={question.id} className="bg-bg-card rounded-lg border-2 border-border-default p-6">
                    <div className="mb-4">
                      <span className="text-sm font-semibold text-accent-green">Question {questionNum}</span>
                      <p className="text-xl font-bold text-text-primary mt-2">
                        {question.question}
                      </p>
                    </div>
                    
                    {question.type === 'multiple_choice' && question.options && (
                      <div className="space-y-2 mb-4">
                        {question.options.map((option, idx) => (
                          <div
                            key={idx}
                            className={`p-3 rounded-lg border-2 ${
                              question.correctAnswer === idx
                                ? 'bg-accent-green text-white border-accent-green font-bold'
                                : 'bg-bg-primary border-border-default'
                            }`}
                          >
                            <span className="font-semibold">{String.fromCharCode(65 + idx)})</span> {option}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {question.explanation && (
                      <div className="mt-4 p-3 bg-accent-green/10 rounded-lg border-l-4 border-accent-green">
                        <p className="text-sm text-text-primary">
                          <span className="font-semibold">Explanation:</span> {question.explanation}
                        </p>
                      </div>
                    )}
                    
                    {question.points && (
                      <p className="text-xs text-text-primary opacity-50 mt-2">
                        Points: {question.points}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-bg-card border-t-2 border-accent-green safe-padding safe-bottom">
          <div className="max-w-4xl mx-auto p-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                store.resetQuiz();
                setStep('session');
              }}
              className="w-full"
            >
              Start New Quiz
            </Button>
          </div>
        </div>
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
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-bold text-accent-green">
            {store.quizSpec.title}
          </h1>
          {currentRound && (
            <p className="text-sm text-text-primary opacity-75 mt-1">
              {currentRound.title} • Question {store.questionIdx + 1} of {currentRound.questions.length}
            </p>
          )}
        </div>

        {store.phase === 'idle' ? (
          <div className="flex flex-col items-center justify-center gap-6 flex-1">
            <h2 className="text-2xl font-bold text-center text-text-primary">
              Ready to start?
            </h2>
            <p className="text-sm text-text-primary opacity-75 text-center max-w-md">
              Read questions out loud. Players write answers on paper.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                store.setPhase('showing');
              }}
              className="w-full max-w-sm"
            >
              Start Quiz
            </Button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col gap-4">
            {currentQuestion && (
              <div className="flex-1 flex flex-col bg-bg-card rounded-lg border-2 border-accent-green p-8 min-h-0">
                <div className="mb-6">
                  <button
                    onClick={() => setShowAnswers(!showAnswers)}
                    className="text-sm font-semibold text-accent-green hover:underline"
                  >
                    {showAnswers ? 'Hide' : 'Show'} Answer
                  </button>
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8 leading-tight">
                    {currentQuestion.question}
                  </h2>
                  
                  {currentQuestion.type === 'multiple_choice' && currentQuestion.options && (
                    <div className="space-y-4 mt-6">
                      {currentQuestion.options.map((option, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-lg border-2 text-xl ${
                            showAnswers && currentQuestion.correctAnswer === idx
                              ? 'bg-accent-green text-white border-accent-green font-bold'
                              : 'bg-bg-primary border-border-default'
                          }`}
                        >
                          <span className="font-bold mr-3">{String.fromCharCode(65 + idx)})</span>
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {showAnswers && currentQuestion.explanation && (
                    <div className="mt-6 p-4 bg-accent-green/10 rounded-lg border-l-4 border-accent-green">
                      <p className="text-lg text-text-primary">
                        <span className="font-semibold">Explanation:</span> {currentQuestion.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {store.phase !== 'idle' && (
        <div className="fixed bottom-0 left-0 right-0 bg-bg-card border-t-2 border-accent-green safe-padding safe-bottom">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-2 p-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => store.prevQuestion()}
                disabled={store.roundIdx === 0 && store.questionIdx === 0}
                className="text-xs"
              >
                ← Previous
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  if (store.quizSpec) {
                    const totalQuestions = store.quizSpec.rounds.reduce((sum, r) => sum + r.questions.length, 0);
                    const currentQuestionNum = store.quizSpec.rounds.slice(0, store.roundIdx).reduce((sum, r) => sum + r.questions.length, 0) + store.questionIdx + 1;
                    
                    if (currentQuestionNum >= totalQuestions) {
                      store.setPhase('finished');
                    } else {
                      store.nextQuestion();
                      setShowAnswers(false);
                    }
                  }
                }}
                className="text-xs"
              >
                {store.quizSpec && (() => {
                  const totalQuestions = store.quizSpec.rounds.reduce((sum, r) => sum + r.questions.length, 0);
                  const currentQuestionNum = store.quizSpec.rounds.slice(0, store.roundIdx).reduce((sum, r) => sum + r.questions.length, 0) + store.questionIdx + 1;
                  return currentQuestionNum >= totalQuestions ? 'Finish' : 'Next →';
                })()}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAnswers(!showAnswers)}
                className="text-xs"
              >
                {showAnswers ? 'Hide' : 'Show'} Answer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
