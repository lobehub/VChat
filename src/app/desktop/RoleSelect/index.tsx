'use client';

import { sessionSelectors, useSessionStore } from '@/store/session';
import { Avatar } from '@lobehub/ui';
import { useStyles } from './style';

const RoleSelect = () => {
  const { styles } = useStyles();
  const [sessionList, getAgentById] = useSessionStore((s) => [
    s.sessionList,
    sessionSelectors.getAgentById(s),
  ]);
  const [switchSession, activeId] = useSessionStore((s) => [s.switchSession, s.activeId]);

  return (
    <div className={styles.roleSelect}>
      {sessionList.map((session) => {
        const agent = getAgentById(session.agentId);
        if (!agent) return null;
        return (
          <Avatar
            src={agent.meta.avatar}
            size={64}
            onClick={() => switchSession(agent.agentId)}
            className={activeId === agent.agentId ? styles.active : ''}
          />
        );
      })}
    </div>
  );
};

export default RoleSelect;
