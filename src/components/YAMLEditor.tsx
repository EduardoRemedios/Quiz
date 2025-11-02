'use client';

import { useState } from 'react';
import { parseYAML } from '@/lib/yaml-parser';
import { Button } from './Button';
import type { QuizSpec, ValidationError } from '@/lib/types';
import { cn } from '@/lib/utils';

interface YAMLEditorProps {
  initialValue?: string;
  onValidated?: (spec: QuizSpec) => void;
}

export function YAMLEditor({ initialValue = '', onValidated }: YAMLEditorProps) {
  const [yaml, setYaml] = useState(initialValue);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [validated, setValidated] = useState(false);
  const [spec, setSpec] = useState<QuizSpec | null>(null);

  const handleValidate = () => {
    const { spec: parsedSpec, errors: parseErrors } = parseYAML(yaml);
    setErrors(parseErrors);
    setValidated(true);

    if (parsedSpec && parseErrors.length === 0) {
      setSpec(parsedSpec);
      onValidated?.(parsedSpec);
    } else {
      setSpec(null);
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex-1 flex flex-col gap-2">
        <label className="text-sm font-semibold text-text-primary">
          Quiz YAML
        </label>
        <textarea
          value={yaml}
          onChange={(e) => {
            setYaml(e.target.value);
            setValidated(false);
            setErrors([]);
          }}
          className={cn(
            'flex-1 p-4 rounded-lg border-2 font-mono text-sm',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green',
            'bg-bg-card border-border-default text-text-primary',
            'resize-none overflow-auto'
          )}
          placeholder="title: My Quiz&#10;description: A great quiz&#10;rounds:&#10;  - id: round-1&#10;    title: Round 1&#10;    questions: []"
        />
      </div>

      {errors.length > 0 && (
        <div className="bg-accent-red bg-opacity-10 border-l-4 border-accent-red p-3 rounded text-sm">
          <p className="font-semibold text-accent-red mb-2">Errors found:</p>
          {errors.map((err, idx) => (
            <div key={idx} className="text-accent-red text-xs mb-1">
              Line {err.line}, Col {err.col}: {err.message}
            </div>
          ))}
        </div>
      )}

      {validated && spec && (
        <div className="bg-accent-green bg-opacity-10 border-l-4 border-accent-green p-3 rounded text-sm">
          <p className="font-semibold text-accent-green mb-1">✓ Valid!</p>
          <p className="text-text-primary opacity-75">
            {spec.rounds.length} round(s), {spec.rounds.reduce((acc, r) => acc + r.questions.length, 0)} question(s)
          </p>
        </div>
      )}

      <Button
        variant="primary"
        size="lg"
        onClick={handleValidate}
        className="w-full"
      >
        Validate & Preview
      </Button>
    </div>
  );
}
