export interface OpenAIConfig {
  apikey: string;
  endpoint?: string;
}

export interface LanguageModelConfig {
  openai: OpenAIConfig;
}

export interface Setting {
  languageModel: LanguageModelConfig;
  model: string;
}

export type tabType = 'agent' | 'config' | 'dance' | 'chat' | 'touch';
