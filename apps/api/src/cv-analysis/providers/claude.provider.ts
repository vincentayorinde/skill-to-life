import Anthropic from '@anthropic-ai/sdk';
import { AiProvider } from './ai-provider.interface';

export class ClaudeProvider implements AiProvider {
  private readonly client: Anthropic;

  constructor(private readonly model: string) {
    this.client = new Anthropic({ apiKey: process.env['ANTHROPIC_API_KEY'] });
  }

  async analyse(userPrompt: string, systemPrompt: string): Promise<string> {
    const message = await this.client.messages.create({
      model: this.model,
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const block = message.content[0];
    if (block.type !== 'text') throw new Error('Unexpected response type from Claude');
    return block.text;
  }
}
