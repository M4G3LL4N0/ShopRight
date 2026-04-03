import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.warn("OPENAI_API_KEY is not set - AI features will be disabled");
}

export const openai = apiKey ? new OpenAI({ apiKey }) : null;

export async function getStructuredCompletion({
  model = "gpt-4",
  messages,
  temperature = 0.3,
  max_tokens = 1000
}: {
  model?: string;
  messages: ChatCompletionMessageParam[];
  temperature?: number;
  max_tokens?: number;
}): Promise<string> {
  if (!openai) {
    throw new Error("OpenAI client not initialized - check API key");
  }

  try {
    const completion = await openai.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens,
      response_format: { type: "json_object" }
    });

    return completion.choices[0]?.message?.content ?? "";
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to get AI completion");
  }
}
