export const OPENAI_API_KEY = 'x-openai-apikey';
export const OPENAI_END_POINT = 'x-openai-endpoint';

interface OPENAI_MODEL {
  /**
   * 模型名称
   */
  name: string;
  /**
   * 最大 Token 数
   */
  maxToken: number;
}

/**
 * OpenAI 模型列表
 */
export const OPENAI_MODEL_LIST: OPENAI_MODEL[] = [
  // GPT 3.5: https://platform.openai.com/docs/models/gpt-3-5
  {
    name: 'gpt-3.5-turbo-1106',
    maxToken: 16385,
  },
  {
    name: 'gpt-3.5-turbo',
    maxToken: 4096,
  },
  {
    name: 'gpt-3.5-turbo-16k',
    maxToken: 16385,
  },
  {
    name: 'gpt-3.5-turbo-instruct',
    maxToken: 4096,
  },
  // GPT 4.0 https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo
  {
    name: 'gpt-4-1106-preview',
    maxToken: 128000,
  },
  {
    name: 'gpt-4-vision-preview',
    maxToken: 128000,
  },
  {
    name: 'gpt-4',
    maxToken: 8192,
  },
  {
    name: 'gpt-4-32k',
    maxToken: 32768,
  },
  {
    name: 'gpt-4-0613',
    maxToken: 8192,
  },
  {
    name: 'gpt-4-32k-0613',
    maxToken: 32768,
  },
];
