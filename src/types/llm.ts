export type LLMRoleType = 'user' | 'system' | 'assistant' | 'function';

export interface LLMMessage {
  content: string;
  role: LLMRoleType;
}
