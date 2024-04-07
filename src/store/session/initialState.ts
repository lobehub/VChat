import { DEFAULT_AGENTS, VIDOL_SAMPLE_AGENT_A } from '@/constants/agent';
import { Session } from '@/types/session';

const defaultSession: Session = {
  agentId: VIDOL_SAMPLE_AGENT_A.agentId,
  messages: [],
};

const initialState = {
  activeId: defaultSession.agentId,
  chatLoadingId: undefined,
  localAgentList: DEFAULT_AGENTS,
  messageInput: '',
  sessionList: [defaultSession],
  viewerMode: true,
  voiceOn: true,
};

export { initialState };
