import { useRef } from 'react';
import Header from './Header';
import SideBar from './SideBar';

interface AgentCardProps {
  reloadAgentList: () => void;
}

const AgentCard = (props: AgentCardProps) => {
  const ref = useRef(null);
  const { reloadAgentList } = props;

  return (
    <div>
      <SideBar>
        <Header reloadAgentList={reloadAgentList} />
      </SideBar>
    </div>
  );
};

export default AgentCard;
