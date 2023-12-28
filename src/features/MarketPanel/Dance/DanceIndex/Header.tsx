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

interface HeaderProps {
  style?: React.CSSProperties;
  className?: string;
}

const Header = (props: HeaderProps) => {
  const { style, className } = props;
  const [fetchDanceIndex, danceLoading] = useMarketStore((s) => [
    s.fetchDanceIndex,
    s.danceLoading,
  ]);
  const { styles } = useStyles();

  useEffect(() => {
    fetchDanceIndex();
  }, [fetchDanceIndex]);

  return (
    <div className={classNames(styles.content, className)} style={style}>
      <h2>舞蹈列表</h2>
      <Button type="primary" loading={danceLoading} onClick={() => fetchDanceIndex()}>
        重新加载
      </Button>
    </div>
  );
};

export default memo(Header);
