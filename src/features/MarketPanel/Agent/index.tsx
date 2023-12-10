import { useAgentStore } from '@/store/agent';
import { GridBackground } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { memo, useState } from 'react';
import { Center } from 'react-layout-kit';
import AgentList from './AgentList';

const useStyles = createStyles(({ css }) => ({
  background: css`
    width: 90%;
    margin: -24px 0 -12px;
  `,
  title: css`
    z-index: 2;
    margin-top: 24px;
    font-size: 36px;
    font-weight: 800;
  `,
  container: css`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 500px;
  `,
  content: css`
    padding-left: 24px;
    padding-right: 24px;
    flex-grow: 1;
    overflow-y: auto;
  `,
}));

interface AgentProps {
  style?: React.CSSProperties;
  className?: string;
}

const Agent = (props: AgentProps) => {
  const { theme, styles } = useStyles();
  const { style, className } = props;
  const [tab, setTab] = useState('installed');
  const [fetchAgentList, agentList, loading] = useAgentStore((s) => [
    s.fetchAgentList,
    s.agentList,
    s.loading,
  ]);

  return (
    <div style={style} className={classNames(className, styles.container)}>
      <div className={styles.content}>
        <Center>
          <h1 className={styles.title}>选择你的虚拟角色</h1>
          <GridBackground
            animation
            className={styles.background}
            colorFront={theme.colorText}
            random
          />
        </Center>
        <AgentList />
      </div>
    </div>
  );
};

export default memo(Agent);
