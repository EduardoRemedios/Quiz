import { parseYAML } from '@/lib/yaml-parser';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { yaml } = await request.json();

    if (!yaml || typeof yaml !== 'string') {
      return NextResponse.json(
        { error: 'Invalid YAML string' },
        { status: 400 }
      );
    }

    const { spec, errors } = parseYAML(yaml);

    return NextResponse.json({
      valid: errors.length === 0 && spec !== null,
      spec,
      errors,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to validate YAML' },
      { status: 500 }
    );
  }
}
