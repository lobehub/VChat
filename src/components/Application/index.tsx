import { Avatar } from '@lobehub/ui';
import { cx } from 'antd-style';
import { memo, useState } from 'react';
import { useStyles } from './style';

interface ApplicationProps {
  icon: string;
  name: string;
  onClick: () => void;
}

const Application = (props: ApplicationProps) => {
  const { icon, name, onClick } = props;
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
      <Avatar
        avatar={icon}
        background={theme.colorFillTertiary}
        className={styles.avatar}
        size={48}
      />
      <div className={styles.title}>{name}</div>
    </div>
  );
};

export default memo(Application);
