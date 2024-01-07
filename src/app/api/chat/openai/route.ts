import { OPENAI_API_KEY, OPENAI_END_POINT } from '@/constants/openai';
import { ErrorTypeEnum } from '@/types/api';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';
import OpenAI, { ClientOptions } from 'openai';

export const POST = async (req: Request) => {
  const payload = await req.json();
  const apiKey = (req.headers.get(OPENAI_API_KEY) as string) || process.env.OPENAI_API_KEY;
  const baseURL = (req.headers.get(OPENAI_END_POINT) as string) || process.env.OPENAI_PROXY_URL;

  if (!apiKey) {
    return NextResponse.json(
      {
        success: false,
        message: 'openai api key missing',
        errorType: ErrorTypeEnum.API_KEY_MISSING,
      },
      { status: 401 },
    );
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
      return NextResponse.json(
        {
          success: false,
          message: error.message,
          errorType: ErrorTypeEnum.OPENAI_API_ERROR,
        },
        { status: error.status || 577 },
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: JSON.stringify(error),
          errorType: ErrorTypeEnum.INTERNAL_SERVER_ERROR,
        },
        { status: 500 },
      );
    }
  }
};
