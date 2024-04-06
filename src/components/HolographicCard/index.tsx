import { createStyles } from 'antd-style';
import { ReactNode, memo, useEffect, useState } from 'react';
import Container from './components/Container';

const useStyles = createStyles(({ css }) => ({
  img: css`
    width: 100%;
    grid-area: 1/1;

    aspect-ratio: var(--card-aspect);
    border-radius: var(--card-radius);
    image-rendering: optimizeQuality;

    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
  `,
}));

export interface HolographicCardProps {
  children?: ReactNode;
  img?: string;
  mask?: string;
}

const HolographicCard = memo<HolographicCardProps>(({ img = '', mask, children }) => {
  const [loading, setLoading] = useState(true);
  const { styles } = useStyles();
  useEffect(() => {
    if (children)
      setTimeout(() => {
        setLoading(false);
      }, 500);
  }, []);

  return (
    <Container loading={loading} mask={mask}>
      {children ? (
        <div
          className={'card_children_container'}
          style={{
            height: '100%',
            position: 'absolute',
            width: '100%',
          }}
        >
          {children}
        </div>
      ) : (
        <img
          className={styles.img}
          height="921"
          loading="lazy"
          onLoad={() => {
            setTimeout(() => {
              setLoading(false);
            }, 500);
          }}
          src={img}
          width="660"
        />
      )}
    </Container>
  );
});

export default HolographicCard;
