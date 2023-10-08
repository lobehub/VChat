import AgentViewer from '@/components/AgentViewer';
import { useSessionStore } from '@/store/session';

const Home = () => {
  const { currentAgent } = useSessionStore();
  return currentAgent ? <AgentViewer /> : null;
};

export default Home;
