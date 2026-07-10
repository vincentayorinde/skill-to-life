const REQUIRED_ENV_VARS = [
  'DATABASE_URL',
  'JWT_SECRET',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'GOOGLE_CALLBACK_URL',
] as const;

export function validateConfig(): void {
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    for (const key of missing) {
      console.error(`Missing required environment variable: ${key}`);
    }
    throw new Error(
      `Server cannot start: missing required environment variables: ${missing.join(', ')}. ` +
        'See apps/api/.env.example for the full list.',
    );
  }

  const aiKeys = [
    'ANTHROPIC_API_KEY',
    'OPENAI_API_KEY',
    'GEMINI_API_KEY',
  ];

  const hasAnyAiKey = aiKeys.some((key) => !!process.env[key]);

  if (!hasAnyAiKey) {
    console.warn(
      'No AI provider keys configured. CV analysis will not be available. Add ANTHROPIC_API_KEY, OPENAI_API_KEY, or GEMINI_API_KEY to enable it.',
    );
  }
}
