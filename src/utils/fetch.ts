import { APIErrorResponse, ErrorTypeEnum } from '@/types/api';
import { ChatMessageError } from '@/types/chat';

const getMessageByErrorType = (errorType: ErrorTypeEnum) => {
  const errorMap = {
    API_KEY_MISSING: 'openai api key missing',
    OPENAI_API_ERROR: 'openai api error',
    INTERNAL_SERVER_ERROR: 'internal server error',
  };
  return errorMap[errorType] || 'unknown error';
};
/**
 * @description: 封装fetch请求，使用流式方法获取数据
 */
export const fetchSEE = async (
  fetcher: () => Promise<Response>,
  handler: {
    onMessageError?: (error: ChatMessageError) => void;
    onMessageUpdate?: (text: string) => void;
  },
) => {
  const res = await fetcher();

  if (!res.ok) {
    const data = (await res.json()) as APIErrorResponse;

    handler.onMessageError?.({
      type: data.errorType,
      body: data.body,
      message: getMessageByErrorType(data.errorType),
    });
    return;
  }

  const returnRes = res.clone();

  const data = res.body;

  if (!data) return;

  const reader = data.getReader();
  const decoder = new TextDecoder('utf-8');

  let done = false;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunkValue = decoder.decode(value, { stream: true });
    handler.onMessageUpdate?.(chunkValue);
  }

  return returnRes;
};
