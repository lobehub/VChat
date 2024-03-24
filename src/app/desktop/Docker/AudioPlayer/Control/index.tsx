import { DanceStore, useDanceStore } from '@/store/dance';
import { Icon } from '@lobehub/ui';
import { PauseCircle, PlayCircle, SkipBack, SkipForward } from 'lucide-react';
import { useStyles } from './style';

const controlSelectors = (s: DanceStore) => {
  return {
    isPlaying: s.isPlaying,
    setIsPlaying: s.setIsPlaying,
    prevDance: s.prevDance,
    nextDance: s.nextDance,
    togglePlayPause: s.togglePlayPause,
  };
};

const Control = () => {
  const { prevDance, nextDance, isPlaying, togglePlayPause } = useDanceStore(controlSelectors);
  const { styles } = useStyles();

  return (
    <div className={styles.control}>
      <SkipBack style={{ marginRight: 24, cursor: 'pointer' }} onClick={prevDance} />
      <Icon
        icon={isPlaying ? PauseCircle : PlayCircle}
        style={{ fontSize: 32, cursor: 'pointer' }}
        onClick={togglePlayPause}
      />
      <SkipForward style={{ marginLeft: 24, cursor: 'pointer' }} onClick={nextDance} />
    </div>
  );
};

export default Control;
