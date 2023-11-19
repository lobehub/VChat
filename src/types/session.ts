import { Agent } from './agent';
import { ChatMessage } from './chat';

export interface Session {
  agent: Agent;
  messages: ChatMessage[];
}
