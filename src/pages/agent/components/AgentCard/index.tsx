import { useRef } from 'react';
import Header from './Header';
import SideBar from './SideBar';

const AgentCard = () => {
  const ref = useRef(null);

  return (
    <div>
      <SideBar>
        <Header />
      </SideBar>
    </div>
  );
};

export default AgentCard;
