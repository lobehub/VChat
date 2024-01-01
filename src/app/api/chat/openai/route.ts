import { OPENAI_API_KEY, OPENAI_END_POINT } from '@/constants/openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI, { ClientOptions } from 'openai';

export const POST = async (req: Request) => {
  const payload = await req.json();
  const apiKey = (req.headers.get(OPENAI_API_KEY) as string) || process.env.OPENAI_API_KEY;
  const baseURL =
    (req.headers.get(OPENAI_END_POINT) as string) || process.env.OPENAI_PROXY_URL || undefined;

  if (!apiKey) {
    return Response.json({ message: '"API 密钥错误或未设置。' }, { status: 400 });
  }
  const config: ClientOptions = {
    apiKey: apiKey,
    baseURL,
  };

  const openai = new OpenAI(config);

  const { model, messages } = payload;

  const completion = await openai.chat.completions.create({
    model,
    stream: true,
    messages,
  });

  const stream = OpenAIStream(completion);

  return new StreamingTextResponse(stream);
};
