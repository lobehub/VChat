import { create } from 'zustand';

interface AgentStore {
  openAiKey: string;
}

export const useAgentStore = create<AgentStore>()((set) => ({
  openAiKey: '',
}));
