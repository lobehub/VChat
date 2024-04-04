import { sessionSelectors, useSessionStore } from '@/store/session';
import { memo, useMemo, useState } from 'react';
import { shallow } from 'zustand/shallow';

import Actions from './Actions';
import ListItem from './ListItem';

interface SessionItemProps {
  id: string;
  onClick: () => void;
}

const SessionItem = memo<SessionItemProps>(({ id, onClick }) => {
  const [open, setOpen] = useState(false);
  const [active] = useSessionStore((s) => [s.activeId === id]);
  const [getAgentById] = useSessionStore((s) => [sessionSelectors.getAgentById(s)]);
  const agent = getAgentById(id);
  const { name, description, avatar } = agent?.meta || {};

  const actions = useMemo(() => <Actions id={id} setOpen={setOpen} />, [id]);

  return (
    <>
      <ListItem
        actions={actions}
        active={active}
        onClick={onClick}
        avatar={avatar || ''}
        description={description || agent?.systemRole}
        showAction={open}
        title={name}
      />
    </>
  );
}, shallow);

export default SessionItem;
