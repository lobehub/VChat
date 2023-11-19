/**
 * @description: 封装fetch请求，使用流式方法获取数据
 */
export const fetchSEE = async (
  url: string,
  options: RequestInit,
  handler: {
    onMessageError?: (error: Error) => void;
    onMessageUpdate?: (text: string) => void;
  },
) => {
  const res = await fetch(url, options);

  if (!res.ok) {
    const error = new Error(res.statusText);
    handler.onMessageError?.(error);
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
