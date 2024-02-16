import { useAgentStore } from '@/store/agent';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import AgentCard from './AgentCard';
import AgentList from './AgentList';

const TopBanner = dynamic(() => import('./TopBanner'), { ssr: false });

const useStyles = createStyles(({ css }) => ({
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
  const [loading, localAgentList] = useAgentStore((s) => [s.loading, s.localAgentList]);

  return (
    <div style={style} className={classNames(className, styles.container)}>
      <div className={styles.content}>
        <TopBanner />
        <AgentList title="好友列表" loading={loading} dataSource={localAgentList} />
      </div>
      <AgentCard />
    </div>
  );
};

export default memo(Agent);
