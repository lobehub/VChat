import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI, { ClientOptions } from 'openai';

type Data = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const apiKey = req.body.apiKey || process.env.OPENAI_API_KEY;
  const baseURL = req.body.endpoint
    ? req.body.endpoint
    : process.env.OPENAI_PROXY_URL
    ? process.env.OPENAI_PROXY_URL
    : undefined;

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
    messages: req.body.messages,
  });

  const [aiRes] = completion.choices;
  const message = aiRes.message?.content || '发生错误';

  res.status(200).json({ message: message });
}
