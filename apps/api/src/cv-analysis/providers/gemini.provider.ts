import { GoogleGenerativeAI } from '@google/generative-ai';
import { AiProvider } from './ai-provider.interface';

export class GeminiProvider implements AiProvider {
  private readonly client: GoogleGenerativeAI;

  constructor(private readonly model: string) {
    this.client = new GoogleGenerativeAI(process.env['GEMINI_API_KEY'] ?? '');
  }

  async analyse(userPrompt: string, systemPrompt: string): Promise<string> {
    const genModel = this.client.getGenerativeModel({
      model: this.model,
      systemInstruction: systemPrompt,
    });

    const result = await genModel.generateContent(userPrompt);
    return result.response.text();
  }
}
