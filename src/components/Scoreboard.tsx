'use client';

import { useQuizStore } from '@/store/quiz';
import { motion } from 'framer-motion';

export function Scoreboard() {
  const teams = useQuizStore(state => state.teams);
  const scores = useQuizStore(state => state.scores);
  const streaks = useQuizStore(state => state.streaks);

  const rankedTeams = [...teams].sort((a, b) => (scores[b.id] ?? 0) - (scores[a.id] ?? 0));

  return (
    <div className="w-full space-y-3">
      {rankedTeams.map((team, idx) => (
        <motion.div
          key={team.id}
          layout
          transition={{ type: 'spring', stiffness: 400, damping: 40 }}
          className="flex items-center gap-4 p-4 bg-bg-card rounded-lg border-2 border-border-default"
        >
          <div className="text-lg font-bold text-accent-green min-w-8">
            {idx + 1}
          </div>
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: team.color || '#1e7f4f' }}
          />
          <div className="flex-1">
            <div className="font-semibold text-text-primary">{team.name}</div>
            {(streaks[team.id] ?? 0) > 0 && (
              <div className="text-xs text-accent-green">
                Streak: {streaks[team.id]}
              </div>
            )}
          </div>
          <motion.div
            key={`${team.id}-score`}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl font-bold text-accent-green"
          >
            {scores[team.id] ?? 0}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
