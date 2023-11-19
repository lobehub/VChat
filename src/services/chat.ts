import { OPENAI_API_KEY, OPENAI_END_POINT } from '@/constants/openai';
import { useConfigStore } from '@/store/config';
import { fetchSEE } from '@/utils/fetch';

const createHeader = (header?: HeadersInit) => {
  const setting = useConfigStore.getState().setting;
  return {
    'Content-Type': 'application/json',
    [OPENAI_API_KEY]: setting.apikey,
    [OPENAI_END_POINT]: setting.endpoint,
    ...header,
  };
};

export const chatCompletion = async (payload, options) => {
  const setting = useConfigStore.getState().setting;

  return fetchSEE(
    '/api/chat/openai',
    {
      method: 'POST',
      headers: createHeader(),
      body: JSON.stringify({
        model: setting.model,
        ...payload,
      }),
    },
    options,
  );
};
