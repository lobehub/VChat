import { OPENAI_API_KEY, OPENAI_END_POINT } from '@/constants/openai';
import { OpenAIStream, streamToResponse } from 'ai';
import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI, { ClientOptions } from 'openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiKey = (req.headers[OPENAI_API_KEY] as string) || process.env.OPENAI_API_KEY;

  const baseURL =
    (req.headers[OPENAI_END_POINT] as string) || process.env.OPENAI_PROXY_URL || undefined;

  if (!apiKey) {
    res.status(400).json({ message: '"API 密钥错误或未设置。' });

    return;
  }
  const config: ClientOptions = {
    apiKey: apiKey,
    baseURL,
  };

  const openai = new OpenAI(config);

  const completion = await openai.chat.completions.create({
    model: req.body.model,
    stream: true,
    messages: req.body.messages,
  });

  const stream = OpenAIStream(completion);

  return streamToResponse(stream, res);
}
