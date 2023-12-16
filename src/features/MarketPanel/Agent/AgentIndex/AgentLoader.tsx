import { useMarketStore } from '@/store/market';
import { Button, Input } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { memo } from 'react';

const useStyles = createStyles(({ css, token }) => ({
  content: css`
    display: flex;
  `,
  button: css`
    margin-left: ${token.marginSM}px;
  `,
}));

interface AgentLoaderProps {
  style?: React.CSSProperties;
  className?: string;
}

const AgentLoader = (props: AgentLoaderProps) => {
  const { style, className } = props;
  const [agentIndexUrl, fetchAgentIndex, agentLoading] = useMarketStore((s) => [
    s.agentIndexUrl,
    s.fetchAgentIndex,
    s.agentLoading,
  ]);
  const { styles } = useStyles();
  return (
    <div className={classNames(styles.content, className)} style={style}>
      <Input value={agentIndexUrl} width="100%" size="large" />
      <Button
        type="primary"
        size="large"
        className={styles.button}
        loading={agentLoading}
        onClick={() => fetchAgentIndex()}
      >
        加载模型列表
      </Button>
    </div>
  );
};

export default memo(AgentLoader);
