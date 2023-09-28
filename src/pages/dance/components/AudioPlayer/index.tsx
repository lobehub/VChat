import { useDanceStore } from '@/store/dance';
import { Avatar } from '@lobehub/ui';
import { PauseCircle, PlayCircle } from 'lucide-react';
import { memo, useEffect, useRef, useState } from 'react';
import { Flexbox } from 'react-layout-kit';
import { useStyles } from './style';

function Player() {
  const ref = useRef<HTMLAudioElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [duration, setDuration] = useState(0);

  const { currentDance, isPlaying, setIsPlaying } = useDanceStore();

  const { styles } = useStyles();

  useEffect(() => {
    if (isPlaying && currentDance) {
      ref.current && ref.current.play();
    } else {
      ref.current && ref.current.pause();
    }
  }, [isPlaying, currentDance]);

  return (
    <div>
      <audio
        src={currentDance?.audio}
        ref={ref}
        onCanPlay={(e) => {
          setIsReady(true);
        }}
        onPause={() => setIsPlaying(false)}
        onPlay={() => {}}
      />
      <Flexbox height={64} horizontal>
        <Avatar src={currentDance?.cover} size={64} shape="square" />
        <Flexbox height={64}>
          <div className={styles.name}>{currentDance?.name}</div>
          {isPlaying ? (
            <PauseCircle
              onClick={() => {
                setIsPlaying(false);
              }}
            />
          ) : (
            <PlayCircle
              onClick={() => {
                setIsPlaying(true);
              }}
            />
          )}
        </Flexbox>
      </Flexbox>
    </div>
  );
}

export default memo(Player);
