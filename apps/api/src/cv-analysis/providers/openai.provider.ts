import OpenAI from 'openai';
import { AiProvider } from './ai-provider.interface';

export class OpenAIProvider implements AiProvider {
  private readonly client: OpenAI;

  constructor(private readonly model: string) {
    this.client = new OpenAI({ apiKey: process.env['OPENAI_API_KEY'] });
  }

  async analyse(userPrompt: string, systemPrompt: string): Promise<string> {
    const completion = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 4096,
    });

    return completion.choices[0]?.message?.content ?? '';
  }
}
