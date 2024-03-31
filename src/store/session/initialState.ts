import { DEFAULT_AGENTS, VIDOL_SAMPLE_AGENT_A } from '@/constants/agent';
import { Session } from '@/types/session';

const defaultSession: Session = {
  agentId: VIDOL_SAMPLE_AGENT_A.agentId,
  messages: [],
};

const initialState = {
  activeId: defaultSession.agentId,
  localAgentList: DEFAULT_AGENTS,
  sessionList: [defaultSession],
  chatLoadingId: undefined,
  voiceOn: true,
  viewerMode: true,
  messageInput: '',
};

export { initialState };
