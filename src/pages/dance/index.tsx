import AudioPlayer from '@/components/AudioPlayer';
import { GridBackground } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { Center, Flexbox } from 'react-layout-kit';
import DanceInfoCard from './components/DanceInfoCard';
import DanceList from './components/DanceList';

const useStyles = createStyles(({ css }) => ({
  background: css`
    width: 90%;
    margin: -24px 0 -12px;
  `,
  title: css`
    z-index: 2;
    margin-top: 24px;
    font-size: 56px;
    font-weight: 800;
  `,
}));

const Agent = () => {
  const { theme, styles } = useStyles();
  return (
    <Flexbox flex={1} height={'calc(100vh - 64px)'}>
      <Flexbox flex={1} horizontal>
        <div style={{ paddingLeft: 24, paddingRight: 24, width: 1024, margin: ' 0 auto' }}>
          <Center>
            <h1 className={styles.title}>Find your favorite Dance</h1>
            <GridBackground
              animation
              className={styles.background}
              colorFront={theme.colorText}
              random
            />
          </Center>
          <DanceList />
        </div>
        <DanceInfoCard />
      </Flexbox>
      <AudioPlayer />
    </Flexbox>
  );
};

export default Agent;
