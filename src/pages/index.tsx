'use client';

import AgentViewer from '@/features/AgentViewer';
import { useSessionStore } from '@/store/session';

const Home = () => {
  const { currentSession } = useSessionStore();
  return currentSession ? <AgentViewer /> : null;
};

export default Home;
