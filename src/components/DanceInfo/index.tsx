import { Dance } from '@/types/dance';
import { Avatar } from '@lobehub/ui';
import { Space } from 'antd';
import { memo } from 'react';
import { Center } from 'react-layout-kit';
import { useStyles } from './style';

interface DanceInfoProps {
  dance?: Dance;
  actions?: React.ReactNode[];
}

const DanceInfo = (props: DanceInfoProps) => {
  const { styles, theme } = useStyles();
  const { dance, actions = [] } = props;
  const { name, readme, cover } = dance || {};

  return (
    <div className={styles.container}>
      <Center className={styles.header} gap={16}>
        <Avatar avatar={cover} shape="square" background={theme.colorFillTertiary} size={120} />
        <div className={styles.title}>{name}</div>
        <div className={styles.actions}>
          <Space>{actions}</Space>
        </div>
      </Center>
      <div className={styles.footer}>
        <div className={styles.desc}>{readme}</div>
      </div>
    </div>
  );
};

export default memo(DanceInfo);
