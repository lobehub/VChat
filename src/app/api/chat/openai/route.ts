import { OPENAI_API_KEY, OPENAI_END_POINT } from '@/constants/openai';
import { ErrorTypeEnum } from '@/types/api';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI, { ClientOptions } from 'openai';
import { createErrorResponse } from './createErrorResponse';

export const POST = async (req: Request) => {
  const payload = await req.json();
  const apiKey = (req.headers.get(OPENAI_API_KEY) as string) || process.env.OPENAI_API_KEY;
  const baseURL = (req.headers.get(OPENAI_END_POINT) as string) || process.env.OPENAI_PROXY_URL;

  if (!apiKey) {
    return createErrorResponse(ErrorTypeEnum.API_KEY_MISSING, 'openai api key missing');
  }
  const config: ClientOptions = {
    apiKey: apiKey,
    baseURL,
  };

  const openai = new OpenAI(config);

  const { model, messages } = payload;

  try {
    const completion = await openai.chat.completions.create({
      model,
      stream: true,
      messages,
    });

    const stream = OpenAIStream(completion);

    return new StreamingTextResponse(stream);
  } catch (error) {
    // https://platform.openai.com/docs/guides/error-codes/api-errors
    if (error instanceof OpenAI.APIError) {
      return createErrorResponse(ErrorTypeEnum.OPENAI_API_ERROR, error.message);
    } else {
      return createErrorResponse(ErrorTypeEnum.INTERNAL_SERVER_ERROR, JSON.stringify(error));
    }
  }
};
