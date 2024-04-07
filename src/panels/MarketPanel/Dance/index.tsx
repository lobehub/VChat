import { GridBackground } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React from 'react';
import { Center } from 'react-layout-kit';
import DanceCard from './DanceCard';
import DanceIndex from './DanceIndex';

const useStyles = createStyles(({ css }) => ({
  background: css`
    width: 90%;
    margin: -24px 0 -12px;
  `,
  container: css`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 500px;
  `,
  content: css`
    padding-left: 24px;
    padding-right: 24px;
    flex-grow: 1;
    overflow-y: auto;
  `,
  title: css`
    z-index: 2;
    margin-top: 24px;
    font-size: 36px;
    font-weight: 800;
  `,
}));

interface DanceProps {
  className?: string;
  style?: React.CSSProperties;
}

const Dance = (props: DanceProps) => {
  const { style, className } = props;
  const { theme, styles } = useStyles();
  return (
    <div className={classNames(className, styles.container)} style={style}>
      <div className={styles.content}>
        <Center>
          <h1 className={styles.title}>Find Your Favorite Dance</h1>
          <GridBackground
            animation
            className={styles.background}
            colorFront={theme.colorText}
            random
          />
        </Center>
        <DanceIndex />
      </div>
      <DanceCard />
    </div>
  );
};

export default Dance;
