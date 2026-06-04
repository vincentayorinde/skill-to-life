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
}
