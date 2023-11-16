/**
 * @description: 封装fetch请求，使用流式方法获取数据
 */
export const fetchSEE = async (url: string, options: any, handler: any) => {
  console.log('options', options);
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = res.body;

  const returnRes = res.clone();

  if (!data) return;

  const reader = data.getReader();
  const decoder = new TextDecoder('utf-8');

  let done = false;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunkValue = decoder.decode(value, { stream: true });
    handler.onMessageHandle?.(chunkValue);
  }

  return returnRes;
};
