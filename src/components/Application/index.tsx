import { Avatar, Icon } from '@lobehub/ui';
import { cx } from 'antd-style';
import { LucideIcon } from 'lucide-react';
import { memo, useState } from 'react';
import { useStyles } from './style';

interface ApplicationProps {
  avatar?: string;
  icon?: LucideIcon;
  name: string;
  onClick: () => void;
}

const Application = (props: ApplicationProps) => {
  const { icon, avatar, name, onClick } = props;
  const [selected, setSelected] = useState(false);
  const { styles, theme } = useStyles();

  return (
    <div
      className={cx(styles.application, { [styles.selected]: selected })}
      onDoubleClick={onClick}
      tabIndex={0}
      onFocus={() => setSelected(true)}
      onBlur={() => setSelected(false)}
    >
      {avatar ? <Avatar avatar={avatar} className={styles.avatar} size={48} /> : null}
      {icon ? <Icon icon={icon} size={{ fontSize: 48 }} /> : null}
      <div className={styles.title}>{name}</div>
    </div>
  );
};

export default memo(Application);
