import { OpenAI } from 'openai';
import { z } from 'zod';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export type StructuredCompletionRequest = {
  model: string;
  messages: Array<{ role: string; content: string }>;
  temperature: number;
  max_tokens: number;
};

export async function getStructuredCompletion(request: StructuredCompletionRequest) {
  const completion = await openai.chat.completions.create(request);
  return completion.choices[0].message.content;
}

export function validateStructuredResponse<T>(schema: z.Schema<T>, response: string) {
  try {
    return schema.parse(JSON.parse(response));
  } catch (error) {
    throw new Error(`Invalid response format: ${error.message}`);
  }
}
