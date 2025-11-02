export type QuestionType = 'multiple_choice' | 'picture' | 'audio' | 'speed' | 'wager_final';

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer?: number | string;
  explanation?: string;
  image?: string;
  audio?: string;
  points?: number;
  negativePoints?: number;
}

export interface Round {
  id: string;
  title: string;
  questions: Question[];
  duration?: number;
}

export interface QuizSpec {
  title: string;
  description?: string;
  rounds: Round[];
}

export interface Team {
  id: string;
  name: string;
  color?: string;
}

export interface GameState {
  quizSpec: QuizSpec | null;
  phase: 'idle' | 'showing' | 'revealed' | 'finished';
  roundIdx: number;
  questionIdx: number;
  timerStarted: number | null;
  
  teams: Team[];
  scores: Record<string, number>;
  streaks: Record<string, number>;
  buzzedBy?: string;
  lockedAnswers: Record<string, number | string>;
  
  pointsMode: 'standard' | 'progressive';
  negativeEnabled: boolean;
  streakBonusEnabled: boolean;
  wagerEnabled: boolean;
  soundOn: boolean;
  largeText: boolean;
  highContrast: boolean;
  
  roomCode?: string;
  realtimeMode: boolean;
  hostMode: boolean;
  playerId?: string;
  playerTeamId?: string;
}

export interface ValidationError {
  line: number;
  col: number;
  message: string;
}
