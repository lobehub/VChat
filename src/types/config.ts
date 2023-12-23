export interface OpenAIConfig {
  apikey?: string;
  endpoint?: string;
  model?: string;
}

export interface LanguageModelConfig {
  openAI: OpenAIConfig;
}

export interface Setting {
  languageModel: LanguageModelConfig;
}

export type tabType = 'agent' | 'config' | 'dance' | 'chat' | 'touch';
