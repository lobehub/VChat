import { useRef } from 'react';
import Footer from './Footer';
import Header from './Header';
import SideBar from './SideBar';

const AgentCard = () => {
  const ref = useRef(null);

  return (
    <div>
      <SideBar>
        <Header />
        <Footer />
      </SideBar>
    </div>
  );
};

export default AgentCard;
