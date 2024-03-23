import { VIDOL_SAMPLE_AGENT_A } from '@/constants/agent';
import { Session } from '@/types/session';

const defaultSession: Session = {
  agentId: VIDOL_SAMPLE_AGENT_A.agentId,
  messages: [],
};

const initialState = {
  activeId: defaultSession.agentId,
  sessionList: [defaultSession],
  chatLoadingId: undefined,
  voiceOn: true,
  messageInput: '',
};

export { initialState };
