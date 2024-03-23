import { Avatar, Icon, Tooltip } from '@lobehub/ui';
import { cx } from 'antd-style';
import { LucideIcon } from 'lucide-react';
import { memo } from 'react';
import { useStyles } from './style';

interface ApplicationProps {
  avatar?: string;
  icon?: LucideIcon;
  name?: string;
  onClick: () => void;
}

const Application = (props: ApplicationProps) => {
  const { icon, avatar, name, onClick } = props;
  const { styles } = useStyles();

  return (
    <Tooltip title={name} mouseEnterDelay={0.8}>
      <div className={cx(styles.application)} onClick={onClick} tabIndex={0}>
        {avatar ? <Avatar avatar={avatar} size={32} shape="square" /> : null}
        {icon ? <Icon icon={icon} size={{ fontSize: 32 }} /> : null}
      </div>
    </Tooltip>
  );
};

export default memo(Application);
