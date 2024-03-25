'use client';

import { sessionSelectors, useSessionStore } from '@/store/session';
import { Avatar } from '@lobehub/ui';
import { useStyles } from './style';

const AvatarSize = 64;

const RoleSelect = () => {
  const { styles } = useStyles({ avatarSize: AvatarSize });
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
        const isActive = activeId === agent.agentId;
        return (
          <div style={{ position: 'relative' }}>
            <Avatar
              src={agent.meta.avatar}
              size={AvatarSize}
              onClick={() => switchSession(agent.agentId)}
              className={isActive ? styles.active : ''}
            />
            {isActive ? (
              <>
                <div className={styles.satellite} />
                <div className={styles.orbit} />
              </>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default RoleSelect;
