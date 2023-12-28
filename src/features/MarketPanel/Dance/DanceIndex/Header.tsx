import { useMarketStore } from '@/store/market';
import { Button } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { memo, useEffect } from 'react';

const useStyles = createStyles(({ css, token }) => ({
  content: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  address: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  label: css`
    flex-shrink: 0;
  `,
  actions: css`
    margin-top: 12px;
    display: flex;
    justify-content: flex-end;
  `,
}));

interface AgentLoaderProps {
  style?: React.CSSProperties;
  className?: string;
}

const Header = (props: AgentLoaderProps) => {
  const { style, className } = props;
  const [fetchAgentIndex, agentLoading] = useMarketStore((s) => [
    s.fetchAgentIndex,
    s.agentLoading,
  ]);
  const { styles } = useStyles();

  useEffect(() => {
    fetchAgentIndex();
  }, [fetchAgentIndex]);

  return (
    <div className={classNames(styles.content, className)} style={style}>
      <h2>舞蹈列表</h2>
      <Button type="primary" loading={agentLoading} onClick={() => fetchAgentIndex()}>
        重新加载
      </Button>
    </div>
  );
};

export default memo(Header);
