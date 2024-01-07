import { APIErrorResponse } from '@/types/api';
import { ChatMessageError } from '@/types/chat';
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
      message: data.message,
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
