# AI Providers

Skill to Life supports three AI providers for CV analysis:

- Claude (Anthropic) - primary
- GPT-4 (OpenAI) - secondary
- Gemini (Google) - tertiary

## Configuration

Add API keys to `apps/api/.env`:

```env
ANTHROPIC_API_KEY=your-key
OPENAI_API_KEY=your-key
GEMINI_API_KEY=your-key
```

You only need one key to enable CV analysis. Adding multiple keys enables
automatic fallback.

## Provider Selection

The system automatically:

1. Checks which keys are present
2. Tests each provider for credit
3. Uses the first available provider
4. Falls back to next if one fails

Priority: Claude -> OpenAI -> Gemini

## Checking Provider Status

```http
GET /api/cv-analysis/provider-status
```

Requires JWT.

Returns which providers are configured and which is currently active.

## Updating the System Prompt

The system prompt is stored in the `AiConfig` table in the database. Update it
via the admin panel (coming in v2.1.0) or directly in the database for now.
