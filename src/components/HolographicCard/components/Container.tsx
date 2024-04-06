import { CSSProperties, ReactNode, memo } from 'react';
import { LaserShine, useLaserShine } from './LaserShine';
import Orbit from './Orbit';
import { useStyles } from './style';

export interface ContainerProps {
  foil?: string;
  mask?: string;
  children?: ReactNode;
  className?: string;
  loading?: boolean;
}

const Container = memo<ContainerProps>(({ foil, mask, children, className, loading }) => {
  const { styles, cx } = useStyles();
  const { style: shineStyle, onMouseMove, onMouseOut } = useLaserShine();

  return (
    <Orbit
      classNames={{
        container: cx(`${className} ${mask ? 'masked' : ''}`, styles.container),
        rotator: cx(styles.rotator),
      }}
      styles={{
        container: {
          ...shineStyle,
          '--mask': `url(${mask ?? ''})`,
          '--foil': `url(${foil ?? ''})`,
          width: 320,
        } as CSSProperties,
        content: {
          display: 'grid',
        },
      }}
      onMouseMove={onMouseMove}
      onMouseOut={onMouseOut}
    >
      <div className={cx(styles.front, loading && styles.fontLoading)}>
        {children}
        <LaserShine mask={!!mask} className={styles.shine} />
        <div className={cx('card__glare', styles.glare)} />
      </div>
    </Orbit>
  );
});

export default Container;
