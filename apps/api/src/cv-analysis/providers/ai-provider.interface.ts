export interface AiProvider {
  analyse(userPrompt: string, systemPrompt: string): Promise<string>;
}
