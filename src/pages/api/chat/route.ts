import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI, { ClientOptions } from 'openai';
export const runtime = 'edge';

export const POST = async (req: Request) => {
  const payload = await req.json();

  const apiKey = payload.apiKey || process.env.OPENAI_API_KEY;
  const baseURL = payload.endpoint
    ? payload.endpoint
    : process.env.OPENAI_PROXY_URL
    ? process.env.OPENAI_PROXY_URL
    : undefined;

  const config: ClientOptions = {
    apiKey: apiKey,
    baseURL,
  };

  const openai = new OpenAI(config);

  const completion = await openai.chat.completions.create({
    model: payload.model,
    stream: true,
    messages: payload.messages,
  });

  const stream = OpenAIStream(completion);

  return new StreamingTextResponse(stream);
};
