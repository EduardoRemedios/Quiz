'use client';

import { Question, QuestionType } from '@/lib/types';
import { MultipleChoiceCard } from './cards/MultipleChoiceCard';
import { PictureCard } from './cards/PictureCard';
import { AudioCard } from './cards/AudioCard';
import { SpeedCard } from './cards/SpeedCard';
import { WagerFinalCard } from './cards/WagerFinalCard';

interface QuizCardProps {
  question: Question;
  isRevealed?: boolean;
  onAnswer?: (answer: number | string) => void;
}

export function QuizCard({ question, isRevealed = false, onAnswer }: QuizCardProps) {
  const cardProps = { question, isRevealed, onAnswer };

  const cards: Record<QuestionType, React.ReactNode> = {
    multiple_choice: <MultipleChoiceCard {...cardProps} />,
    picture: <PictureCard {...cardProps} />,
    audio: <AudioCard {...cardProps} />,
    speed: <SpeedCard {...cardProps} />,
    wager_final: <WagerFinalCard {...cardProps} />,
  };

  return cards[question.type];
}
