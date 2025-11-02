import YAML from 'js-yaml';
import { z } from 'zod';
import type { QuizSpec, ValidationError } from './types';

const QuestionSchema = z.object({
  id: z.string(),
  type: z.enum(['multiple_choice', 'picture', 'audio', 'speed', 'wager_final']),
  question: z.string(),
  options: z.array(z.string()).optional(),
  correctAnswer: z.union([z.number(), z.string()]).optional(),
  explanation: z.string().optional(),
  image: z.string().optional(),
  audio: z.string().optional(),
  points: z.number().optional().default(10),
  negativePoints: z.number().optional(),
});

const RoundSchema = z.object({
  id: z.string(),
  title: z.string(),
  questions: z.array(QuestionSchema),
  duration: z.number().optional().default(30),
});

const QuizSpecSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  rounds: z.array(RoundSchema),
});

export function parseYAML(yaml: string): { spec: QuizSpec | null; errors: ValidationError[] } {
  const errors: ValidationError[] = [];

  try {
    const parsed = YAML.load(yaml) as Record<string, unknown>;
    
    try {
      const spec = QuizSpecSchema.parse(parsed);
      return { spec, errors };
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        for (const issue of validationError.issues) {
          const path = issue.path.join('.');
          errors.push({
            line: 1,
            col: 0,
            message: `${path || 'root'}: ${issue.message}`,
          });
        }
      }
      return { spec: null, errors };
    }
  } catch (yamlError: unknown) {
    const err = yamlError as any;
    const line = err.mark?.line || 0;
    const col = err.mark?.column || 0;
    errors.push({
      line: line + 1,
      col: col + 1,
      message: err.message || 'Invalid YAML syntax',
    });
    return { spec: null, errors };
  }
}

export function stringifyQuiz(spec: QuizSpec): string {
  return YAML.dump(spec, { lineWidth: -1, sortKeys: false });
}
