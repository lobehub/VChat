import { Avatar } from '@lobehub/ui';
import { memo } from 'react';
import { useStyles } from './style';

interface ApplicationProps {
  icon: string;
  name: string;
  onClick: () => void;
}

const Application = (props: ApplicationProps) => {
  const { icon, name, onClick } = props;
  const { styles, theme } = useStyles();

  return (
    <div className={styles.application} onClick={onClick}>
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
