import AgentViewer from '@/features/AgentViewer';
import { useSessionStore } from '@/store/session';

const Home = () => {
  const { activeId } = useSessionStore();
  return activeId ? <AgentViewer /> : null;
};

export default Home;
