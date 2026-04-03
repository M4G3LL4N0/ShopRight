import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

export type StructuredCompletionRequest = {
  model?: string;
  messages: ChatCompletionMessageParam[];
  temperature?: number;
  max_tokens?: number;
};

const apiKey = process.env.OPENAI_API_KEY;

export const openai = apiKey ? new OpenAI({ apiKey }) : null;

export async function getStructuredCompletion(
  request: StructuredCompletionRequest
): Promise<string> {
  if (!openai) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  const completion = await openai.chat.completions.create({
    model: request.model ?? "gpt-4o-mini",
    messages: request.messages,
    temperature: request.temperature ?? 0.3,
    max_tokens: request.max_tokens ?? 800,
  });

  return completion.choices[0]?.message?.content ?? "";
}
