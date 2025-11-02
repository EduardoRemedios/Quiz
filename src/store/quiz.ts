import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState, Team, QuizSpec } from '@/lib/types';
import { generateTeamId, generatePlayerId, generateRoomCode } from '@/lib/utils';

interface QuizStore extends GameState {
  // Quiz management
  loadQuiz: (spec: QuizSpec) => void;
  resetQuiz: () => void;
  
  // Navigation
  setPhase: (phase: GameState['phase']) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  jumpToQuestion: (roundIdx: number, questionIdx: number) => void;
  
  // Teams & Scoring
  addTeam: (name: string, color?: string) => string;
  removeTeam: (teamId: string) => void;
  updateTeam: (teamId: string, name: string, color?: string) => void;
  setTeamScore: (teamId: string, score: number) => void;
  addStreakBonus: (teamId: string) => void;
  
  // Buzzer & Answers
  buzzIn: (teamId: string) => void;
  lockAnswer: (teamId: string, answer: number | string) => void;
  resetRound: () => void;
  
  // Settings
  toggleSetting: (key: keyof Omit<GameState, 'quizSpec' | 'phase' | 'roundIdx' | 'questionIdx' | 'timerStarted' | 'teams' | 'scores' | 'streaks' | 'buzzedBy' | 'lockedAnswers' | 'roomCode' | 'realtimeMode' | 'hostMode' | 'playerId' | 'playerTeamId'>) => void;
  setSetting: (key: string, value: any) => void;
  
  // Room management
  createRoom: () => void;
  setRoomCode: (code: string) => void;
  setPlayerId: (id: string) => void;
  setPlayerTeamId: (id: string) => void;
  setHostMode: (enabled: boolean) => void;
  setRealtimeMode: (enabled: boolean) => void;
  
  // Timer
  startTimer: () => void;
  stopTimer: () => void;
}

const initialState: GameState = {
  quizSpec: null,
  phase: 'idle',
  roundIdx: 0,
  questionIdx: 0,
  timerStarted: null,
  teams: [],
  scores: {},
  streaks: {},
  lockedAnswers: {},
  pointsMode: 'standard',
  negativeEnabled: false,
  streakBonusEnabled: false,
  wagerEnabled: false,
  soundOn: false,
  largeText: false,
  highContrast: false,
  realtimeMode: false,
  hostMode: false,
};

export const useQuizStore = create<QuizStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      loadQuiz: (spec: QuizSpec) => set({ quizSpec: spec, phase: 'idle', roundIdx: 0, questionIdx: 0 }),
      resetQuiz: () => set(initialState),
      
      setPhase: (phase: GameState['phase']) => set({ phase }),
      nextQuestion: () => {
        const { quizSpec, roundIdx, questionIdx } = get();
        if (!quizSpec) return;
        
        const currentRound = quizSpec.rounds[roundIdx];
        if (questionIdx < currentRound.questions.length - 1) {
          set({ questionIdx: questionIdx + 1, phase: 'showing' });
        } else if (roundIdx < quizSpec.rounds.length - 1) {
          set({ roundIdx: roundIdx + 1, questionIdx: 0, phase: 'showing' });
        } else {
          set({ phase: 'finished' });
        }
      },
      prevQuestion: () => {
        const { roundIdx, questionIdx } = get();
        if (questionIdx > 0) {
          set({ questionIdx: questionIdx - 1, phase: 'showing' });
        } else if (roundIdx > 0) {
          const { quizSpec } = get();
          if (!quizSpec) return;
          set({ roundIdx: roundIdx - 1, questionIdx: quizSpec.rounds[roundIdx - 1].questions.length - 1, phase: 'showing' });
        }
      },
      jumpToQuestion: (roundIdx: number, questionIdx: number) => {
        set({ roundIdx, questionIdx, phase: 'showing' });
      },
      
      addTeam: (name: string, color?: string) => {
        const id = generateTeamId();
        const state = get();
        set({
          teams: [...state.teams, { id, name, color }],
          scores: { ...state.scores, [id]: 0 },
          streaks: { ...state.streaks, [id]: 0 },
        });
        return id;
      },
      removeTeam: (teamId: string) => {
        const state = get();
        const scores = { ...state.scores };
        const streaks = { ...state.streaks };
        const lockedAnswers = { ...state.lockedAnswers };
        delete scores[teamId];
        delete streaks[teamId];
        delete lockedAnswers[teamId];
        set({
          teams: state.teams.filter(t => t.id !== teamId),
          scores,
          streaks,
          lockedAnswers,
        });
      },
      updateTeam: (teamId: string, name: string, color?: string) => {
        const state = get();
        set({
          teams: state.teams.map(t => t.id === teamId ? { ...t, name, color } : t),
        });
      },
      setTeamScore: (teamId: string, score: number) => {
        const state = get();
        set({ scores: { ...state.scores, [teamId]: score } });
      },
      addStreakBonus: (teamId: string) => {
        const state = get();
        const newStreak = (state.streaks[teamId] || 0) + 1;
        set({ streaks: { ...state.streaks, [teamId]: newStreak } });
      },
      
      buzzIn: (teamId: string) => {
        set({ buzzedBy: teamId });
      },
      lockAnswer: (teamId: string, answer: number | string) => {
        const state = get();
        set({ lockedAnswers: { ...state.lockedAnswers, [teamId]: answer } });
      },
      resetRound: () => {
        const state = get();
        set({ buzzedBy: undefined, lockedAnswers: {}, phase: 'showing', timerStarted: null });
      },
      
      toggleSetting: (key) => {
        const state = get();
        const current = state[key as keyof typeof state];
        if (typeof current === 'boolean') {
          set({ [key]: !current } as any);
        }
      },
      setSetting: (key: string, value: any) => {
        set({ [key]: value } as any);
      },
      
      createRoom: () => {
        set({ roomCode: generateRoomCode() });
      },
      setRoomCode: (code: string) => set({ roomCode: code }),
      setPlayerId: (id: string) => set({ playerId: id }),
      setPlayerTeamId: (id: string) => set({ playerTeamId: id }),
      setHostMode: (enabled: boolean) => set({ hostMode: enabled }),
      setRealtimeMode: (enabled: boolean) => set({ realtimeMode: enabled }),
      
      startTimer: () => set({ timerStarted: Date.now() }),
      stopTimer: () => set({ timerStarted: null }),
    }),
    {
      name: 'quiz-store',
      partialize: (state) => ({
        quizSpec: state.quizSpec,
        teams: state.teams,
        scores: state.scores,
        streaks: state.streaks,
        pointsMode: state.pointsMode,
        negativeEnabled: state.negativeEnabled,
        streakBonusEnabled: state.streakBonusEnabled,
        wagerEnabled: state.wagerEnabled,
        soundOn: state.soundOn,
        largeText: state.largeText,
        highContrast: state.highContrast,
      }),
    }
  )
);
