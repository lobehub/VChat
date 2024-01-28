import { PrimaryColors } from '@lobehub/ui';

export interface CommonConfig {
  /**
   * 主题色
   */
  primaryColor: PrimaryColors;
  /**
   * 背景类型
   */
  backgroundEffect: 'sakura' | 'snow' | 'star' | 'none';
}

export interface OpenAIConfig {
  apikey?: string;
  endpoint?: string;
  model?: string;
}

export interface LanguageModelConfig {
  openAI: OpenAIConfig;
}

export interface Config extends CommonConfig {
  languageModel: LanguageModelConfig;
}

export type tabType = 'agent' | 'config' | 'dance' | 'chat' | 'touch';
