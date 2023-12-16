import { memo } from 'react';
import AgentList from './AgentList';
import AgentLoader from './AgentLoader';

const AgentIndex = () => {
  return (
    <>
      <AgentLoader style={{ marginBottom: 12 }} />
      <AgentList />
    </>
  );
};

export default memo(AgentIndex);
